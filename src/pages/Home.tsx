import PageNavigation from "../components/PageNavigation";
import Sort from "../components/Sort";
import Results from "../components/Results";
import "./Home.css";

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

interface HomeProps {
  data: Data[];
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  setValgtVare: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

const Home: React.FC<HomeProps> = ({
  data,
  selectedSort,
  setSelectedSort,
  setValgtVare,
  page,
  setPage,
  loading,
}) => {
  return (
    <>
      <section className="products-section">
        <div className="products-navbar">
          <PageNavigation page={page} setPage={setPage} />
          <Sort
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setPage={setPage}
          />
        </div>
        <Results data={data} setValgtVare={setValgtVare} loading={loading} />
      </section>
    </>
  );
};

export default Home;
