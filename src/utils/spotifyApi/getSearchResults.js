import spotifyApi from "./main";

const useSearchResults = async (query , type) => {
    const types =  ['album' , 'track' , 'artist' , 'playlist'];
    if (types.includes(type)) {
        return await spotifyApi.searchElement(query , type);
    }
}

export default useSearchResults;