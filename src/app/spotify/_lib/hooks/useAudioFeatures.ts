import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import qs from 'qs'
import { getAccessToken } from '../helpers/accessToken'
import { AudioFeatures } from '../../_types/custom/AudioFeatures'

interface Props {
  id: string
}

export const useAudioFeatures = ({ id }: Props): UseQueryResult<AudioFeatures> => {

  return useQuery(['audio', 'features', id], async (): Promise<AudioFeatures> => {
    
    const accessToken = await getAccessToken()

    const response = await axios.get('https://api.spotify.com/v1/audio-features', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        ids: id
      },
      paramsSerializer: function(params) {
        return qs.stringify(params)
      }
    })
    
    const audioFeatures = response?.data?.audio_features[0]

    return {
      key: audioFeatures?.key,
      mode: audioFeatures?.mode === 0 ? 'minor' : 'major'
    }
  })
}