'use client'

import { useState } from 'react'
import { Container, Modal, Table } from 'react-bootstrap'
import KeyLabel from '../_components/KeyLabel'
import { useImprovPlaylist } from '../_lib/hooks/useImprovPlaylist'

export default function ImprovPlaylist() {
  

  const { 
    isFetching: isPlaylistsFetching,
    isError: isPlaylistsError,
    error: playlistsError,
    data: playlist
  }  = useImprovPlaylist()

  return (
    <Container>
      <h1 className='mt-2 mb-4'>{playlist?.title}</h1>
      {playlist &&
        <Table hover>
          <thead>
            <th></th>
            <th>Title</th>
            <th>Artist</th>
            <th>Key</th>
          </thead>
          <tbody>
            {playlist.tracks.map(t => {
              return (
                <tr key={t.trackId}>
                  <td><img src={t.albumArtUrl} /></td>
                  <td>{t.title}</td>
                  <td>{t.artists.map(a => a.name).join(', ')}</td>
                  <td><KeyLabel trackId={t.trackId} /></td>
                </tr>
              )
            })}
          </tbody>          
        </Table>
      }
    </Container>
  )
}