import React from "react";
import PageNavigation from "../components/PageNavigation";
import Sort from "../components/Sort";
import Results from "../components/Results";
import "./Home.css";

function Home({
  data,
  selectedSort,
  setSelectedSort,
  setValgtVare,
  page,
  setPage,
  loading,
}) {
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
}

export default Home;
