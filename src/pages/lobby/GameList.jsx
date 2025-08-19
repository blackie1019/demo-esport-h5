import { useEffect, useRef, useCallback } from 'react'
import games from './assets/games.json'
import { getGameImage } from './assets/image/gameImage'
import { clsx } from 'clsx'

function GameItem({ game, isFavorite }) {
  const img = getGameImage(game.id)
  return (
    <div className="flex h-[5.03125rem] w-[5.28125rem] flex-1 shrink-0 items-center justify-center rounded-[0.3125rem] border-[0.936px] border-[#30254D] bg-[linear-gradient(205deg,rgba(22,16,33,0)_-64.06%,#160F20_72.08%)] backdrop-blur-[4.6784px]">
      <div
        className={clsx(
          'relative flex h-full w-full flex-1 shrink-0 items-center justify-center rounded-[0.3125rem] border-2 outline-offset-[-2px]',
          isFavorite ? 'outline-green' : 'outline-purple'
        )}
      >
        <img
          className="h-full w-full flex-1 shrink-0 rounded-[0.3125rem] object-cover"
          src={img}
          alt={game.name}
        />
        <div className="pointer-events-none absolute inset-0 rounded-[0.3125rem] border-[0.94px] border-[#30254D] bg-[linear-gradient(194deg,rgba(22,16,33,0)_0%,#160F20_100%)]">
          <div className="flex h-full w-full flex-1 shrink-0 items-end justify-center gap-[0.11697rem] text-[0.75rem] leading-none font-semibold text-[#E6E5E6]">
            <span className="flex h-full w-full flex-1 shrink-0 items-end justify-center px-[0.37rem] py-[0.38rem]">
              {game.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function GameList({ activeCategory, setActiveCategory, scrollSourceRef }) {
  const scrollRef = useRef(null)

  const refs = {
    favorite: useRef(null),
    hot: useRef(null),
    eSport: useRef(null),
    console: useRef(null),
    mobile: useRef(null)
  }

  useEffect(() => {
    if (scrollSourceRef.current === 'auto') {
      const target = refs[activeCategory]?.current
      if (target && scrollRef.current) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    scrollSourceRef.current = 'manual'
  }, [activeCategory])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    scrollSourceRef.current = 'manual'
    const scrollTop = scrollRef.current.scrollTop
    const offsets = Object.entries(refs).map(([key, ref]) => ({
      key,
      offset: ref.current?.offsetTop ?? Infinity
    }))
    const current = offsets
      .filter(o => o.offset <= scrollTop + 10)
      .sort((a, b) => b.offset - a.offset)[0]
    if (current && current.key !== activeCategory) {
      setActiveCategory(current.key)
    }
  }, [activeCategory, setActiveCategory])

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="hide-scrollbar flex h-[100%] w-full flex-col items-center justify-start self-center overflow-scroll overflow-x-hidden overflow-y-auto"
    >
      <div className="flex w-[100%] flex-col items-center justify-center gap-[0.9375rem]">
        <div
          ref={refs.favorite}
          className="inline-flex items-center justify-center gap-[0.75rem] self-stretch py-[0.3125rem]"
        >
          <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
          <div className="text-[0.625rem] leading-none font-bold tracking-[0.00375rem] text-white drop-shadow-[0_1.151px_0_rgba(0,0,0,0.80)] [text-stroke-color:#000] [text-stroke-width:1.15px]">
            最爱
          </div>
          <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
        </div>
        <div className="grid grid-cols-3 gap-[0.51rem]">
          {games.favorite.map(game => {
            return <GameItem key={game.id} game={game} isFavorite />
          })}
        </div>
        <div
          ref={refs.hot}
          className="inline-flex items-center justify-center gap-[0.75rem] self-stretch py-[0.3125rem]"
        >
          <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
          <div className="text-[0.625rem] leading-none font-bold tracking-[0.00375rem] text-white drop-shadow-[0_1.151px_0_rgba(0,0,0,0.80)] [text-stroke-color:#000] [text-stroke-width:1.15px]">
            热门
          </div>
          <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
        </div>
        <div className="grid grid-cols-3 gap-[0.51rem]">
          {games.hot.map(game => {
            return <GameItem key={game.id} game={game} />
          })}
        </div>
        <div
          ref={refs.eSport}
          className="inline-flex items-center justify-center gap-[0.75rem] self-stretch py-[0.3125rem]"
        >
          <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
          <div className="text-[0.625rem] leading-none font-bold tracking-[0.00375rem] text-white drop-shadow-[0_1.151px_0_rgba(0,0,0,0.80)] [text-stroke-color:#000] [text-stroke-width:1.15px]">
            电竞
          </div>
          <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
        </div>
        <div className="grid grid-cols-3 gap-[0.51rem]">
          {games.eSport.map(game => {
            return <GameItem key={game.id} game={game} />
          })}
        </div>
        {games.console?.length > 0 && (
          <>
            <div
              ref={refs.console}
              className="inline-flex items-center justify-center gap-[0.75rem] self-stretch py-[0.3125rem]"
            >
              <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
              <div className="text-[0.625rem] leading-none font-bold tracking-[0.00375rem] text-white drop-shadow-[0_1.151px_0_rgba(0,0,0,0.80)] [text-stroke-color:#000] [text-stroke-width:1.15px]">
                主机
              </div>
              <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
            </div>
            <div className="grid grid-cols-3 gap-[0.51rem]">
              {games.console.map(game => {
                return <GameItem key={game.id} game={game} />
              })}
            </div>
          </>
        )}
        {games.mobile?.length > 0 && (
          <>
            <div
              ref={refs.mobile}
              className="inline-flex items-center justify-center gap-[0.75rem] self-stretch py-[0.3125rem]"
            >
              <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
              <div className="text-[0.625rem] leading-none font-bold tracking-[0.00375rem] text-white drop-shadow-[0_1.151px_0_rgba(0,0,0,0.80)] [text-stroke-color:#000] [text-stroke-width:1.15px]">
                手游
              </div>
              <div className="h-[0.125rem] flex-1 shrink-0 rounded-[0.1875rem] bg-white opacity-30"></div>
            </div>
            <div className="grid grid-cols-3 gap-[0.51rem]">
              {games.mobile.map(game => {
                return <GameItem key={game.id} game={game} />
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GameList
