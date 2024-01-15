import { Image } from '@spotify/web-api-ts-sdk'
import { Track } from './Track'

export interface TrackCollection {
  title: string,
  images: Image[]
  tracks: Track[]
}