import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  resetStates: () => void;
  searchText: string;
  setSearchRequest: React.Dispatch<React.SetStateAction<string>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  priceFrom: string | number;
  setPriceFrom: React.Dispatch<React.SetStateAction<string | number>>;
  priceTo: string | number;
  setPriceTo: React.Dispatch<React.SetStateAction<string | number>>;
  popularSearches: string[];
  availableBrands: string[];
  selectedBrand: string;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  valgtVare: string;
  navActive: boolean;
  setNavActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout: React.FC<LayoutProps> = ({
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
}) => {
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
          navActive={navActive}
          setNavActive={setNavActive}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
