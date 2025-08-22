import { useState } from 'react'
import scenes from './assets/scenes.jpg'
import Header from './Header'
import Image from '@app/shared/Image'
import MatchBoard from './MatchBoard'
import match from './assets/match.json'
import Tabs from './Tabs'
import Markets from './markets/Markets'
import tabs from './assets/tabs.json'
import Info from './info/Info'
import Container from '@app/shared/Container'
import Datas from './datas/Datas'
import Comments from './comments/Comments'

const scenesHeight = '11.8rem'

function Matches() {
  const [activeTab, setActiveTab] = useState('markets')

  return (
    <div className="z-20 flex w-[100%] flex-col items-center justify-start self-center overflow-scroll overflow-x-hidden overflow-y-auto">
      <div className="flex h-[auto] w-[100%] shrink-0 flex-col items-center justify-start self-center overflow-scroll overflow-x-hidden overflow-y-auto">
        <Header className="fixed top-0 z-20" match={match} />
        <Image
          src={scenes}
          alt="scenes"
          className={`aspect-[92/47] h-[${scenesHeight}] w-[25.875rem]`}
        />
        <MatchBoard match={match} />
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <Container className="my-[0.75rem] space-y-[0.75rem]">
        {renderContent()}
      </Container>
    </div>
  )

  function renderContent() {
    switch (activeTab) {
      case 'markets':
        return (
          <Markets
            match={match}
            tabs={tabs.find(t => t.id === 'markets').tabs}
          />
        )
      case 'info':
        return <Info tabs={tabs.find(t => t.id === 'info').tabs} />
      case 'datas':
        return <Datas tabs={tabs.find(t => t.id === 'datas').tabs} />
      case 'comments':
        return <Comments tabs={tabs.find(t => t.id === 'comments').tabs} />
      default:
        return (
          <Markets
            match={match}
            tabs={tabs.find(t => t.id === 'markets').tabs}
          />
        )
    }
  }
}

export const Component = Matches
