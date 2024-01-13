import { useQuery, UseQueryResult } from 'react-query'
import { useSpotify } from './useSpotify'
import { UserProfile } from '@spotify/web-api-ts-sdk'

export const useUserProfile = (): UseQueryResult<UserProfile> => {
  const spotify = useSpotify()

  return useQuery(
    ['me'],
    async () => await spotify?.currentUser.profile(),
    {
      enabled: !!spotify
    })
}