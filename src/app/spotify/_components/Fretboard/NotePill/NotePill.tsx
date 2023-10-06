import { Badge } from 'react-bootstrap'
import { FretboardNote } from '../../../_types/custom/FretboardNote'
import styles from './notePill.module.css'

interface NotePillProps {
  note: FretboardNote
}

export function NotePill(props: NotePillProps) {
  const { note } = props
  
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
      <Badge key={`${note}-pill`} pill bg={pillColor} text={textColor} className={styles.notePill}>
        {note.value}
      </Badge>
    </div>
  )
}