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
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchRequest, setSearchRequest] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("date_asc");
  const [priceFrom, setPriceFrom] = useState<number | string>("");
  const [priceTo, setPriceTo] = useState<number | string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [valgtVare, setValgtVare] = useState<string>("");
  const [navActive, setNavActive] = useState<boolean>(false);

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

        if (Number(priceFrom) > 0) {
          url += `&price_min=${priceFrom}`;
        }

        if (Number(priceTo) > 0 && priceTo >= priceFrom) {
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

  const resetStates = (): void => {
    setPage(1);
    setSearchText("");
    setSearchRequest("");
    setSelectedSort("date_asc");
    setPriceFrom("");
    setPriceTo("");
    setSelectedBrand("");
    setValgtVare("");
  };

  const handleSearch = (): void => {
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
