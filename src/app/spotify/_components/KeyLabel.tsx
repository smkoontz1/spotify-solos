'use client'

import { useAudioFeatures } from '../_lib/hooks/useAudioFeatures'
import { PITCH_CLASSES } from '../_lib/helpers/pitchClassResolver'

interface Props {
  trackId: string
  children?: JSX.Element|JSX.Element[]
}

export default function KeyLabel(props: Props): JSX.Element {
  const { trackId } = props

  const {
    isFetching: isFeaturesFetching,
    isError: isFeaturesError,
    error: featuresError,
    data: features
  } = useAudioFeatures({ id: trackId })

  if (isFeaturesError) {
    console.error(featuresError)
  }

  const keyVal = features?.audio_features[0]?.key
  const pitch = PITCH_CLASSES.find(pc => pc.keyVal === keyVal)?.displayName

  return (
    <>
      <p>Key: {pitch}</p>
    </>
  )
}