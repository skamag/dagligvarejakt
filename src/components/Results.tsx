import { Link } from "react-router-dom";

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

interface ResultsProps {
  data: Data[];
  setValgtVare: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = ({ data, setValgtVare, loading }) => {
  const isValidUrl = (url: string) => {
    try {
      new URL(url); // Checks if the URL is well-formed
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <section className="results-container">
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        data
          .filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.name === value.name)
          )
          .map((item) => (
            <Link
              to="/vare"
              className="link"
              key={item.id}
              onClick={() => {
                setValgtVare(item.name);
                window.scrollTo({ top: 0 });
              }}
            >
              <article className="product-card">
                <div className="image-container">
                  <img
                    src={
                      item.image && isValidUrl(item.image)
                        ? item.image
                        : "/default-image.png"
                    }
                    alt={item.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/default-image.png";
                    }}
                  />
                </div>
                <div className="card-text-container">
                  <p>{item.name}</p>
                  <div className="card-stores-container">
                    {data
                      .filter(
                        (product) =>
                          product.name &&
                          product.name
                            .toLowerCase()
                            .includes(item.name.toLowerCase())
                      )
                      .map((currentItem) => (
                        <div className="card-store" key={currentItem.id}>
                          {currentItem.store && currentItem.store.logo ? (
                            <>
                              <img
                                className="card-store-image"
                                src={currentItem.store.logo}
                                alt={currentItem.store.name || "Store"}
                              />
                              <span className="card-store-price">
                                {currentItem.current_price + ",-"}
                              </span>
                            </>
                          ) : (
                            <p>Finner ingen butikk</p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </article>
            </Link>
          ))
      ) : (
        <p>No results found</p>
      )}
    </section>
  );
};

export default Results;
