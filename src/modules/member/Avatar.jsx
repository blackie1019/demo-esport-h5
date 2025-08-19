import { useMemberStore } from '@app/modules/member/useMemberStore'
import clsx from 'clsx'

function Avatar({ onClick, size = 'h-[4.375rem] w-[4.375rem]', className }) {
  const { photo } = useMemberStore()
  if (!photo) return null
  return (
    <div
      className={clsx(
        'flex flex-shrink-0 items-center justify-center rounded-[50%]',
        size,
        className
      )}
      onClick={onClick}
    >
      <img
        src={photo.url}
        alt={photo.name}
        className={clsx('rounded-[50%]', size)}
      />
    </div>
  )
}

export default Avatar
