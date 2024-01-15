import { SimplifiedTrack, SpotifyApi, Track as SpotifyTrack } from '@spotify/web-api-ts-sdk'
import { Track } from '../../_types/custom/Track'
import { PITCH_CLASSES } from './pitchClassResolver'

export const addTrackFeatures = async (
  spotify: SpotifyApi | null,
  trackResponse: (SpotifyTrack | SimplifiedTrack)[],
): Promise<Track[]> => {
  
  let trackIds: string[] = []
  const tracks: Partial<Track>[] = (trackResponse).map(t => {
    trackIds = [...trackIds, t.id]

    return {
      id: t.id,
      uri: t.uri,
      artist: t.artists[0]?.name || '',
      title: t.name,
      collectionNumber: t.track_number
    }
  })
  
  const features = await spotify?.tracks.audioFeatures(trackIds) || []

  tracks.forEach(t => {
    const { key, mode } = features[tracks.indexOf(t)]

    t.key = {
      rootPitch: PITCH_CLASSES[key],
      minor: mode === 0
    }
  })

  return tracks as Track[]
}