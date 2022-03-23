import getCookie from "../cookies/getCookie";
import setCookie from "../cookies/setCookie";
import { Buffer } from "buffer";
const spotifyApiURL = "https://api.spotify.com/v1/";

class spotifyWebApi {
  constructor({ clientId, clientSecret }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  searchElement(query, type) {
    return new Promise((resolve, reject) => {
      fetch(spotifyApiURL + "search?q=" + query + "&type=" + type, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.getAccessToken(),
        },
      })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  }

  getSong(songId) {
    return new Promise((resolve, reject) => {
      fetch(spotifyApiURL + "tracks/" + songId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.getAccessToken(),
        },
      })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  }

  getRecomendations(seed_artists, seed_genres, seed_tracks) {
    return new Promise((resolve, reject) => {
      fetch(
        spotifyApiURL +
          "recommendations?limit=3&seed_artists=" +
          seed_artists +
          "&seed_genres=" +
          seed_genres +
          "&seed_tracks=" +
          seed_tracks,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + this.getAccessToken(),
          },
        }
      )
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  }

  getUserProfile() {
    return new Promise((resolve, reject) => {
      fetch(spotifyApiURL + "me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.getAccessToken(),
        },
      })
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error));
    });
  }

  getAccessToken() {
    if (!getCookie("spotifyAccessToken")) {
      this.refreshAccessToken().then((accessToken) => {
        return accessToken;
      });
    }

    return getCookie("spotifyAccessToken");
  }

  setAccessToken(accessToken, expiration) {
    setCookie("spotifyAccessToken", accessToken, expiration);
  }

  refreshAccessToken() {
    return new Promise((resolve, reject) => {
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer(this.clientId + ":" + this.clientSecret).toString(
              "base64"
            ),
        },
        body: `grant_type=refresh_token&refresh_token=${getCookie(
          "spotifyRefreshToken"
        )}`,
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          var { access_token, expires_in } = data;
          expires_in = expires_in / 86400;
          this.setAccessToken(access_token, expires_in);
          resolve(access_token);
        })
        .catch((error) => reject(error));
    });
  }
}

const spotifyApi = new spotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
