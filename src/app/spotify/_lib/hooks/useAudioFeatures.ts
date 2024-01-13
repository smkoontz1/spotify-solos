import { useQuery, UseQueryResult } from 'react-query'
import { useSpotify } from './useSpotify'
import { AudioFeatures } from '@spotify/web-api-ts-sdk'

interface Props {
  id: string
}

export const useAudioFeatures = ({ id }: Props): UseQueryResult<AudioFeatures> => {
  const spotify = useSpotify()  

  return useQuery(
    ['audio-features', id],
    async () => await spotify?.tracks.audioFeatures(id) || {} as AudioFeatures,
    {
      enabled: !!spotify
    })
}