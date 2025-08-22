import Icon from '@app/shared/Icon'
import a1 from './assets/a1.jpg'
import a2 from './assets/a2.png'
import a3 from './assets/a3.png'
import a4 from './assets/a4.png'
import Container from '@app/shared/Container'
import Image from '@app/shared/Image'
import { useMatchStore } from '@app/modules/match/useMatchStore'

function Chat() {
  const { chatData, likeChat, dislikeChat } = useMatchStore()
  const getAvatar = avatar => {
    switch (avatar) {
      case 'a1':
        return a1
      case 'a2':
        return a2
      case 'a3':
        return a3
      case 'a4':
        return a4
      default:
        return a1
    }
  }
  const reverseData = [...chatData].reverse()
  return (
    <Container className="flex-1 justify-end px-[0]">
      <div className="flex h-full w-full flex-1 flex-col-reverse overflow-scroll">
        {reverseData.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-start gap-[0.75rem] pt-[0.75rem]"
          >
            <Image
              src={getAvatar(item.avatar)}
              alt={item.name}
              className="h-[2.5rem] w-[2.5rem] rounded-full"
            />
            <div
              onClick={() => likeChat(item.id)}
              className="relative flex cursor-pointer flex-col items-start justify-center gap-[0.3125rem] rounded-[0.875rem] bg-white/10 p-[0.625rem]"
            >
              <div className="text-[0.625rem] leading-none font-bold text-white">
                {item.name}
              </div>
              <div className="text-[0.75rem] leading-none font-normal text-white">
                {item.content}
              </div>
              {item.likes > 0 && (
                <div className="absolute right-[-1.1rem] flex items-center justify-center gap-[0.19rem]">
                  <div className="bg-coloured-purple inline-flex h-[0.9375rem] w-[0.9375rem] items-center justify-center gap-[0.138rem] rounded-[1.378rem] px-[0.193rem] py-[0.165rem]">
                    <Icon name="like" />
                  </div>
                  <span className="text-[0.625rem] font-semibold text-white">
                    {item.likes}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 left-0 z-50 flex w-full items-center gap-[0.78125rem] px-[0.9375rem] pt-[0.75rem] pb-[2.12rem]">
        <div className="flex h-[2.625rem] flex-1 items-center justify-start gap-[0.3125rem] rounded-[1.3125rem] bg-white/5 p-[0.6875rem] px-[0.6875rem]">
          <input
            type="text"
            placeholder="聊聊天"
            className="text-tertiary placeholder:text-text-tertiary flex-1 bg-transparent text-[0.75rem] font-normal outline-none"
          />
          <button className="flex h-[1.25rem] w-[1.25rem] cursor-pointer items-center justify-center">
            <Icon name="emoji" />
          </button>
        </div>
      </div>
    </Container>
  )
}

export default Chat
