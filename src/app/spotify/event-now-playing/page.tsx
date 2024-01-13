// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { useSpotify } from '../_lib/hooks/useSpotify'

export default function EventNowPlaying() {
  const spotify = useSpotify()
  const [is_paused, setPaused] = useState(false)
  const [is_active, setActive] = useState(false)
  const [player, setPlayer] = useState(undefined)
  const [current_track, setTrack] = useState(null)

  console.log('Rendering page')

  useEffect(() => {
    (async () => {
      if (!spotify)
      {
        return
      }

      console.log('Building player')
      const tokenResponse = await spotify?.getAccessToken()
      const token = tokenResponse?.access_token

      console.log('Creating script element')
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('In On Spotify ready')

        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => { cb(token); },
          volume: 0.5
        });

        console.log('Setting player')
        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', (state: any) => {
          console.log('Player state changed')

          if (!state) {
            return
          }

          setTrack(state.track_window.current_track)
          setPaused(state.paused)

          player.getCurrentState().then(state => {
            (!state) ? setActive(false) : setActive(true)
          })
        })

        console.log('Connecting player')
        player.connect();

      };
    })()

  }, [spotify])

  if (!is_active) {
    return (
      <>
        <p>Transfer your playback.</p>
      </>
    )
  } else {
    return (
      <>
        <h2>Current track name {current_track?.name}</h2>
        <h2>Current track artist {current_track?.artists[0].name}</h2>
        <button onClick={() => { player.previousTrack() }}>&lt;</button>
        <button onClick={() => { player.togglePlay() }}>{is_paused ? 'Play' : 'Pause'}</button>
        <button onClick={() => { player.nextTrack() }}>&gt;</button>
      </>
    )
  }

}