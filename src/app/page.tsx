'use client'

import { Button, Col, Container, Row } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { GiGuitarHead } from 'react-icons/gi'

export default function Home() {
  const router = useRouter()

  return (
    <Container>
      <Row className='justify-content-center align-items-center'>
        <Col md='8' className='d-flex justify-content-center align-items-center'>
          <p className='text-end text-uppercase text-light fs-1 fw-bold m-0'>Spotify Solos</p>
          <div className='p-3'>
            <GiGuitarHead className='guitarHeadstock text-light' />
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center'>
        <Col md='3'>
          <Row className='m-4'>
            <Button className='p-3' variant='light' onClick={_ => router.push('spotify/my-playlists')}>Playlists</Button>
          </Row>
          <Row className='m-4'>
            <Button className='p-3' variant='light' onClick={_ => router.push('spotify/albums')}>Albums</Button>
          </Row>
          <Row className='m-4'>
            <Button className='p-3' variant='light' disabled>Stream</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
