const redirectUri = 'http://localhost:3000/callback';
const spotifyAccountURL = "https://accounts.spotify.com/";
const scope = "user-read-private user-read-email";
const clientId = "2fe1b92d66624962b729862ddc931807";
const codeChallengeMethod = "S256";

function generateRandomString(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

export const codeChallenge = generateRandomString(16);

const authorizeURL = `${spotifyAccountURL}authorize?client_id=${clientId}&code_challenge_method=${codeChallengeMethod}$code_challenge=${codeChallenge}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

export default authorizeURL