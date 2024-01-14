'use client'

import { Col, Container, Pagination, Row, Table } from 'react-bootstrap'
import { DEFAULT_PAGE_SIZE, useCurrentUserPlaylists } from '../_lib/hooks/useCurrentUserPlaylists'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const getOffset = (page: number) => (page - 1) * DEFAULT_PAGE_SIZE

export default function MyPlaylists() {
  const router = useRouter()
  const [page, setPage] = useState(1)

  const {
    isError,
    error,
    data
  } = useCurrentUserPlaylists({ offset: getOffset(page) })

  const handlePlaylistClick = (id: string) => {
    router.push(`spotify/playlist/${id}`)
  }

  const handlePageUp = () => {
    if (data?.next) {
      setPage(page + 1)
    }
  }

  const handlePageDown = () => {
    if (page > 1) { 
      setPage(page - 1)
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Table hover>
              <thead>
                <th></th>
                <th>Title</th>
              </thead>
              <tbody>
                {data?.items.map(p => {
                  return (
                    <tr key={p.id} onClick={() => handlePlaylistClick(p.id)}>
                      <td><img src={p.images[0].url} style={{ maxWidth: '64px' }} /></td>
                      <td>{p.name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.Prev onClick={() => handlePageDown()} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={() => handlePageUp()} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </>
  )  
}