import { useState, useRef } from 'react'
import MemberTopBar from '@app/modules/member/MemberTopBar'
import Container from '@app/shared/Container'
import Banner from '@app/pages/lobby/banner/Banner'
import Category from '@app/pages/lobby/Category'
import GameList from '@app/pages/lobby/GameList'

function LobbyPage() {
  const [activeCategory, setActiveCategory] = useState('favorite')
  const scrollSourceRef = useRef('auto')
  return (
    <Container>
      <MemberTopBar />
      <Banner />
      <section className="flex w-full gap-[0.9375rem] overflow-hidden">
        <Category
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          scrollSourceRef={scrollSourceRef}
        />
        <GameList
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          scrollSourceRef={scrollSourceRef}
        />
      </section>
    </Container>
  )
}

export const Component = LobbyPage
