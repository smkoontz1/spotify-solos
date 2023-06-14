import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { CLIENT_ID } from '../spotifyAuth'

export const useAccessToken = (): UseQueryResult<string> => {

  const accessTokenExpiry = localStorage.getItem('access_token_expiry')

  return useQuery(['token', accessTokenExpiry], async (): Promise<string> => {
    if (accessTokenExpiry && Number.parseInt(accessTokenExpiry) > Date.now()) {
      console.log(`Current time: ${Date.now()}, Expiry: ${Number.parseInt(accessTokenExpiry)}`)
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

    console.log('Refresh response', refreshTokenResponse)

    return ''
  })
}