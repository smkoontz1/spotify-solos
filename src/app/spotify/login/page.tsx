'use client'

import { 
  generateRandomString, 
  generateCodeChallenge,
  CLIENT_ID,
  REDIRECT_URI
} from '../_lib/spotifyAuth'

const logIn = () => {
  let codeVerifier = generateRandomString(128)
  
  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16)
    
    let scopes = [
      'playlist-read-collaborative',
      'playlist-read-private',
      'user-read-currently-playing',
      'user-read-email',
      'user-read-private',
    ]
    let scope = scopes.join(' ')
  
    localStorage.setItem('code_verifier', codeVerifier);
  
    let args = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
  
    window.location = ('https://accounts.spotify.com/authorize?' + args) as unknown as Location;
  });
}

export default function SpotifyLogin() {

  return (
    <button onClick={logIn}>Log in to spotify</button>
  )
}