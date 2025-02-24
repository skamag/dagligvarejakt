import React from "react";
import "./Vare.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Category {
  id: number;
  name: string;
}

interface Store {
  name: string;
  code: string;
  url: string;
  logo: string;
}

interface PriceHistory {
  date: string;
  price: number;
}

interface Label {
  icon: { png: string };
  name: string;
}

interface Data {
  id: number;
  name: string;
  brand: string;
  vendor: string;
  ean: string;
  description: string;
  image: string;
  url: string;
  weight: number;
  weight_unit: string;
  current_price: number;
  current_unit_price: number;
  price_history: PriceHistory[];
  store: Store;
  category: Category[];
  allergens: string[];
  labels: Label[];
  ingredients: string;
  nutrition: string[];
  created_at: string;
  updated_at: string;
}

interface VareProps {
  data: Data[];
  valgtVare: string;
}

const Vare: React.FC<VareProps> = ({ data, valgtVare }) => {
  console.log(data, valgtVare);

  const filteredItems =
    data && valgtVare !== ""
      ? data.filter((item) =>
          item.name.toLowerCase().includes(valgtVare.toLowerCase())
        )
      : [];

  const sortedItems = filteredItems.sort(
    (a, b) => a.current_price - b.current_price
  );
  const lowestPrice =
    sortedItems.length > 0 ? sortedItems[0].current_price : null;

  const colors = [
    "#2f7070", // Turkis
    "#7e3e71", // Lilla
    "#405070", // Blå
  ];

  const chartDatasets = filteredItems.map((item, index) => {
    const sortedPriceHistory = item.price_history?.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const prices = sortedPriceHistory?.map((pricePoint) => pricePoint.price);

    return {
      label: `${item.store.name}`,
      data: prices,
      fill: false,
      borderColor: colors[index % colors.length], // Cycle through the colors
      tension: 0.1,
      pointBackgroundColor: colors[index % colors.length],
    };
  });

  const chartData = {
    labels: filteredItems[0]?.price_history?.map((pricePoint) =>
      pricePoint.date.slice(0, 10)
    ),
    datasets: chartDatasets,
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label || "";
            const price = context.raw;
            const date = context.label;
            return `${label}: ${price} kr (Date: ${date})`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false, // Set to true if you want to start from zero
        ticks: {
          padding: 10, // Adds padding around the tick labels
        },
        suggestedMin:
          Math.min(
            ...filteredItems.flatMap((item) =>
              item.price_history?.map((pricePoint) => pricePoint.price)
            )
          ) * 0.95, // Adds 5% padding at the bottom

        suggestedMax:
          Math.max(
            ...filteredItems.flatMap((item) =>
              item.price_history?.map((pricePoint) => pricePoint.price)
            )
          ) * 1.05, // Adds 5% padding at the top
      },
      x: {
        ticks: {
          padding: 10, // Adds padding to x-axis labels
        },
      },
    },
  };

  return (
    <article className="valgtVareContainer">
      {valgtVare ? (
        data
          .filter((item) =>
            item.name.toLowerCase().includes(valgtVare.toLowerCase())
          )
          .filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.name === value.name)
          )
          .map((filteredItem) => (
            <React.Fragment key={filteredItem.id}>
              <div className="valgtVareProductCard">
                <div className="flex-1">
                  <div className="valgtVareHeader">
                    <img
                      key={filteredItem.id}
                      className="vareImage"
                      src={filteredItem.image}
                      alt={filteredItem.name}
                    ></img>
                    <h4 className="valgtVareName">{valgtVare}</h4>
                  </div>
                  <div className={"priserContainer"}>
                    {data && valgtVare !== ""
                      ? sortedItems.map((filteredItem) => (
                          <div
                            key={filteredItem.id}
                            className={"storeContainer"}
                          >
                            <a
                              href={filteredItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="storeLogoContainer">
                                <img
                                  className={"storeLogo"}
                                  src={filteredItem.store.logo}
                                  alt={filteredItem.store.name}
                                />
                              </div>
                              <span
                                className={
                                  filteredItem.current_price === lowestPrice
                                    ? "bold"
                                    : ""
                                }
                              >
                                {filteredItem.current_price} kr
                              </span>
                            </a>
                          </div>
                        ))
                      : valgtVare === ""
                        ? "Ingen vare valgt..."
                        : "Loading..."}
                  </div>
                </div>
                <div className="valgtVareFactsContainer">
                  <div className="valgtVareFacts flex-1">
                    <div className="factsText">
                      <p>
                        <h3 className="valgtVareFactsHeader">Beskrivelse</h3>
                      </p>
                      <p>
                        {filteredItem.description
                          ? filteredItem.description
                          : "Ingen info"}
                      </p>
                    </div>
                    <div>
                      <p>
                        <h3 className="valgtVareFactsHeader">Innhold</h3>
                      </p>
                      <p>
                        {filteredItem.ingredients
                          ? filteredItem.ingredients
                          : "Ingen info"}
                      </p>
                    </div>
                  </div>
                  <div className="vareLabels">
                    {filteredItem.labels &&
                      filteredItem.labels.map((label) => (
                        <img
                          className="vareLabelImg"
                          src={label.icon.png}
                          alt={label.name}
                        ></img>
                      ))}
                  </div>
                </div>
              </div>
              <div className="priceHistoryContainer">
                <Line
                  data={chartData}
                  options={chartOptions}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </React.Fragment>
          ))
      ) : (
        <p>Ingen vare valgt</p>
      )}
    </article>
  );
};

export default Vare;
