import { useQuery } from 'react-query'
import { useSpotify } from './useSpotify'
import { TrackCollection } from '../../_types/custom/TrackCollection'
import { addTrackFeatures } from '../util/trackUtils'

export const useAlbum = (id: string) => {
  const spotify = useSpotify()

  return useQuery<TrackCollection>(
    ['album', id],
    async () => {
      const albumResponse = await spotify?.albums.get(id)
      const trackResponse = albumResponse?.tracks.items || []
      const tracks = await addTrackFeatures(spotify, trackResponse)

      return {
        title: albumResponse?.name || '',
        images: albumResponse?.images || [],
        tracks
      }
    },
    { enabled: !!spotify })
}