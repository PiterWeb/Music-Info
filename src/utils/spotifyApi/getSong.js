import spotifyApi from "./main";

const getSong = (songId) => {
    return spotifyApi.getSong(songId);
}

export default getSong;