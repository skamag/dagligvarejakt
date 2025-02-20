import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout({
  resetStates,
  searchText,
  setSearchRequest,
  setSearchText,
  handleSearch,
  selectedSort,
  setSelectedSort,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  popularSearches,
  availableBrands,
  selectedBrand,
  setSelectedBrand,
  setPage,
  valgtVare,
  navActive,
  setNavActive,
}) {
  return (
    <>
      <Navbar
        resetStates={resetStates}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        valgtVare={valgtVare}
        navActive={navActive}
        setNavActive={setNavActive}
      />
      <div className="sidebar-main-wrapper">
        <Sidebar
          setSearchRequest={setSearchRequest}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          priceFrom={priceFrom}
          setPriceFrom={setPriceFrom}
          priceTo={priceTo}
          setPriceTo={setPriceTo}
          popularSearches={popularSearches}
          availableBrands={availableBrands}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          setPage={setPage}
          valgtVare={valgtVare}
          navActive={navActive}
          setNavActive={setNavActive}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
