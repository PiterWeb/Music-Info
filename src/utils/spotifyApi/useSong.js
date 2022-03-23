import spotifyApi from "./main";

const useSong = (songId) => {
    return spotifyApi.getSong(songId);
}

export default useSong;