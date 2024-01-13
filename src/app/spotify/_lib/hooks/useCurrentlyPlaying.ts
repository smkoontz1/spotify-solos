import { useQuery, UseQueryResult } from 'react-query'
import { useSpotify } from './useSpotify'
import { PlaybackState } from '@spotify/web-api-ts-sdk'

export const useCurrentlyPlaying = (): UseQueryResult<PlaybackState> => {
  const spotify = useSpotify()

  return useQuery(
    ['currently-playing'],
    async () => await spotify?.player.getCurrentlyPlayingTrack() || {} as PlaybackState,
    {
      enabled: !!spotify
    })
}