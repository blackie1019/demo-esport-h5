import clsx from 'clsx'

function Container({ children, className }) {
  return (
    <div
      className={clsx(
        'hide-scrollbar z-20 flex w-[100%] flex-col items-center justify-start overflow-x-hidden px-[0.94rem]',
        className
      )}
    >
      {children}
    </div>
  )
}

export default Container
