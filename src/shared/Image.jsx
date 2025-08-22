import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

export default function Image({ src, fallback, className = '', ...props }) {
  const [image, setImage] = useState(src)

  useEffect(() => {
    setImage(src)
  }, [src])

  if (typeof image === 'function') {
    return image()
  }

  return (
    <img
      {...props}
      src={image}
      onError={() => fallback && setImage(() => fallback)}
      className={clsx('object-cover', className)}
    />
  )
}
