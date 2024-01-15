'use client'

import Link from 'next/link'
import { useUserProfile } from './spotify/_lib/hooks/useUserProfile'
import { Col, Row } from 'react-bootstrap'

export default function Home() {
  const {
    error,
    data
  } = useUserProfile()
  
  if (error) {
    console.error(error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Row>
        <Col>
          <h2>Logged in as: {data?.display_name}</h2>
          <img src={data?.images[0]?.url} style={{ maxWidth: 150 }}></img>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Link href= 'spotify/now-playing'>Now Playing</Link>
        <Link href= 'spotify/event-now-playing'>Event-driven Now Playing</Link>
        <Link href= 'spotify/albums'>Search Albums</Link>
        <Link href= 'spotify/my-playlists'>My Playlists</Link>
      </Row>
    </main>
  )
}
