import clsx from 'clsx'
import camera from '@app/assets/icons/outline/camera.svg'
import circle from '@app/assets/icons/outline/circle.svg'
import search from '@app/assets/icons/outline/search.svg'
import notification from '@app/assets/icons/outline/notification.svg'
import menu from '@app/assets/icons/outline/menu.svg'

const iconRegistry = {
  camera: {
    mode: 'img',
    src: camera,
    size: {
      width: '2.1875rem',
      height: '2.1875rem'
    }
  },
  circle: {
    mode: 'img',
    src: circle,
    size: {
      width: '1.75rem',
      height: '1.75rem'
    }
  },
  search: {
    mode: 'img',
    src: search,
    size: {
      width: '1.125rem',
      height: '1.125rem'
    }
  },
  notification: {
    mode: 'img',
    src: notification,
    size: {
      width: '1.125rem',
      height: '1.125rem'
    }
  },
  menu: {
    mode: 'img',
    src: menu,
    size: {
      width: '1.125rem',
      height: '1.125rem'
    }
  }
}

function Icon({ name, size, className, styles }) {
  const def = iconRegistry[name]
  if (!def) {
    console.warn(`[Icon] Unknown icon: ${name}`)
    return null
  }
  const iconSize = formatSize()
  return (
    <img
      src={def.src}
      alt={def.name}
      style={{ ...iconSize, ...styles }}
      className={clsx('flex', className)}
    />
  )

  function formatSize() {
    return {
      width: size?.width || size || def.size.width,
      height: size?.height || size || def.size.height
    }
  }
}

export default Icon
