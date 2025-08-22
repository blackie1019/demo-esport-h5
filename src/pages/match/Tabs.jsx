import clsx from 'clsx'
import { useRef } from 'react'

function Tabs({ activeTab, setActiveTab, tabs }) {
  const tabRefs = useRef({})

  return (
    <div
      className={clsx(
        'flex w-full items-center justify-between bg-gradient-to-b from-black to-[#151223] px-[0.94rem] py-[0.75rem]'
      )}
    >
      <div className="relative w-full">
        <div className="flex w-full justify-between">
          {tabs.map(({ id, label }) => (
            <div
              key={id}
              ref={el => (tabRefs.current[id] = el)}
              className={clsx(
                'relative z-10 flex w-[4.82813rem] cursor-pointer items-center justify-center gap-[0.25rem] rounded-[0.5rem] px-[0.75rem] py-[0.46875rem]',
                activeTab === id
                  ? 'bg-white/10 font-semibold text-white'
                  : 'font-normal text-white',
                'transition-all duration-200 hover:bg-white/5'
              )}
              onClick={() => setActiveTab(id)}
            >
              <span className="text-[0.8125rem]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tabs
