import { Viewport } from 'pixi-viewport'

export default function VpScroller({ app, direction = 'y' }) {
  // 建立 Viewport（v8 要傳入 renderer.events）
  const viewport = new Viewport({
    screenWidth: app.renderer.width,
    screenHeight: app.renderer.height,
    worldWidth: 2000, // 你的世界寬高
    worldHeight: 1200,
    events: app.renderer.events
  })

  // 啟用「拖曳 + 慣性」，只允許垂直方向
  viewport
    .drag({ direction }) // 限制只能 y 軸拖曳
    .decelerate({ friction: 0.95 }) // 慣性，視需求可關掉

  // 只限制 Y 邊界（避免彈跳/越界）
  viewport.clamp({ direction, underflow: 'top' })

  return viewport
}
