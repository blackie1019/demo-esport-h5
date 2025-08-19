import { useState } from 'react'
import { clsx } from 'clsx'

const categories = [
  {
    id: 'favorite',
    name: '最爱'
  },
  {
    id: 'hot',
    name: '热门'
  },
  {
    id: 'eSport',
    name: '电竞'
  },
  {
    id: 'console',
    name: '主机'
  },
  {
    id: 'mobile',
    name: '手游'
  }
]

function CategoryItem({ name, active, onClick }) {
  return (
    <div
      className={clsx(
        'flex h-[2.96875rem] w-[3.75rem] items-center justify-center rounded-[0.59638rem] text-[0.8125rem] leading-none font-semibold text-[#E6E5E6]',
        active &&
          'outline-purple border-[3.817px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_21.43%,rgba(0,0,0,0.10)_100%),#40235E] backdrop-blur-[95.42px]'
      )}
      onClick={onClick}
    >
      {name}
    </div>
  )
}

function Category({ activeCategory, setActiveCategory, scrollSourceRef }) {
  return (
    <div className="flex w-[4.95rem] flex-col items-start justify-center space-y-[0.83rem] self-start rounded-[0.89456rem] bg-[#20132E] p-[0.6rem]">
      {categories.map(category => {
        return (
          <CategoryItem
            key={category.id}
            name={category.name}
            active={activeCategory === category.id}
            onClick={() => {
              scrollSourceRef.current = 'auto'
              setActiveCategory(category.id)
            }}
          />
        )
      })}
    </div>
  )
}

export default Category
