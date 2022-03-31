import useSearch from "../../hooks/useSearch";
import Card from "../Card/Card";
import {searchResultsState , searchErrorState} from "../../atoms/searchAtom";
import { useRecoilState } from "recoil";
import './SearchResults.css'

function SearchResults() {
  
    const [searchResults] = useRecoilState(searchResultsState);
    const [error] = useRecoilState(searchErrorState);

  return (
    <>
      {error ? (
        <h3>You must resfresh your session</h3>
      ) : (
        <section className="searchResults">
          {searchResults.map((item) => (
            <Card {...item} />
          ))}
        </section>
      )}
    </>
  );
}

export default SearchResults;
