'use client'

import { useState } from 'react'
import { useAudioFeatures } from '../_lib/hooks/useAudioFeatures'
import { PITCH_CLASSES } from '../_lib/util/pitchClassResolver'
import { Button, Modal } from 'react-bootstrap'
import { Fretboard } from './Fretboard/Fretboard'

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

  const [showFretboardModal, setShowFretboardModal] = useState(false)

  const handleCloseFretboard = () => setShowFretboardModal(false)
  const handleShowFretboard = () => setShowFretboardModal(true)

  const keyVal = features?.key ?? -1
  const pitch = PITCH_CLASSES.find(pc => pc.keyVal === keyVal)?.displayName
  const mode = features?.mode
  let keyStr = pitch
  if (mode === 'minor') {
    keyStr += 'm'
  }

  return (
    <>
      <p onClick={handleShowFretboard}>{keyStr}</p>
      <Modal size='xl' show={showFretboardModal} onHide={handleCloseFretboard}>
        <Modal.Header>
          <Modal.Title>Key: {keyStr}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pitch &&
          <>
            <Fretboard keyRootPitch={pitch} />
          </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseFretboard}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}