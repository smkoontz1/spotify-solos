import { useQuery } from 'react-query'
import { useSpotify } from './useSpotify'
import { Track as TrackResponse } from '@spotify/web-api-ts-sdk'
import { TrackCollection } from '../../_types/custom/TrackCollection'
import { addTrackFeatures } from '../util/trackUtils'

export const usePlaylist = (id: string) => {
  const spotify = useSpotify()

  return useQuery<TrackCollection>(
    ['playlist', id],
    async () => {
      const playlistResponse = await spotify?.playlists.getPlaylist(id)
      const trackResponse = playlistResponse?.tracks.items.map(pt => pt.track as TrackResponse) || []
      const tracks = await addTrackFeatures(spotify, trackResponse)

      return {
        title: playlistResponse?.name || '',
        images: playlistResponse?.images || [],
        tracks
      }
    },
    { enabled: !!spotify })
}