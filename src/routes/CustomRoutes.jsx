import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import App from "../App";
import NotFound from "./errors/404";
import Search from "./Search/Search";
import Song from "./Song/Song";
import Callback from "./Callback/Callback";
import { useRecoilState } from "recoil";
import playingAudioState from "../atoms/playingAudioAtom";
import { useEffect } from "react";
import userState from "../atoms/userAtom";
import spotifyApi from "../utils/spotifyApi/main";
import getCookie from "../utils/cookies/getCookie";

function CustomRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useRecoilState(userState);
  const [playing, setPlaying] = useRecoilState(playingAudioState);

  const routesWithoutAudio = ["/", "/search", "/callback"];

  useEffect(() => {
    if (playing && routesWithoutAudio.includes(location.pathname)) {
      setPlaying(false);
      navigate(0, { replace: true });
    }
  }, [location]);

  useEffect(() => {
    if (
      (!getCookie("spotifyAccessToken") && getCookie("spotifyRefreshToken")) ||
      !user
    ) {
      spotifyApi
        .getUserProfile()
        .then(({ display_name }) => {
          if (display_name) {
            sessionStorage.setItem("user", display_name);
            return setUser(display_name);
          }
        })
        .catch((e) => {
          sessionStorage.removeItem("user");
          return setUser(null);
        });
    }

    if (!getCookie("spotifyRefreshToken")) {
      sessionStorage.removeItem("user");
      setUser(null);
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search" element={<Search />} />
      <Route path="/song/">
        <Route path=":id" element={<Song />} />
      </Route>
      <Route path="/callback" element={<Callback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default CustomRoutes;
