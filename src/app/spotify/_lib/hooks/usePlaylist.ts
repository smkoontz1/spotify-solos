import { useQuery } from 'react-query'
import { useSpotify } from './useSpotify'

export const usePlayList = (id: string) => {
  const spotify = useSpotify()

  return useQuery(
    ['playlist', id],
    async () => await spotify?.playlists.getPlaylist(id),
    {
      enabled: !!spotify
    }
  )
}