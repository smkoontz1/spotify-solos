'use client'

import { CLIENT_ID, REDIRECT_URI } from '../_lib/spotifyAuth'

export default function TokenRetriever() {

  const urlParams = new URLSearchParams(window.location.search)
  let code = urlParams.get('code')

  let codeVerifier = localStorage.getItem('code_verifier')

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier
  } as unknown as URLSearchParams)

  const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('access_token', data.access_token);

      window.location = 'http://localhost:3000/spotify/now-playing' as unknown as Location
    })
    .catch(error => {
      console.error('Error:', error);
    });
}