import { useEffect, useState } from "react";
import useRecomendations from "../../utils/spotifyApi/useRecomendations";
import Card from "../Card/Card";
import "./Recomendations.css";

function Recomendations({ artists, track }) {
  const [isLoading, setLoading] = useState(true);
  const [recomendations, setRecomendations] = useState();

  const genres = undefined;

  useEffect(() => {
    useRecomendations(artists, genres, track).then((data) => {
      var tracks = data.tracks.map((track) => {
        return {
          key: track.id,
          name: track.name,
          artists: track.artists,
          image: track.album.images[0].url,
        };
      });
      setRecomendations(tracks);
      window.scrollTo(0, 0);
      setLoading(false);
    });
  }, [artists, track]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <section id="recomendationsSection">
          <h1>Recomendations</h1>
          <div id="recomendations">
            {recomendations.map((recomendation) => (
              <Card
                key={recomendation.key}
                cardTitle={recomendation.name}
                cardArtists={recomendation.artists}
                cardImage={recomendation.image}
                cardLink={recomendation.key}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Recomendations;
