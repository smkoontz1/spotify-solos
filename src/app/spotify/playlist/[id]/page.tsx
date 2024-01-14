'use client'

import { Col, Container, Row, Table } from 'react-bootstrap'
import { usePlayList } from '../../_lib/hooks/usePlaylist'
import KeyLabel from '../../_components/KeyLabel'
import { FaPlay } from 'react-icons/fa'
import { usePlayTrack } from '../../_lib/hooks/usePlayTrack'

interface Props {
  params: {
    id: string
  }
}

export default function Playlist({ params }: Props) {
  const {
    isError,
    error,
    data
  } = usePlayList(params.id)

  const {
    mutate
  } = usePlayTrack()

  return (
    <>
      <Container>
        <Row className='justify-content-center m-4'>
          <Col md='6'>
            <img src={data?.images[0].url} className='w-100'></img>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col md='8'>
            <Table>
              <thead>
                <th>Title</th>
                <th>Key</th>
                <th></th>
              </thead>
              <tbody>
                {data?.tracks.items.map(pt => {
                  const track = pt.track

                  return (
                    <tr key={track.id}>
                      <td>{track.name}</td>
                      <td><KeyLabel trackId={track.id} /></td>
                      <td><FaPlay onClick={() => mutate(track.uri)} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}