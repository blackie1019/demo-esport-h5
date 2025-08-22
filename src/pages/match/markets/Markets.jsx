import { useState } from 'react'
import Tabs from '../SubTabs'
import Market from './Market'
import { useMemberStore } from '@app/modules/member/useMemberStore'

function Markets({ match, tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const { favoriteLeaguesMarkets } = useMemberStore()
  const favoriteLeaguesMarketTypeCodes = favoriteLeaguesMarkets.map(
    f => f.marketTypeCode
  )
  const markets = match.markets.sort(
    (a, b) =>
      (favoriteLeaguesMarketTypeCodes.includes(b.marketTypeCode) ? 1 : 0) -
      (favoriteLeaguesMarketTypeCodes.includes(a.marketTypeCode) ? 1 : 0)
  )

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div className="hide-scrollbar flex h-full w-full flex-col space-y-[0.75rem] overflow-scroll">
        {markets.map(market => (
          <Market key={market.marketTypeCode} market={market} match={match} />
        ))}
      </div>
    </>
  )
}

export default Markets
