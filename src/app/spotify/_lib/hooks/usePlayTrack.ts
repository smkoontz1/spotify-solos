import { useMutation } from 'react-query'
import { useSpotify } from './useSpotify'

export const usePlayTrack = () => {
  const spotify = useSpotify()

  return useMutation({
    mutationFn: async (uri: string) => spotify?.player.startResumePlayback(
      '',
      undefined,
      [uri])
  })
}