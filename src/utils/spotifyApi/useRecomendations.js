import spotifyApi from "./main";

const useRecomendations = (seed_artists, seed_genres, seed_tracks) => {
  return spotifyApi.getRecomendations(seed_artists, seed_genres, seed_tracks);
};

export default useRecomendations;
