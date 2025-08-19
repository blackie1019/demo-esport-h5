import { useEffect, useMemo, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import banner1 from '../assets/banner.jpg'

const slides = [
  { id: 's1', img: banner1, href: '#' },
  { id: 's2', img: banner1, href: '#' },
  { id: 's3', img: banner1, href: '#' },
  { id: 's4', img: banner1, href: '#' }
]

function useAutoplay(interval = 3500, pauseOnHover = true) {
  return slider => {
    let timeout
    let mouseOver = false
    const clearNextTimeout = () => timeout && window.clearTimeout(timeout)
    const nextTimeout = () => {
      clearNextTimeout()
      if (mouseOver && pauseOnHover) return
      timeout = window.setTimeout(() => slider.next(), interval)
    }
    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener('mouseout', () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })
    slider.on('dragStarted', clearNextTimeout)
    slider.on('animationEnded', nextTimeout)
    slider.on('updated', nextTimeout)
  }
}

function getRelIndex(s) {
  const d = s.track?.details
  if (!d) return null
  const total = slides.length
  return (((d.abs ?? 0) % total) + total) % total
}

export default function Banner() {
  const [current, setCurrent] = useState(0)

  const autoplay = useMemo(() => useAutoplay(4000, true), [])

  const [sliderRef, slider] = useKeenSlider(
    {
      loop: true,
      renderMode: 'precision',
      slides: { perView: 1, spacing: 0 },
      rubberband: false,
      breakpoints: { '(min-width: 768px)': { rubberband: true } },
      created(s) {
        const idx = getRelIndex(s)
        if (idx !== null) setCurrent(idx)
        // aria 設定放這裡 OK，但不應該造成重建
        s.container.setAttribute('aria-roledescription', 'carousel')
        s.container.setAttribute('aria-label', '主視覺輪播')
      },
      slideChanged(s) {
        const idx = getRelIndex(s)
        if (idx !== null) setCurrent(idx)
      }
    },
    [autoplay]
  )

  useEffect(() => {
    const onKey = e => {
      if (!slider) return
      if (e.key === 'ArrowLeft') slider.prev()
      if (e.key === 'ArrowRight') slider.next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slider])

  return (
    <section className="mt-[0.94rem] flex w-full flex-col self-stretch">
      <div
        ref={sliderRef}
        className="keen-slider h-[7.59375rem] overflow-hidden rounded-[0.1875rem] border-2 border-[#404040] bg-neutral-900/60"
        aria-roledescription="carousel"
        aria-label="主視覺輪播"
      >
        {slides.map(s => (
          <div key={s.id} className="keen-slider__slide relative h-[100%]">
            <img
              src={s.img}
              className="block h-[100%] w-full object-cover select-none"
              alt=""
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.06),transparent_60%)] mix-blend-screen" />
          </div>
        ))}
      </div>
      <Dots
        count={slides.length}
        current={current}
        onJump={i => slider?.moveToIdx?.(i)}
      />
    </section>
  )
}

function Dots({ count, current, onJump }) {
  return (
    <div className="flex items-center justify-center gap-[0.375rem] px-[0.9375rem] pt-[0.3125rem] pb-[0.9375rem]">
      {Array.from({ length: count }).map((_, i) => {
        const active = i === current
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`跳到第 ${i + 1} 張`}
            className={[
              'h-2.5 w-2.5 rounded-full transition-all focus:outline-none',
              active
                ? 'bg-coloured-blue h-[0.27344rem] w-[0.82031rem] rounded-[0.27344rem]'
                : 'h-[0.27344rem] w-[0.27344rem] rounded-[0.27344rem] border-[1.75px] border-[#70A3EE] bg-[#090016]'
            ].join(' ')}
          />
        )
      })}
    </div>
  )
}
