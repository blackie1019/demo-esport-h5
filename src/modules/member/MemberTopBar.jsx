import Avatar from '@app/modules/member/Avatar'
import Icon from '@app/shared/Icon'
import { useMemberStore } from '@app/modules/member/useMemberStore'

function MemberTopBar() {
  const { nickname } = useMemberStore()
  return (
    <div className="sticky top-0 z-[999999] flex w-[100%] flex-col items-start pt-[0.625rem]">
      <div className="flex items-center gap-[0.3125rem] self-stretch">
        <div className="flex flex-1 items-center gap-[0.5625rem]">
          <div className="relative h-[2.1875rem] w-[15.1875rem]">
            <div className="overlay-light outline-purple flex h-full items-center justify-between rounded-[0.1875rem] border-2 backdrop-blur-[4.77px]">
              <div className="flex h-full items-center justify-start">
                <Avatar
                  size="h-[1.75rem] w-[1.75rem]"
                  className="ml-[0.41rem]"
                />
                <div className="ml-[0.36rem] flex h-full flex-col items-start justify-center space-y-[0.2rem]">
                  <div className="text-secondary-white text-[0.75rem] leading-none font-bold tracking-[0.0045rem] [text-shadow:0_1.151px_0_rgba(0,0,0,0.80)]">
                    {nickname}
                  </div>
                  <div className="text-accent-secondary text-[0.625rem] leading-none font-bold tracking-[0.0045rem] [text-shadow:0_1.151px_0_rgba(0,0,0,0.80)]">
                    没有公会
                  </div>
                </div>
              </div>
              <div className="mr-[0.37rem] flex">
                <Icon name="circle" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[0.3125rem]">
          <div className="overlay-light outline-purple flex h-[2.1875rem] w-[2.1875rem] items-center justify-center rounded-[0.1875rem] border-2 p-[0.4375rem] outline-offset-[-2px] backdrop-blur-[4.77px]">
            <Icon name="search" />
          </div>
          <div className="overlay-light outline-purple flex h-[2.1875rem] w-[2.1875rem] items-center justify-center rounded-[0.1875rem] border-2 p-[0.4375rem] outline-offset-[-2px] backdrop-blur-[4.77px]">
            <Icon name="notification" />
          </div>
          <div className="overlay-light outline-purple flex h-[2.1875rem] w-[2.1875rem] items-center justify-center rounded-[0.1875rem] border-2 p-[0.4375rem] outline-offset-[-2px] backdrop-blur-[4.77px]">
            <Icon name="menu" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberTopBar
