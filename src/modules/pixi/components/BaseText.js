import { Text } from 'pixi.js'

export default ({ text, style } = {}) => {
  const result = new Text({
    text,
    style: {
      fontFamily: 'Arial',
      fontSize: 16,
      ...style
    }
  })
  result.resolution = 2
  result.dirty = true
  return result
}
