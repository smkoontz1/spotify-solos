import { useQuery } from 'react-query'
import { useSpotify } from './useSpotify'

interface Props {
  searchText: string
}

export const useSearchAlbums = ({ searchText }: Props) => {
  const spotify = useSpotify()

  return useQuery(
    ['search-albums', searchText],
    async () => (await spotify?.search(searchText, ['album']))?.albums,
    {
      enabled: !!spotify && !!searchText
    }
  )
}