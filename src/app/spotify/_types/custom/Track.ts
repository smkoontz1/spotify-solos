import { Artist } from './Artist'

export interface Track {
  title: string
  albumArtUrl: string
  artists: Artist[]
}