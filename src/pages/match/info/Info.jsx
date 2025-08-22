import Tabs from '../SubTabs'
import { useState } from 'react'
import Streaming from './streaming/Streaming'
import Video from './video/Video'
import News from './news/News'

function Info({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div className="hide-scrollbar flex h-full w-full flex-col space-y-[0.75rem] overflow-scroll">
        {renderContent()}
      </div>
    </>
  )

  function renderContent() {
    switch (activeTab) {
      case 'streaming':
        return <Streaming />
      case 'video':
        return <Video />
      case 'news':
        return <News />
      default:
        return <Streaming />
    }
  }
}

export default Info
