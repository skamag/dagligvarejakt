import PageNavigation from "../components/PageNavigation";
import Sort from "../components/Sort";
import Results from "../components/Results";
import "./Home.css";

interface HomeProps {
  data: any[];
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
