import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import setCookie from "../../utils/cookies/setCookie";
import getAccessToken from "../../utils/spotifyApi/getAccessToken";
import spotifyApi from "../../utils/spotifyApi/main";
import { useRecoilState } from "recoil";
import userState from "../../atoms/userAtom";

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

function Callback() {
  const navigate = useNavigate();

  const [_, setUser] = useRecoilState(userState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getAccessToken(code).then(
        ({ access_token, refresh_token, expires_in }) => {
          expires_in = expires_in / 86400;
          setCookie("spotifyAccessToken", access_token, expires_in);
          setCookie("spotifyRefreshToken", refresh_token);
          spotifyApi.getUserProfile().then(({ display_name }) => {
            setUser(truncate(display_name, 12));
            navigate("/");
          });
        }
      );
    }
  }, []);

  return <>Redirecting ...</>;
}

export default Callback;
