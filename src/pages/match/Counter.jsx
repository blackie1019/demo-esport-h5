import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'

function useCountdown(target, onComplete) {
  const targetTime = useMemo(() => new Date(target).getTime(), [target])
  const completeRef = useRef(onComplete)
  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  const [msLeft, setMsLeft] = useState(() =>
    Math.max(0, targetTime - Date.now())
  )

  useEffect(() => {
    setMsLeft(Math.max(0, targetTime - Date.now()))
    const id = setInterval(() => {
      const left = Math.max(0, targetTime - Date.now())
      setMsLeft(left)
      if (left === 0) {
        clearInterval(id)
        completeRef.current?.()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [targetTime])

  const days = Math.floor(msLeft / 86400000)
  const hours = Math.floor((msLeft % 86400000) / 3600000)
  const minutes = Math.floor((msLeft % 3600000) / 60000)
  const seconds = Math.floor((msLeft % 60000) / 1000)
  return { days, hours, minutes, seconds, expired: msLeft === 0 }
}

function Unit({ label, value }) {
  return (
    <div className="inline-flex flex-col items-center justify-center gap-[0.375rem]">
      <div className="text-secondary-white flex flex-col justify-center text-[0.75rem] leading-none font-bold tabular-nums">
        {value}
      </div>
      <div className="inline-flex items-start justify-start gap-[0.125rem]">
        <div className="text-primary-purple flex flex-col justify-center text-[0.4375rem] leading-none font-normal">
          {label}
        </div>
      </div>
    </div>
  )
}

function Counter({ className, match }) {
  const { days, hours, minutes, seconds } = useCountdown(match.dateMatch)

  const d = String(days).padStart(2, '0')
  const h = String(hours).padStart(2, '0')
  const m = String(minutes).padStart(2, '0')
  const s = String(seconds).padStart(2, '0')

  return (
    <div
      className={clsx(
        'border-dark bg-island absolute top-0 left-0 z-30 inline-flex flex-0 items-center justify-center gap-[0.125rem] rounded-[0.125rem] border-2 px-[0.625rem] py-[0.5rem]',
        className
      )}
    >
      <div className="flex items-center justify-start gap-[0.37rem]">
        <Unit label="天" value={d} />
        <Unit label="小时" value={h} />
        <Unit label="分钟" value={m} />
        <Unit label="秒" value={s} />
      </div>
    </div>
  )
}

export default Counter
