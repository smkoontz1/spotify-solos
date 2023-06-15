import { Artist } from './Artist'
import { AudioFeatures } from './AudioFeatures'

export interface Track {
  trackId: string
  title: string
  albumArtUrl: string
  artists: Artist[]
  audioFeatures: AudioFeatures
}