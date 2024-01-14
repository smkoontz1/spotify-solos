'use client'

import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap'
import { useSearchAlbums } from '../_lib/hooks/useSearchAlbums'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Albums() {
  const [inputValue, setInputValue] = useState<string>()
  const [searchText, setSearchText] = useState<string>()
  const router = useRouter()
  
  const {
    isError,
    error,
    data
  } = useSearchAlbums({ searchText: searchText || '' })
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setSearchText(inputValue)
  }

  const handleAlbumClick = (id: string) => {
    router.push(`spotify/album/${id}`)
  }

  if (isError) {
    console.error(error)
  }

  return (
    <>
      <Container>
        <Form className='mt-5 mb-5' onSubmit={e => handleSubmit(e)}>
          <Row>
            <Col md='4'>
              <Form.Control type='text' onChange={(e) => setInputValue(e.target.value)} />
            </Col>
            <Col>
              <Button type='submit'>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col>
            <Table hover>
              <thead>
                <th></th>
                <th>Artist</th>
                <th>Album</th>
              </thead>
              <tbody>
                {data?.items.map(a => {
                  return (
                    <tr key={a.id} onClick={() => handleAlbumClick(a.id)}>
                      <td>
                        <img src={a.images[2].url} />
                      </td>
                      <td>{a.artists[0].name}</td>
                      <td>{a.name}</td>
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