import { Sprite, Texture } from 'pixi.js'
import AssetLoader from './AssetLoader.js'

export default function createAsyncImage(assetKey, fallbackKey) {
  const sprite = new Sprite(Texture.EMPTY) // 或顯示 placeholder texture

  // 一旦載入完成再補上真正圖
  AssetLoader.load(assetKey, fallbackKey).then(texture => {
    sprite.texture = texture
  })

  return sprite
}
