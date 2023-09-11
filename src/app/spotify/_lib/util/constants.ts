import { AvailableScales } from "../../_types/custom/AvailableScales"

export const WESTERN_PITCHES = [
  'A',
  'A#/Bb',
  'B',
  'C',
  'C#/Db',
  'D',
  'D#/Eb',
  'E',
  'F',
  'F#/Gb',
  'G',
  'G#/Ab'
]

export const AVAILABLE_SCALES: AvailableScales = {
  'Major': [
    true, // 1
    false,
    true, // 2
    false,
    true, // 3
    true, // 4
    false,
    true, // 5
    false,
    true, // 6
    false,
    true // 7
  ],
  'Major Pentatonic': [
    true, // 1
    false,
    true, // 2
    false,
    true, // 3
    false,
    false,
    true, // 5
    false,
    true, // 6
    false,
    false
  ],
  'Minor Pentatonic': [
    true, // 1
    false,
    false,
    true, // b3
    false,
    true, // 4
    false,
    true, // 5
    false,
    false, 
    true, // b7
    false
  ]
}
