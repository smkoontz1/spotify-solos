import { useQuery, UseQueryResult } from 'react-query'
import axios from 'axios'
// import { getAccessToken } from '../util/accessToken'
import { Playlist } from '../../_types/custom/Playlist'
import { Track } from '../../_types/custom/Track'
import { Artist } from '../../_types/custom/Artist'
import { useSpotify } from './useSpotify'

export const useImprovPlaylist = (): UseQueryResult<Playlist> => {
  const spotify = useSpotify()

  return useQuery(
    ['improv', 'playlist'],
    async (): Promise<Playlist> => {
    
    return {} as Playlist


    // const allPlaylists = await axios.get('https://api.spotify.com/v1/me/playlists', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })

    // console.log(allPlaylists)

    // const guitarImprovPlaylist = allPlaylists?.data?.items.find((i: { name: string }) => i.name === 'My Next Thirty Years')
    // const tracksUrl = guitarImprovPlaylist.tracks.href

    // const playlistTracksResponse = await axios.get(tracksUrl, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })

    // const playlistItems = playlistTracksResponse?.data?.items

    // const customTracks = playlistItems.map((i: any) => {
    //   return {
    //     trackId: i.track.id,
    //     title: i.track.name,
    //     albumArtUrl: i.track.album.images[2].url,
    //     artists: i.track.artists.map((a: any) => {
    //       return {
    //         name: a.name
    //       } as Artist
    //     })
    //   } as Track
    // })

    // return {
    //   title: guitarImprovPlaylist?.name,
    //   tracks: customTracks
    // }
  })
}