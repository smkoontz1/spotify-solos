'use client'

import { Col, Container, Row, Table } from 'react-bootstrap'
import { useAlbum } from '../../_lib/hooks/useAlbum'
import KeyLabel from '../../_components/KeyLabel'
import { FaPlay } from 'react-icons/fa'
import { usePlayTrack } from '../../_lib/hooks/usePlayTrack'

interface Props {
  params: {
    id: string
  }
}

export default function Album({ params }: Props) {
  const { data } = useAlbum(params.id)
  const { mutate } = usePlayTrack()

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
                <th>#</th>
                <th>Title</th>
                <th>Key</th>
                <th></th>
              </thead>
              <tbody>
                {data?.tracks.map(t => {
                  return (
                    <tr key={t.id}>
                      <td>{t.collectionNumber}</td>
                      <td>{t.title}</td>
                      <td><KeyLabel keyDef={t.key} /></td>
                      <td><FaPlay onClick={() => mutate(t.uri)} /></td>
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