import axios from 'axios'
import qs from 'qs'
import { useQuery, UseQueryResult } from 'react-query'
import { Album } from '../../_types/custom/Album'
import { getAccessToken } from '../util/accessToken'

interface Props {
  searchQuery: string
}

export const useAlbumSearch = ({ searchQuery }: Props): UseQueryResult<Album> => {

  return useQuery(['album', searchQuery], async (): Promise<Album> => {

    const accessToken = await getAccessToken()

    const queryString = `album:${searchQuery}`

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        q: queryString,
        type: 'album'
      },
      paramsSerializer: function(params) {
        return qs.stringify(params)
      }
    })

    const albumSearchResponse = response?.data?.albums[0]
    const albumId = albumSearchResponse?.id

    const albumTracksResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: albumId
      },
      paramsSerializer: function(params) {
        return qs.stringify(params)
      }
    })

    return {}
  })
}