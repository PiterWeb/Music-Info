import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createElement } from "react/cjs/react.development";
import Player from "../../components/Player/Player";
import useSong from "../../utils/spotifyApi/useSong";
import Recomendations from "../../components/Recomendations/Recomendations";
import "./Song.css";

function Song() {
  const { id } = useParams();

  const [song, setSong] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useSong(id).then((data) => {
      var artists = data.artists.map((artist) => {
        return {
          name: artist.name,
          key: artist.id,
          link: artist.href,
        };
      });
      data.artists = artists;
      setSong(data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <section id="songSection">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <article id="songInfo">
            <div className="songColumn">
              <h1 id="songName">{song.name}</h1>
              <p id="artists">
                {song.artists
                  .map((artist) => artist.name)
                  .reduce((all, artist) => all + ", " + artist)}
              </p>

              <p id="album">Album: {song.album.name}</p>

              <Player url={song.preview_url} />
            </div>
            <div className="songColumn">
              <img
                src={song.album.images[0].url}
                id="songImage"
                alt={song.name}
              />
            </div>
          </article>

          <Recomendations
            artists={song.artists
              .map((artist) => artist.key)
              .reduce((all, artist) => all + "," + artist)}
            track={song.id}
          />
        </>
      )}
    </section>
  );
}

export default Song;
