import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Vare from "./pages/Vare";
import "./App.css";

const API_URL = "https://kassal.app/api/v1/products";
const PAGE_SIZE = 100;
const KEY = "LmOFSdN8MdRSiZOVBqFg4uP6uKdvBKpuoHTdnkiW";

function App() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchRequest, setSearchRequest] = useState("");
  const [selectedSort, setSelectedSort] = useState("date_asc");
  const [priceFrom, setPriceFrom] = useState<any>("");
  const [priceTo, setPriceTo] = useState<any>("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [valgtVare, setValgtVare] = useState("");
  const [navActive, setNavActive] = useState(false);

  const popularSearches = [
    "Ullundertøy",
    "Pizza",
    "Avfallsposer",
    "Mørk sjokolade",
    "Bleier",
    "Batterier",
    "Kaffe filtermalt",
  ];

  const availableBrands = [
    "Pierre Robert",
    "Toro",
    "Go Vegan",
    "Rema 1000",
    "Änglamark",
    "First Price",
    "Friskies",
    "Coop",
    "X-tra",
    "Pampers",
  ];

  useEffect(() => {
    const headers = { Authorization: `Bearer ${KEY}` };

    const fetchData = async () => {
      try {
        setLoading(true);

        // if (searchRequest.length > 0 && searchRequest.length < 3) {
        //   setData([]); // No results until 3+ letters
        //   setLoading(false);
        //   return;
        // }

        let url = `${API_URL}?size=${PAGE_SIZE}&page=${page}`;

        url += `&search=${encodeURIComponent(searchRequest)}`;

        // if (searchRequest.length >= 3) {
        //   url += `&search=${encodeURIComponent(searchRequest)}`;
        // }

        if (selectedSort) {
          url += `&sort=${selectedSort}`;
        }

        if (priceFrom > 0) {
          url += `&price_min=${priceFrom}`;
        }

        if (priceTo > 0 && priceTo >= priceFrom) {
          url += `&price_max=${priceTo}`;
        }

        if (selectedBrand) {
          url += `&brand=${selectedBrand}`;
          console.log(selectedBrand);
        }

        const response = await fetch(url, { headers });
        const json = await response.json();
        const fetchedData = json.data || [];

        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchRequest, page, selectedSort, priceFrom, priceTo, selectedBrand]);

  const resetStates = () => {
    setPage(1);
    setSearchText("");
    setSearchRequest("");
    setSelectedSort("date_asc");
    setPriceFrom("");
    setPriceTo("");
    setSelectedBrand("");
    setValgtVare("");
  };

  const handleSearch = () => {
    if (searchText.length < 3) {
      // setData([0])
      alert("Søketekst må inneholde minst 3 tegn");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSearchRequest(searchText);
    }, 500);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                resetStates={resetStates}
                searchText={searchText}
                setSearchText={setSearchText}
                setSearchRequest={setSearchRequest}
                handleSearch={handleSearch}
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
            }
          >
            <Route
              index
              element={
                <Home
                  data={data}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                  setValgtVare={setValgtVare}
                  page={page}
                  setPage={setPage}
                  loading={loading}
                />
              }
            />
            <Route
              path="/vare"
              element={<Vare data={data} valgtVare={valgtVare} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
