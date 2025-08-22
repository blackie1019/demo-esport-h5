import Avatar from '@app/modules/member/Avatar'
import Icon from '@app/shared/Icon'
import { useGoBack } from '@app/hooks/useRouter'
import clsx from 'clsx'

function MatchTopBar({ match, className }) {
  const goBack = useGoBack()
  return (
    <div
      className={clsx(
        'z-20 inline-flex w-full flex-col items-start justify-start',
        className
      )}
    >
      <div className="flex w-full flex-col items-start justify-start pt-[0.625rem]">
        <div className="inline-flex w-full items-center justify-center">
          <div
            className="outline-purple bg-overlay-light absolute left-[0.94rem] flex h-[2.1875rem] w-[2.1875rem] items-center justify-center gap-[0.3125rem] rounded-[0.1875rem] border-2 p-[0.4375rem] outline-offset-[-0.0625rem] backdrop-blur-[0.149rem]"
            onClick={goBack}
          >
            <Icon name="back" />
          </div>

          <div className="flex items-center justify-center">
            <div className="text-primary-white text-[0.9375rem] font-bold tracking-[0.005625rem]">
              {match.name}
            </div>
          </div>

          <div className="absolute right-[0.94rem] flex items-center justify-center gap-[0.3125rem]">
            <div className="outline-purple bg-overlay-light flex h-[2.1875rem] w-[2.1875rem] items-center justify-center gap-[0.3125rem] rounded-[0.1875rem] border-2 p-[0.4375rem] outline-offset-[-0.0625rem] backdrop-blur-[0.149rem]">
              <Icon name="betslip" />
            </div>

            <div className="outline-purple overlay-light flex h-[2.1875rem] w-[2.1875rem] items-center justify-center rounded-[0.1875rem] border-2 backdrop-blur-[4.77px]">
              <Avatar
                className="flex items-center justify-center"
                size="h-[1.75rem] w-[1.75rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchTopBar
