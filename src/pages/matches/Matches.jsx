import Icon from '@app/shared/Icon'
import scenes from './assets/scenes.png'
import Avatar from '@app/modules/member/Avatar'
import useRouter, { useGoBack } from '@app/hooks/useRouter'

function Matches() {
  const goToMatch = useRouter({ pathName: 'match' })
  const goToSetup = useRouter({ pathName: 'setup' })
  const goToLobby = useRouter({ pathName: 'lobby' })
  const goBack = useGoBack()
  return (
    <>
      <div
        className="fixed z-20 aspect-[16/9] h-[4.5rem] w-full shrink-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${scenes})` }}
      />
      <div className="absolute top-0 left-0 h-[2.25rem] w-full bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,black_100%)]" />
      <div className="fixed top-0 z-20 flex h-[4.5rem] w-full items-center justify-between self-center px-[0.94rem]">
        <div className="text-primary-white flex items-center font-bold">
          <span className="flex items-center pr-[0.56rem] text-[0.9375rem]">
            反恐精英
          </span>
          <Icon className="flex items-center" name="expand" />
        </div>
        <div className="flex items-center justify-between space-x-[0.3125rem]">
          <div className="flex items-center justify-start">
            <div className="absolute right-[3.44rem] h-[2.09375rem] w-[2.09375rem] rounded-full bg-[#2C2442] outline-[4px] [outline-color:#1A1425]" />
            <div className="absolute right-[4.16rem] h-[2.09375rem] w-[2.09375rem] rounded-full bg-[#483787] outline-[4px] [outline-color:#1A1425]" />
            <div className="bg-secondary outline-purple absolute right-[4.78rem] flex h-[2.46875rem] w-[2.46875rem] items-center justify-center rounded-full border-4">
              <div className="button-secondary-purple flex h-[2.09375rem] w-[2.09375rem] shrink-0 items-center justify-center rounded-full">
                <Icon className="flex items-center" name="quizBet" />
              </div>
            </div>
          </div>
          <div className="outline-purple overlay-light flex h-[2.1875rem] w-[2.1875rem] items-center justify-center rounded-[0.1875rem] border-2 backdrop-blur-[4.77px]">
            <Avatar
              className="flex items-center justify-center"
              size="h-[1.75rem] w-[1.75rem]"
            />
          </div>
        </div>
      </div>
      <div className="text-primary-white absolute top-[30rem] z-20 flex h-[10rem] w-full flex-col items-center justify-start self-center overflow-scroll overflow-x-hidden overflow-y-auto">
        <span onClick={goToSetup}>goSetup!</span>
        <span onClick={goToLobby}>goLobby!</span>
        <span onClick={goToMatch}>goMatch!</span>
        <span onClick={goBack}>goBack!</span>
      </div>
    </>
  )
}

export const Component = Matches
