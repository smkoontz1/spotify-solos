import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

export const useCurrentlyPlaying = (): UseQueryResult<any> => {

  return useQuery(['me', 'player', 'currently-playing'], async (): Promise<any> => {
    
    let accessToken = localStorage.getItem('access_token')

    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    
    return response?.data
  })
}