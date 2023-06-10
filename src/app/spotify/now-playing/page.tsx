'use client'

import KeyLabel from '../_components/KeyLabel'
import { useCurrentlyPlaying } from '../_lib/hooks/useCurrentlyPlaying'
import { useMe } from '../_lib/hooks/useMe'

export default function ActiveSong() {

  const {
    isFetching: isMeFetching,
    isError: isMeError,
    error: meError,
    data: me
  } = useMe()

  const {
    isFetching: isCurrPlayingFetching,
    isError: isCurrPlayingError,
    error: currPlayingError,
    data: currPlaying
  } = useCurrentlyPlaying()

  if (isMeError) {
    console.error(meError)
  }

  if (isCurrPlayingError) {
    console.error(currPlayingError)
  }

  console.log(me)
  console.log(currPlaying?.item)

  const item = currPlaying?.item
  const trackId = item?.id

  return (
    <>
      <h2>Logged in as: {me?.display_name}</h2>
      <img src={me?.images[0]?.url} style={{ maxHeight: 150 }}></img>
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