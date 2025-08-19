import g1 from './g1.png'
import g2 from './g2.png'
import g3 from './g3.png'
import g4 from './g4.png'
import g5 from './g5.png'
import g6 from './g6.png'
import g7 from './g7.png'
import g8 from './g8.png'
import g9 from './g9.png'
import g10 from './g10.png'
import g11 from './g11.png'
import g12 from './g12.png'
import g13 from './g13.png'
import g14 from './g14.png'
import g15 from './g15.png'

export function getGameImage(id) {
  return {
    g1,
    g2,
    g3,
    g4,
    g5,
    g6,
    g7,
    g8,
    g9,
    g10,
    g11,
    g12,
    g13,
    g14,
    g15
  }[id]
}
