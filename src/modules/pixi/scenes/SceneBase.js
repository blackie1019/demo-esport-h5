/* eslint-disable no-unused-vars */
import { Container } from 'pixi.js'

export default class SceneBase extends Container {
  constructor() {
    super()
    if (new.target === SceneBase) {
      throw new TypeError('SceneBase 是抽象類別，不能直接 new。')
    }
    if (this.enter === SceneBase.prototype.enter) {
      throw new TypeError('子類別必須實作 enter()')
    }
    if (this.exit === SceneBase.prototype.exit) {
      throw new TypeError('子類別必須實作 exit()')
    }
  }
  async enter(_data) {}
  async exit(_data) {}
  update(_dt) {}
}
