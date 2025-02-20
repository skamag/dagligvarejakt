import React from "react";

function Sort({ setPage, selectedSort, setSelectedSort }) {
  return (
    <div className="sort-container">
      <select
        onChange={(e) => {
          setSelectedSort(e.target.value);
          setPage(1);
        }}
        value={selectedSort}
      >
        <option value="date_desc">Nyeste først</option>
        <option value="date_asc">Eldste først</option>
        <option value="name_asc">Produktnavn A &rarr; Å</option>
        <option value="name_desc">Produktnavn Å &rarr; A</option>
        <option value="price_asc">Laveste pris</option>
        <option value="price_desc">Høyeste pris</option>
      </select>
    </div>
  );
}

export default Sort;
