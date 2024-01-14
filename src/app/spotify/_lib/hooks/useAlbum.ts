import { useQuery } from 'react-query'
import { useSpotify } from './useSpotify'

export const useAlbum = (id: string) => {
  const spotify = useSpotify()

  return useQuery(
    ['album', id],
    async () => await spotify?.albums.get(id),
    {
      enabled: !!spotify
    }
  )
}