import { Buffer } from "buffer";
import { codeChallenge } from "./authorizeURL";
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const endpoint = "api/token";
const spotifyAccountURL = "https://accounts.spotify.com/";
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const getAccessToken = (code) =>
  new Promise((resolve, reject) => {
    fetch(spotifyAccountURL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${client_id}&code_verifier=${codeChallenge}`,
    })
      .then((response) => {
        console.log(response);
        console.log(import.meta.env.VITE_SPOTIFY_CLIENT_SECRET);
        resolve(response.json());
      })
      .catch((error) => reject(error));
  });

export default getAccessToken;
