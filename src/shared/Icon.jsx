import clsx from 'clsx'
import camera from '@app/assets/icons/outline/camera.svg'
import circle from '@app/assets/icons/outline/circle.svg'
import search from '@app/assets/icons/outline/search.svg'
import notification from '@app/assets/icons/outline/notification.svg'
import menu from '@app/assets/icons/outline/menu.svg'
import expand from '@app/assets/icons/solid/expand.svg'
import quizBet from '@app/assets/quizBet/quizBet.svg'
import betslip from '@app/assets/icons/outline/betslip.svg'
import back from '@app/assets/icons/outline/back.svg'
import pinOutline from '@app/assets/icons/outline/pin.svg'
import pinSolid from '@app/assets/icons/solid/pin.svg'
import live from '@app/assets/icons/outline/live.svg'
import comment from '@app/assets/icons/outline/comment.svg'
import more from '@app/assets/icons/solid/more.svg'
import views from '@app/assets/icons/outline/views.svg'
import emoji from '@app/assets/icons/outline/emoji.svg'
import like from '@app/assets/icons/solid/like.svg'

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
  },
  expand: {
    mode: 'img',
    src: expand,
    size: {
      width: '0.625rem',
      height: '0.625rem'
    }
  },
  quizBet: {
    mode: 'img',
    src: quizBet,
    size: {
      width: '1.25rem',
      height: '1.25rem'
    }
  },
  betslip: {
    mode: 'img',
    src: betslip,
    size: {
      width: '1.125rem',
      height: '1.125rem'
    }
  },
  back: {
    mode: 'img',
    src: back,
    size: {
      width: '1.5rem',
      height: '1.5rem'
    }
  },
  pinOutline: {
    mode: 'img',
    src: pinOutline,
    size: {
      width: '0.75rem',
      height: '0.75rem'
    }
  },
  pinSolid: {
    mode: 'img',
    src: pinSolid,
    size: {
      width: '0.75rem',
      height: '0.75rem'
    }
  },
  live: {
    mode: 'img',
    src: live,
    size: {
      width: '0.5rem',
      height: '0.5rem'
    }
  },
  comment: {
    mode: 'img',
    src: comment,
    size: {
      width: '0.625rem',
      height: '0.625rem'
    }
  },
  more: {
    mode: 'img',
    src: more,
    size: {
      width: '0.75rem',
      height: '0.75rem'
    }
  },
  views: {
    mode: 'img',
    src: views,
    size: {
      width: '0.625rem',
      height: '0.625rem'
    }
  },
  emoji: {
    mode: 'img',
    src: emoji,
    size: {
      width: '1.25rem',
      height: '1.25rem'
    }
  },
  like: {
    mode: 'img',
    src: like,
    size: {
      width: '0.55147rem',
      height: '0.50559rem'
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
