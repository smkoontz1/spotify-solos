import { useQuery } from 'react-query'
import { useSpotify } from './useSpotify'

interface Props {
  offset: number
}

export const DEFAULT_PAGE_SIZE = 50

export const useCurrentUserPlaylists = ({ offset }: Props) => {
  const spotify = useSpotify()

  return useQuery(
    ['current-user-playlists', offset],
    async () => await spotify?.currentUser.playlists.playlists(DEFAULT_PAGE_SIZE, offset),
    { enabled: !!spotify }
  )
}