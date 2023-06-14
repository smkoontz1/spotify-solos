import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import qs from 'qs'
import { getAccessToken } from '../helpers/accessToken'

interface Props {
  id: string
}

export const useAudioFeatures = ({ id }: Props): UseQueryResult<any> => {

  return useQuery(['audio', 'features', id], async (): Promise<any> => {
    const accessToken = await getAccessToken()

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
    
    return response?.data
  })
}