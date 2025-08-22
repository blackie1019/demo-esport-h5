import Tabs from '../SubTabs'
import { useState } from 'react'
import Chat from './chat/Chat'
import Activity from './activity/Activity'

function Comments({ tabs }) {
  const [activeTab, setActiveTab] = useState('chat')
  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div className="hide-scrollbar flex h-full h-screen w-full flex-col space-y-[0.75rem] overflow-scroll">
        {renderContent()}
      </div>
    </>
  )

  function renderContent() {
    switch (activeTab) {
      case 'chat':
        return <Chat />
      case 'activity':
        return <Activity />
      default:
        return <Chat />
    }
  }
}

export default Comments
