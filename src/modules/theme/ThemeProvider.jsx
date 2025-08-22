import { useLayoutEffect } from 'react'
import { isDarkMode } from '@app/utils/browser'
import config from './config'

function normalizeColorVariableKey(name) {
  return name
    .split('-')
    .reduce((segments, segment, index) => {
      if (!index && segment === 'status') return segments
      if (segment === segments.at(-1)) return segments
      return [...segments, segment]
    }, [])
    .join('-')
}

function setColorVariables(colors) {
  if (!colors) return

  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'object') {
      setColorVariables(value)
    } else {
      key = normalizeColorVariableKey(key)
      document.documentElement.style.setProperty(`--color-${key}`, value)
    }
  })
}

export default function ThemeProvider({ children }) {
  useLayoutEffect(() => {
    const colors = isDarkMode ? config?.dark : config?.light

    setColorVariables(colors)

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDarkMode ? '#0d0712' : '#0d0712')

    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  return children
}
