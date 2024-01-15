import { Key } from './Key'

export interface Track {
  id: string
  uri: string
  title: string
  artist: string
  collectionNumber: number
  key: Key
}