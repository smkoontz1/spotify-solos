'use client'

import { Track } from '@spotify/web-api-ts-sdk'
import KeyLabel from '../_components/KeyLabel'
import { useCurrentlyPlaying } from '../_lib/hooks/useCurrentlyPlaying'
import { useUserProfile } from '../_lib/hooks/useUserProfile'

export default function ActiveSong() {

  const {
    isFetching: isUserFetching,
    isError: isUserError,
    error: userError,
    data: user
  } = useUserProfile()

  const {
    isFetching: isCurrPlayingFetching,
    isError: isCurrPlayingError,
    error: currPlayingError,
    data: currPlaying
  } = useCurrentlyPlaying()

  if (isUserError) {
    console.error(userError)
  }

  if (isCurrPlayingError) {
    console.error(currPlayingError)
  }

  const item = currPlaying?.item as Track
  const trackId = item?.id

  console.log('User', user)
  console.log('Curr playing', currPlaying)

  return (
    <>
      <h2>Logged in as: {user?.display_name}</h2>
      <img src={user?.images[0]?.url} style={{ maxHeight: 150 }}></img>
      <br/>
      <br/>
      <br/>
      <h2>Now Playing:</h2>
      <img src={item?.album?.images[1]?.url}></img>
      <h3>{item?.name} - {item?.artists[0]?.name}</h3>
      {trackId &&
        <KeyLabel trackId={trackId} />
      }
    </>
  )
}