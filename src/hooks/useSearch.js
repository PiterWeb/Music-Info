import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import getSearchResults from "../utils/spotifyApi/getSearchResults";
import { useRecoilState } from "recoil";
import {searchQueryState , searchResultsState , searchErrorState} from "../atoms/searchAtom";

function useSearch() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
    const [error, setError] = useRecoilState(searchErrorState);

    useEffect(() => {
        if (searchParams.get("q") === null) {
            return setSearchParams({})
        }

        setSearchQuery(searchParams.get("q"));
    }, []);

    useEffect(() => {

        if (searchQuery !== "") {
            getSearchResults(searchQuery, "track")
              .then((data) => {
                let results = data.tracks.items;
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

    return { searchResults, searchQuery, setSearchQuery, error };

}

export default useSearch;