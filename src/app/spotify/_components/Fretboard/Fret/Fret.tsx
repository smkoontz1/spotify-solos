import { FretboardNote } from '../../../_types/custom/FretboardNote'
import { NotePill } from '../NotePill/NotePill'
import styles from './fret.module.css'

interface FretProps {
  num: number
  notes: FretboardNote[]
}

export function Fret(props: FretProps) {
  const { num, notes } = props

  let bottomNotePills: JSX.Element[] = []

  for (let i = 1; i < 6; i++) { 
    bottomNotePills = [
      ...bottomNotePills,
      <NotePill
        key={`fret-${num}-${notes[i].value}`}
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
          note={notes[0]}
        />
      </div>
      <div className={styles.bottomNotesContainer}>
        {bottomNotePills}
      </div>
    </div>
  )
}