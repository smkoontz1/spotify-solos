'use client'

import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Fretboard } from './Fretboard/Fretboard'
import { Key } from '../_types/custom/Key'

interface Props {
  keyDef: Key
  children?: JSX.Element|JSX.Element[]
}

export default function KeyLabel({ keyDef }: Props): JSX.Element {
  const { rootPitch, minor } = keyDef

  const [showFretboardModal, setShowFretboardModal] = useState(false)

  const handleCloseFretboard = () => setShowFretboardModal(false)
  const handleShowFretboard = () => setShowFretboardModal(true)

  let keyStr = rootPitch
  if (minor) {
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
          {rootPitch &&
            <Fretboard keyRootPitch={rootPitch} />
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