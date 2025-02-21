import { Link } from "react-router-dom";

interface NavbarProps {
  resetStates: () => void;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  valgtVare: string;
  navActive: boolean;
  setNavActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  resetStates,
  searchText,
  setSearchText,
  handleSearch,
  valgtVare,
  navActive,
  setNavActive,
}) => {
  const toggleSidebar = () => {
    // navActive ? setNavActive(false) : setNavActive(true)

    if (navActive) {
      setNavActive(false);
    } else {
      setNavActive(true);
      window.addEventListener("scroll", function checkScroll() {
        if (window.scrollY > 5) {
          setNavActive(false);
          window.removeEventListener("scroll", checkScroll);
        }
      });
    }
  };

  const button = () => (
    <button className="search-button" onClick={() => handleSearch()}>
      <i className="fa fa-search"></i>
    </button>
  );

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link
            to="/"
            className="link"
            onClick={() => {
              resetStates();
              window.scrollTo({ top: 0 });
            }}
          >
            <h1 className="logo-text">Dagligvarejakt</h1>
            <h1 className="logo-icon">DVJ</h1>
          </Link>
          <button className="nav-burger" onClick={() => toggleSidebar()}>
            <div
              className={`line ${navActive && "line-toggle line1-toggle"}`}
            ></div>
            <div
              className={`line ${navActive && "line-toggle line2-toggle"}`}
            ></div>
            <div
              className={`line ${navActive && "line-toggle line3-toggle"}`}
            ></div>
          </button>
        </div>
        <div className="searchbar-container">
          <input
            type="text"
            placeholder="Søk etter vare..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {valgtVare !== "" ? (
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {button()}
            </Link>
          ) : (
            button()
          )}
        </div>
      </header>
      <div
        className={`${navActive ? "dark-screen" : "dark-screen-hidden"}`}
      ></div>
    </>
  );
};

export default Navbar;
