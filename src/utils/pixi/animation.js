import gsap from 'gsap'

export function bounceAnimation(target, offset = 5, duration = 0.1) {
  const originY = target.y
  return gsap.to(target, {
    y: originY - offset,
    duration,
    ease: 'power1.out',
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      target.y = originY
    }
  })
}

export function slideInAnimation(
  target,
  {
    from = 'bottom', // 'left' | 'right' | 'top' | 'bottom'
    distance = 200,
    fade = true,
    duration = 0.3,
    delay = 0,
    ease = 'power3.out'
  } = {}
) {
  const { x, y } = target // 目標位置（相對於 parent）
  let fromX = x,
    fromY = y

  if (from === 'left') fromX = x - distance
  if (from === 'right') fromX = x + distance
  if (from === 'top') fromY = y - distance
  if (from === 'bottom') fromY = y + distance

  gsap.killTweensOf(target) // 避免重疊動畫
  target.x = fromX
  target.y = fromY
  if (fade) target.alpha = 0

  return gsap.to(target, {
    x,
    y,
    alpha: fade ? 1 : target.alpha,
    duration,
    delay,
    ease
  })
}

export function slideOutAnimation(
  target,
  {
    to = 'bottom', // 'left' | 'right' | 'top' | 'bottom'
    distance = 200,
    fade = true,
    duration = 0.3,
    delay = 0,
    ease = 'power3.in',
    onComplete
  } = {}
) {
  const { x, y } = target // 目前位置（相對 parent）
  let toX = x,
    toY = y

  if (to === 'left') toX = x - distance
  if (to === 'right') toX = x + distance
  if (to === 'top') toY = y - distance
  if (to === 'bottom') toY = y + distance

  gsap.killTweensOf(target)

  return gsap.to(target, {
    x: toX,
    y: toY,
    alpha: fade ? 0 : target.alpha,
    duration,
    delay,
    ease,
    onComplete
  })
}
