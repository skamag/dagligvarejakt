import { Link } from "react-router-dom";

const Navbar: React.FC<any> = ({
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
          <Link to="/" className="link" onClick={() => resetStates()}>
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
          />
          {valgtVare !== "" ? <Link to="/">{button()}</Link> : button()}
        </div>
      </header>
      <div
        className={`${navActive ? "dark-screen" : "dark-screen-hidden"}`}
      ></div>
    </>
  );
};

export default Navbar;
