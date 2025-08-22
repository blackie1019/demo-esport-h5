import LeagueIcon from '@app/shared/LeagueIcon'
import Counter from './Counter'

function MatchBoard({ match }) {
  return (
    <div className="absolute top-[3.13rem] flex w-[22.6875rem] shrink-0 flex-col items-start justify-start">
      <div className="inline-flex w-[22.6875rem] flex-col items-start justify-start overflow-hidden rounded-[0.5rem]">
        <div className="flex w-[22.6875rem] flex-col items-start justify-start overflow-hidden">
          <div className="inline-flex w-full items-center justify-between">
            <div className="relative flex h-[6.5625rem] flex-1 items-center justify-between">
              <div
                style={{
                  clipPath: 'polygon(0% 0%, 95.76% 0%, 84.47% 100%, 0% 100%)',
                  marginRight: '-1.1rem'
                }}
                className="relative inline-flex h-full flex-1 flex-col items-start justify-center gap-[0.3125rem] self-stretch bg-[rgba(64,35,94,0.70)] px-[0.75rem] py-[0.625rem]"
              >
                <div className="ml-[2.42rem] flex flex-col items-center justify-center gap-[0.3125rem]">
                  <div className="flex items-center justify-center">
                    <LeagueIcon src={match.homeLeagueIcon} size="3.4375rem" />
                  </div>
                  <div className="text-primary-white flex items-center justify-center gap-[0.125rem] text-[0.9375rem] font-bold tracking-[0.005625rem]">
                    {match.homeLeagueName}
                  </div>
                </div>
              </div>
              <Counter
                className="absolute top-[2.09375rem] left-[8rem]"
                match={match}
              />
              <div
                style={{
                  clipPath:
                    'polygon(100% 100%, 4.24% 100%, 15.53% 0%, 100% 0%)',
                  marginLeft: '-1.1rem'
                }}
                className="match-right-clip inline-flex h-full flex-1 flex-col items-end justify-center gap-[0.3125rem] self-stretch bg-[rgba(119,92,223,0.70)] px-[0.75rem] py-[0.625rem]"
              >
                <div className="mr-[2.42rem] flex flex-col items-center justify-center gap-[0.3125rem]">
                  <div className="flex items-center justify-center">
                    <LeagueIcon src={match.awayLeagueIcon} size="3.4375rem" />
                  </div>
                  <div className="text-secondary-white flex items-center justify-center gap-[0.125rem] text-[0.9375rem] font-bold tracking-[0.005625rem]">
                    {match.awayLeagueName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-island inline-flex w-full items-center justify-center px-[0.75rem] py-[0.5rem]">
          <div className="flex flex-1 items-center justify-center gap-[0.3125rem]">
            <div className="flex flex-col items-center justify-center text-[0.75rem] font-medium text-[#C4B1D8]">
              {formatDateTime(match.dateMatch).date}
            </div>
            <div className="flex flex-col items-center justify-center text-[0.75rem] font-medium text-[#C4B1D8]">
              {formatDateTime(match.dateMatch).time}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  function formatDateTime(isoString) {
    const d = new Date(isoString)

    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()

    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')

    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`
    }
  }
}

export default MatchBoard
