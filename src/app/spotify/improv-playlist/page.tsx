'use client'

import { ListGroup, Container } from 'react-bootstrap'
import { useImprovPlaylist } from '../_lib/hooks/useImprovPlaylist'

export default function ImprovPlaylist() {

  const { 
    isFetching: isPlaylistsFetching,
    isError: isPlaylistsError,
    error: playlistsError,
    data: playlists
  }  = useImprovPlaylist()



  return (
    <Container>
      {playlists &&
        <>
          <h1 className='mb-3'>{playlists.title}</h1>
          <ListGroup>
            {playlists.tracks.map(t => {
              return (
                <ListGroup.Item>{t.title} - {t.artists.map(a => a.name).join(', ')}</ListGroup.Item>
              )
            })}
          </ListGroup>
        </>
      }
    </Container>
  )
}