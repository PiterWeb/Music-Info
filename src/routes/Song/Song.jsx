import { useEffect, useState } from "react";
import { useParams , useLocation , useNavigate } from "react-router-dom";
import { createElement } from "react/cjs/react.development";
import Player from "../../components/Player/Player";
import getSong from "../../utils/spotifyApi/getSong";
import Recomendations from "../../components/Recomendations/Recomendations";
import SpotifyIconWhite from "../../images/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_White.png";
import "./Song.css";

function Song() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [song, setSong] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery] = useState(location.search);

  useEffect(() => {
    getSong(id).then((data) => {
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

  useEffect(() => {
    
    if (searchQuery !== location.search) {

      navigate("/" , {
        search: location.search
      })  

    }

  }, [location.search])

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
              <a
                href={`https://open.spotify.com/track/${song.id}`}
                target="_blank"
                style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}
              >
                <div

                  id="openSpotify"

                >
                  <p>Open on Spotify</p>
                  <img
                    src={SpotifyIconWhite}
                    id="spotifyIcon"
                    alt="Spotify Icon"
                    style={{ width: "5vh", height: "100%" }}
                  />
                </div>
              </a>
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
