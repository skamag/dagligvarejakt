import { Link } from "react-router-dom";

interface ResultsProps {
  data: any[];
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
            (value: any, index: any, self: any) =>
              index ===
              self.findIndex(
                (t: any) => t.place === value.place && t.name === value.name
              )
          )
          .map((item: any) => (
            <Link to="/vare" className="link" key={item.id}>
              <article
                className="product-card"
                onClick={() => setValgtVare(item.name)}
              >
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
                        (product: any) =>
                          product.name &&
                          product.name
                            .toLowerCase()
                            .includes(item.name.toLowerCase())
                      )
                      .map((currentItem: any) => (
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
