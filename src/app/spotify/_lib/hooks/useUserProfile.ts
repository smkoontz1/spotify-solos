import { useQuery, UseQueryResult } from 'react-query'
import { useSpotify } from './useSpotify'
import { User } from '@spotify/web-api-ts-sdk'

export const useUserProfile = (): UseQueryResult<User> => {
  const spotify = useSpotify()

  return useQuery(
    ['me'],
    async (): Promise<any> => await spotify?.users.profile,
    {
      enabled: !!spotify
    })
}