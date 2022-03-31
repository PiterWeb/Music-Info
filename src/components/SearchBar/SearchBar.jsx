import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import "./SearchBar.css";

function SearchBar() {

  const location = useLocation();

  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {

    if ((location.search === "" || null) && location.pathname === "/") {
      setSearchQuery("");
    }
    
  }, [location.search , location.pathname]);
  return (
    <div className="search">
      <input
        className="inputSearch"
        type="text"
        placeholder="Search ..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
