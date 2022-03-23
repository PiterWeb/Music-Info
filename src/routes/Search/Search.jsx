import Card from "../../components/Card/Card";
import useSearchResults from "../../utils/spotifyApi/useSearchResults";
import "./Search.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (searchParams.get("q") === null) {
      return setSearchQuery("");
    }

    setSearchQuery(searchParams.get("q"));
  }, []);

  useEffect(() => {
    if (searchQuery !== "") {
      useSearchResults(searchQuery, "track")
        .then((data) => {
          var results = data.tracks.items;
          results = results.map((track) => {
            return {
              cardTitle: track.name,
              cardArtists: track.artists,
              cardImage: track.album.images[0].url,
              cardLink: track.id,
              key: track.id,
            };
          });
          setSearchResults(results);
        })
        .catch(() => {
          setError(true);
        });
    } else {
      setSearchResults([]);
    }

    setSearchParams({ q: searchQuery });
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search">
      <input
        className="inputSearch"
        type="text"
        placeholder="Song / Playlist / Artist"
        value={searchQuery}
        onChange={handleSearch}
      />

      {error ? (
        <h3>You must login first</h3>
      ) : (
        <section className="searchResults">
          {searchResults.map((item) => (
            <Card {...item} />
          ))}
        </section>
      )}
    </div>
  );
}

export default Search;
