import axios from 'axios'
import { CLIENT_ID } from "../spotifyAuth"

export const getAccessToken = async (): Promise<string> => {
  const accessTokenExpiry = Number.parseInt(localStorage.getItem('access_token_expiry') || '')

  if (accessTokenExpiry > Date.now()) {
    console.log(`Current time: ${Date.now()}, Access Token expiry: ${accessTokenExpiry}`)
    return localStorage.getItem('access_token') || ''
  }

  console.log('Expired. Refreshing.')
  // Refresh token
  const refreshToken = localStorage.getItem('refresh_token')

  const refreshTokenResponse = await axios.post('https://accounts.spotify.com/api/token', {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: CLIENT_ID
  },
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })

  const tokenData = refreshTokenResponse?.data?.data
  const newAccessToken = tokenData.access_token 

  localStorage.setItem('access_token', newAccessToken)
  localStorage.setItem('access_token_expiry', (Date.now() + (tokenData.expires_in * 1000)).toString())
  localStorage.setItem('refresh_token', tokenData.refresh_token)

  return newAccessToken
}