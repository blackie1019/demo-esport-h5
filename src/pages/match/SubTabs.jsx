import clsx from 'clsx'

function Tabs({ activeTab, setActiveTab, tabs }) {
  return (
    <div className="hide-scrollbar inline-flex w-full shrink-0 items-center justify-start gap-[0.5rem] overflow-hidden">
      {tabs.map(({ id, label }) => (
        <div
          key={id}
          className={clsx(
            'flex shrink-0 cursor-pointer items-center justify-center gap-[0.3125rem] rounded-[0.3125rem] px-[0.75rem] py-[0.25rem] shadow-[0_0.0899rem_0.25rem_rgba(0,0,0,0.5)]',
            activeTab === id
              ? 'button-active outline-purple-secondary border-2'
              : 'outline-purple border-2'
          )}
          onClick={() => setActiveTab(id)}
        >
          <span className="text-secondary-white text-center text-[0.6875rem] leading-normal font-bold tracking-[0.06875rem]">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Tabs
