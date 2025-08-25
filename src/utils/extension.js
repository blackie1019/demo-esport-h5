import { Graphics, Text } from 'pixi.js'

Graphics.prototype.roundRect4 = function (x, y, w, h, r) {
  const tl = r?.tl || 0
  const tr = r?.tr || 0
  const br = r?.br || 0
  const bl = r?.bl || 0

  this.moveTo(x + tl, y)
  this.lineTo(x + w - tr, y)
  this.arcTo(x + w, y, x + w, y + tr, tr)
  this.lineTo(x + w, y + h - br)
  this.arcTo(x + w, y + h, x + w - br, y + h, br)
  this.lineTo(x + bl, y + h)
  this.arcTo(x, y + h, x, y + h - bl, bl)
  this.lineTo(x, y + tl)
  this.arcTo(x, y, x + tl, y, tl)
  this.closePath()

  return this
}

Graphics.prototype.skewRect = function (x, y, w, h, o = {}) {
  const tl = o.tl || 0
  const tr = o.tr || 0
  const br = o.br || 0
  const bl = o.bl || 0

  // 避免自交叉（偏移過大），做基本保護
  if (Math.abs(tl - bl) > w || Math.abs(tr - br) > w) {
    // eslint-disable-next-line no-console
    console.warn('[skewRect] offset too large, clamped.')
  }

  this.moveTo(x + tl, y) // 左上
  this.lineTo(x + w + tr, y) // 右上
  this.lineTo(x + w + br, y + h) // 右下
  this.lineTo(x + bl, y + h) // 左下
  this.closePath()
  return this
}

Graphics.prototype.skewRoundRect4 = function (
  x,
  y,
  w,
  h,
  offset = {},
  radius = {}
) {
  // 角點（含水平偏移；+ 往右、- 往左）
  const tlx = x + (offset.tl || 0),
    tly = y
  const trx = x + w + (offset.tr || 0),
    try_ = y
  const brx = x + w + (offset.br || 0),
    bry = y + h
  const blx = x + (offset.bl || 0),
    bly = y + h

  const P = [
    { x: tlx, y: tly, r: Math.max(0, radius.tl || 0) }, // 0: TL
    { x: trx, y: try_, r: Math.max(0, radius.tr || 0) }, // 1: TR
    { x: brx, y: bry, r: Math.max(0, radius.br || 0) }, // 2: BR
    { x: blx, y: bly, r: Math.max(0, radius.bl || 0) } // 3: BL
  ]

  // 小工具
  const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y })
  const len = v => Math.hypot(v.x, v.y)
  const norm = v => {
    const L = len(v) || 1
    return { x: v.x / L, y: v.y / L }
  }
  const clampR = i => {
    // 半徑不得大過相鄰兩邊長的一半
    const prev = (i + 3) % 4,
      next = (i + 1) % 4
    const a = len(sub(P[i], P[prev]))
    const b = len(sub(P[next], P[i]))
    P[i].r = Math.min(P[i].r, a * 0.5, b * 0.5)
  }

  // 安全夾住半徑
  for (let i = 0; i < 4; i++) clampR(i)

  // 計算每個角的切點（沿邊退縮距離 t = r / tan(θ/2)）
  function cornerData(i) {
    const prev = (i + 3) % 4,
      next = (i + 1) % 4
    const A = P[prev],
      B = P[i],
      C = P[next]

    const ePrev = norm(sub(B, A)) // A->B
    const eNext = norm(sub(C, B)) // B->C
    const dot = -ePrev.x * eNext.x + -ePrev.y * eNext.y // 夾角 cosθ
    const cos = Math.min(1, Math.max(-1, dot))
    const theta = Math.acos(cos) // 內角
    // 避免 θ 近 0 或近 π 的數值不穩
    const half = Math.max(1e-4, Math.min(Math.PI - 1e-4, theta / 2))
    const t = P[i].r === 0 ? 0 : P[i].r / Math.tan(half)

    // 切點：沿著相鄰兩邊分別退縮 t
    const start = { x: B.x - ePrev.x * t, y: B.y - ePrev.y * t } // 邊 AB 上的切點
    const end = { x: B.x + eNext.x * t, y: B.y + eNext.y * t } // 邊 BC 上的切點
    return { A, B, C, start, end, r: P[i].r }
  }

  // 構建路徑
  const c0 = cornerData(0)
  this.moveTo(c0.start.x, c0.start.y)

  for (let i = 0; i < 4; i++) {
    const c = i === 0 ? c0 : cornerData(i)
    if (c.r > 0) {
      // 先畫圓角（從當前點到 c.end），arcTo 會自動處理切線連接
      this.arcTo(c.B.x, c.B.y, c.end.x, c.end.y, c.r)
      // 走到下一段直線的起點（下一角的 start）
      const next = cornerData((i + 1) % 4)
      this.lineTo(next.start.x, next.start.y)
    } else {
      // 無半徑：銳角
      this.lineTo(c.B.x, c.B.y)
      const next = cornerData((i + 1) % 4)
      this.lineTo(next.start.x, next.start.y)
    }
  }

  this.closePath()
  return this
}

Graphics.prototype.drawUnderline = function ({ x, y, width, color = 'red' }) {
  this.beginPath()
  this.moveTo(x, y)
  this.lineTo(x + width, y)
  this.stroke({ color, width: 1 })

  return this
}

Text.prototype.scaleToWidth = function (maxWidth) {
  const scaleX = maxWidth / this.width
  const scale = Math.min(scaleX, 1, 1)
  this.scale.set(scale)
}
