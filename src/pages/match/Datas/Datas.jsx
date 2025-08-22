import Tabs from '../SubTabs'
import { useState } from 'react'

function Datas({ tabs }) {
  const [activeTab, setActiveTab] = useState('situation')
  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
    </>
  )
}

export default Datas
