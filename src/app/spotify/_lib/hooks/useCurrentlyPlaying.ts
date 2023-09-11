import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { getAccessToken } from '../util/accessToken'

export const useCurrentlyPlaying = (): UseQueryResult<any> => {

  return useQuery(['me', 'player', 'currently-playing'], async (): Promise<any> => {
    
    const accessToken = await getAccessToken()

    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    
    return response?.data
  })
}