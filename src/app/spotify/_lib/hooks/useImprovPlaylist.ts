import { useQuery, UseQueryResult } from 'react-query'
import axios from 'axios'
import { getAccessToken } from '../helpers/accessToken'
import { Playlist } from '../../_types/custom/Playlist'
import { Track } from '../../_types/custom/Track'
import { Artist } from '../../_types/custom/Artist'

export const useImprovPlaylist = (): UseQueryResult<Playlist> => {

  return useQuery(['improv', 'playlist'], async (): Promise<Playlist> => {
    const accessToken = await getAccessToken()

    const allPlaylists = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const guitarImprovPlaylist = allPlaylists?.data?.items.find((i: { name: string }) => i.name === 'Guitar Improv')
    const tracksUrl = guitarImprovPlaylist.tracks.href

    const playlistTracksResponse = await axios.get(tracksUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const playlistItems = playlistTracksResponse?.data?.items

    const customTracks = playlistItems.map((i: any) => {
      return {
        title: i.track.name,
        albumArtUrl: i.track.album.images[2],
        artists: i.track.artists.map((a: any) => {
          return {
            name: a.name
          } as Artist
        })
      } as Track
    })

    return {
      title: guitarImprovPlaylist?.name,
      tracks: customTracks
    }
  })
}