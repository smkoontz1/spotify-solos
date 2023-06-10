import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import qs from 'qs'

interface Props {
  id: string
}

export const useAudioFeatures = ({ id }: Props): UseQueryResult<any> => {

  return useQuery(['audio', 'features', id], async (): Promise<any> => {
    
    let accessToken = localStorage.getItem('access_token')

    const response = await axios.get('https://api.spotify.com/v1/audio-features', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      params: {
        ids: id
      },
      paramsSerializer: function(params) {
        return qs.stringify(params)
      }
    })
    
    console.log('RESPONSE', response)

    return response?.data
  })
}