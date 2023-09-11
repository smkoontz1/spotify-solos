import { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { AVAILABLE_SCALES } from '../../_lib/util/constants'
import FretboardBody from '../FretboardBody/FretboardBody'

interface FretboardProps {
  keyRootPitch: string
}

export function Fretboard(props: FretboardProps) {
  const { keyRootPitch } = props
  
  const availableScales = Object.keys(AVAILABLE_SCALES)
  const [selectedScale, setSelectedScale] = useState(availableScales[0])

  return (
    <>
      <DropdownButton id='fretboard-dropdown' title={selectedScale}>
        {availableScales.map(scaleName => {
          return <Dropdown.Item key={`scale-${scaleName}`} onClick={() => setSelectedScale(scaleName)}>{scaleName}</Dropdown.Item>
        })}
      </DropdownButton>
      <FretboardBody keyRootPitch={keyRootPitch} scaleType={selectedScale} />
    </>
  )
}