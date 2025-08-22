import Icon from '@app/shared/Icon'
import LeagueIcon from '@app/shared/LeagueIcon'
import { useMemberStore } from '@app/modules/member/useMemberStore'
import clsx from 'clsx'

function Market({ market, match }) {
  const {
    favoriteLeaguesMarkets,
    addFavoriteLeaguesMarkets,
    removeFavoriteLeaguesMarkets
  } = useMemberStore()

  return (
    <div className="bg-island inline-flex h-full w-full flex-col items-start justify-start gap-[0.65625rem] rounded-[0.75rem] p-[0.75rem]">
      <div className="inline-flex w-full items-center justify-between">
        <div className="flex flex-col justify-center text-[0.875rem] leading-[1.1375rem] font-normal text-[#E2E2E2]">
          {market.marketTypeName}
        </div>
        <div
          className={clsx(
            'relative h-[0.75rem] w-[0.75rem] overflow-hidden',
            favoriteLeaguesMarkets.some(
              f => f.marketTypeCode === market.marketTypeCode
            )
              ? 'text-primary-white'
              : 'text-secondary-white'
          )}
          onClick={() => {
            if (
              favoriteLeaguesMarkets.some(
                f => f.marketTypeCode === market.marketTypeCode
              )
            ) {
              removeFavoriteLeaguesMarkets(market)
            } else {
              addFavoriteLeaguesMarkets(market)
            }
          }}
        >
          <Icon
            name={
              favoriteLeaguesMarkets.some(
                f => f.marketTypeCode === market.marketTypeCode
              )
                ? 'pinSolid'
                : 'pinOutline'
            }
          />
        </div>
      </div>

      {market.isDisplayParticipantInfo && (
        <div className="inline-flex h-full w-full items-start justify-start gap-[0.375rem]">
          <div className="flex flex-1 items-center justify-center gap-[0.3125rem] overflow-hidden rounded-[0.25rem] px-[0.5rem] py-[0.625rem]">
            <LeagueIcon src={match.homeIcon} size={'1.5625rem'} />
            <span className="text-secondary-white flex flex-col justify-center text-[0.75rem] font-medium">
              {match.homeName}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center gap-[0.3125rem] overflow-hidden rounded-[0.25rem] px-[0.5rem] py-[0.625rem]">
            <span className="text-secondary-white flex flex-col justify-center text-[0.75rem] font-medium">
              {match.awayName}
            </span>
            <LeagueIcon src={match.awayIcon} size={'1.5625rem'} />
          </div>
        </div>
      )}

      <div className="inline-flex w-full items-start justify-start gap-[0.375rem]">
        <div className="bg-on-island flex h-[2.375rem] flex-1 items-center justify-start gap-[0.5rem] overflow-hidden rounded-[0.25rem] px-[0.5rem] py-[0.625rem]">
          <div className="text-tertiary-2 flex-1 text-[0.75rem] font-normal">
            {market.selections[0].name}
          </div>
          <div className="text-primary-white text-right text-[0.75rem] font-bold">
            {market.selections[0].odds}
          </div>
        </div>

        <div className="bg-on-island flex h-[2.375rem] flex-1 items-center justify-start gap-[0.5rem] overflow-hidden rounded-[0.25rem] px-[0.5rem] py-[0.625rem]">
          <div className="text-tertiary-2 flex-1 text-[0.75rem] font-normal">
            {market.selections[1].name}
          </div>
          <div className="text-primary-white text-right text-[0.75rem] font-bold">
            {market.selections[1].odds}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Market
