import { Buffer } from "buffer";
import { codeChallenge } from "./authorizeURL";
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const endpoint = "api/token";
const spotifyAccountURL = "https://accounts.spotify.com/";
const client_secret = "23c81f784ace457dba8887bab41dfc1a";
const client_id = "2fe1b92d66624962b729862ddc931807";

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
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });

export default getAccessToken;
