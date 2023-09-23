import { Badge } from 'react-bootstrap'
import { AVAILABLE_SCALES, WESTERN_PITCHES } from '../../_lib/util/constants'
import { FretboardNote } from '../../_types/custom/FretboardNote'
import styles from './styles.module.css'

interface NotePillProps {
  note: FretboardNote
  pillClassName: string
}

interface FretProps {
  num: number
  notes: FretboardNote[]
}

function NotePill(props: NotePillProps) {
  const { note, pillClassName } = props
  
  let pillColor = 'light'
  let textColor = 'dark'

  if (note.inScale) {
    textColor = 'light'

    if (note.isRoot) {
      pillColor = 'primary'
    }
    else {
      pillColor = 'dark'
    }
  }

  return (
    <div className={styles.notePillContainer}>
      <Badge key={`${note}-pill`} pill bg={pillColor} text={textColor} className={pillClassName}>
        {note.value}
      </Badge>
    </div>
  )
}

function Fret(props: FretProps) {
  const { num, notes } = props

  let bottomNotePills: JSX.Element[] = []

  for (let i = 1; i < 6; i++) { 
    bottomNotePills = [
      ...bottomNotePills,
      <NotePill
        key={`fret-${num}-${notes[i].value}`}
        pillClassName={styles.notePill}
        note={notes[i]}
      />
    ]
  }

  return (
    <div className={styles.fretContainer}>
      {(num == 3 || num == 5 || num == 7 || num == 9) &&
        <div className={styles.fretDot} />
      }
      {(num == 12) &&
        <>
          <div className={styles.twelveDot1} />
          <div className={styles.twelveDot2} />
        </>
      }
      <div className={styles.topNotePillContainer}>
        <NotePill
          pillClassName={styles.notePill}
          note={notes[0]}
        />
      </div>
      <div className={styles.bottomNotesContainer}>
        {bottomNotePills}
      </div>
    </div>
  )
}

function String() {
  return (
    <div className={styles.string}></div>
  )
}

const incrementPitchIndex = (index: number, amount: number): number => {
  const nextIndex = index + amount
  var overage = 11 - nextIndex
  
  if (overage == -1) {
    return 0
  } else if (overage < -1) {
    return Math.abs(overage)
  }

  return nextIndex
}

const cleanFlat = (pitch: string): string => pitch.split('/')[0]

interface FretboardBodyProps {
  keyRootPitch: string
  scaleType: string
}

export default function FretboardBody(props: FretboardBodyProps) {
  const { keyRootPitch, scaleType } = props

  const tuning = ['E', 'A', 'D', 'G', 'B', 'E']
  const scaleIntervals = AVAILABLE_SCALES[scaleType]

  const rootPitchIndex = WESTERN_PITCHES.indexOf(keyRootPitch)
  
  let prevPitchIndex = rootPitchIndex
  let scaleIncludedPitchIndeces = [prevPitchIndex]
  
  for (let i = 1; i < 12; i++) {
    const intervalPitchIndex = incrementPitchIndex(prevPitchIndex, 1)
    
    if (scaleIntervals[i]) {
      scaleIncludedPitchIndeces = [...scaleIncludedPitchIndeces, intervalPitchIndex]
    }

    prevPitchIndex = intervalPitchIndex
  }

  let curStr1PitchIndex = WESTERN_PITCHES.indexOf(tuning[5]) + 1
  let curStr2PitchIndex = WESTERN_PITCHES.indexOf(tuning[4]) + 1
  let curStr3PitchIndex = WESTERN_PITCHES.indexOf(tuning[3]) + 1
  let curStr4PitchIndex = WESTERN_PITCHES.indexOf(tuning[2]) + 1
  let curStr5PitchIndex = WESTERN_PITCHES.indexOf(tuning[1]) + 1
  let curStr6PitchIndex = WESTERN_PITCHES.indexOf(tuning[0]) + 1

  let frets: JSX.Element[] = []
  for (let i = 1; i <= 12; i++) {
    frets = [
      ...frets,
      <Fret key={`fret-${i}`}
        num={i}
        notes={[
          {
            value: cleanFlat(WESTERN_PITCHES[curStr1PitchIndex]),
            inScale: scaleIncludedPitchIndeces.includes(curStr1PitchIndex),
            isRoot: curStr1PitchIndex === rootPitchIndex
          }, 
          {
            value: cleanFlat(WESTERN_PITCHES[curStr2PitchIndex]),
            inScale: scaleIncludedPitchIndeces.includes(curStr2PitchIndex),
            isRoot: curStr2PitchIndex === rootPitchIndex
          },
          {
            value: cleanFlat(WESTERN_PITCHES[curStr3PitchIndex]),
            inScale: scaleIncludedPitchIndeces.includes(curStr3PitchIndex),
            isRoot: curStr3PitchIndex === rootPitchIndex
          },
          {
            value: cleanFlat(WESTERN_PITCHES[curStr4PitchIndex]),
            inScale: scaleIncludedPitchIndeces.includes(curStr4PitchIndex),
            isRoot: curStr4PitchIndex === rootPitchIndex
          },
          {
            value: cleanFlat(WESTERN_PITCHES[curStr5PitchIndex]),
            inScale: scaleIncludedPitchIndeces.includes(curStr5PitchIndex),
            isRoot: curStr5PitchIndex === rootPitchIndex
          },
          {
            value: cleanFlat(WESTERN_PITCHES[curStr6PitchIndex]),
            inScale: scaleIncludedPitchIndeces.includes(curStr6PitchIndex),
            isRoot: curStr6PitchIndex === rootPitchIndex
          }
        ]}
      />
    ]

    curStr1PitchIndex = incrementPitchIndex(curStr1PitchIndex, 1)
    curStr2PitchIndex = incrementPitchIndex(curStr2PitchIndex, 1)
    curStr3PitchIndex = incrementPitchIndex(curStr3PitchIndex, 1)
    curStr4PitchIndex = incrementPitchIndex(curStr4PitchIndex, 1)
    curStr5PitchIndex = incrementPitchIndex(curStr5PitchIndex, 1)
    curStr6PitchIndex = incrementPitchIndex(curStr6PitchIndex, 1)
  }

  let strings: JSX.Element[] = []
  for (let i = 1; i <= 5; i++) {
    strings = [
      ...strings,
      <String key={`string-${i}`} />
    ]
  }

  return (
    <>
      <div className={styles.board}>
        <div className={styles.strings}>
          {strings}
        </div>
        <div className={styles.frets}>
          {frets}
        </div>
      </div>
    </>
  )
}
