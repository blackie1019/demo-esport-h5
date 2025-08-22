import BaseImage from '@app/shared/Image'
import clsx from 'clsx'

const buildTimestamp = Date.now()

function getLeagueIconUrl(src) {
  if (!src) return src
  const basePath = 'https://cdn.xn--rcr449edsq.club/flag_webp/'
  return `${basePath}${src.replace('.png', '.webp')}?v=${buildTimestamp}`
}

export default function LeagueIcon({ className, style, size, src, ...props }) {
  return (
    <BaseImage
      decoding="async"
      className={clsx(
        'object-contain object-center transition-opacity duration-100',
        className
      )}
      style={{
        ...style,
        width: size,
        height: size
      }}
      src={getLeagueIconUrl(src)}
      {...props}
    />
  )
}
