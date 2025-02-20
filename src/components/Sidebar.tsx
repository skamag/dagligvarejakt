import React from "react";
import { Link } from "react-router-dom";

function Sidebar({
  setSearchRequest,
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
    <div className={`sidebar ${navActive && "sidebar-toggle"}`}>
      <div className="price-range-container">
        <h2 className="sidebar-header">Pris</h2>
        <div className="price-inputs-wrapper">
          <input
            type="number"
            placeholder="Fra"
            value={priceFrom}
            onChange={(e) => {
              setPriceFrom(Number(e.target.value) || "");
              setPage(1);
            }}
          />
          <input
            type="number"
            placeholder="Til"
            value={priceTo}
            onChange={(e) => {
              setPriceTo(Number(e.target.value) || "");
              setPage(1);
            }}
          />
        </div>
      </div>
      <div className="common-searches">
        <h2 className="sidebar-header">Populære søk</h2>
        <ul>
          {popularSearches.map((tag) => (
            <li key={tag} className="brand-option">
              {/* {valgtVare ?  <Link to="/">{button(tag)}</Link> : button(tag)} */}
              <Link to="/">
                <button
                  onClick={() => {
                    setSearchRequest(tag);
                    setSelectedBrand("");
                    setPage(1);
                    setNavActive(false);
                  }}
                >
                  {tag}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="brands-container">
        <h2 className="sidebar-header">Merker</h2>
        <ul>
          {availableBrands.map((brand) => (
            <li key={brand} className="brand-option">
              <Link to="/">
                <button
                  onClick={() => {
                    setSearchRequest("");
                    setSelectedBrand(brand);
                    setPage(1);
                    setNavActive(false);
                  }}
                  className={`${
                    brand.toLowerCase() === selectedBrand.toLowerCase() &&
                    "selected-brand"
                  }`}
                >
                  {brand}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
