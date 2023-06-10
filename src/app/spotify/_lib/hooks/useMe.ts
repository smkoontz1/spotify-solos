import { useQuery, UseQueryResult } from 'react-query'
import axios from 'axios'

export const useMe = (): UseQueryResult<any> => {

  return useQuery(['me'], async (): Promise<any> => {
    
    let accessToken = localStorage.getItem('access_token')

    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    
    return response?.data
  })
}