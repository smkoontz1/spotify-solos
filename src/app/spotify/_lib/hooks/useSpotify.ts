import { AuthorizationCodeWithPKCEStrategy, SdkOptions, SpotifyApi } from '@spotify/web-api-ts-sdk';
import { useEffect, useRef, useState } from 'react'

export const CLIENT_ID = '64e49ed94b984e7b89490500bb7da546'
export const REDIRECT_URI = 'http://localhost:3000/spotify/now-playing'

const SCOPES = [
  'playlist-read-collaborative',
  'playlist-read-private',
  'user-read-currently-playing',
  'user-read-email',
  'user-read-private',
  'streaming'
]

export function useSpotify(config?: SdkOptions) {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null)
  const { current: activeScopes } = useRef(SCOPES)

  useEffect(() => {
    (async () => {
      const auth = new AuthorizationCodeWithPKCEStrategy(CLIENT_ID, REDIRECT_URI, activeScopes)
      const internalSdk = new SpotifyApi(auth, config)

      try {
        const { authenticated } = await internalSdk.authenticate()

        if (authenticated) {
          setSdk(() => internalSdk)
        }
      } catch (e: Error | unknown) {

        const error = e as Error
        if (error && error.message && error.message.includes("No verifier found in cache")) {
          console.error("If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).", error)
        } else {
          console.error(e)
        }
      }

    })()
  }, [CLIENT_ID, REDIRECT_URI, config, activeScopes])

  return sdk
}