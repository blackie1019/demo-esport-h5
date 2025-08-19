import { useRef } from 'react'
import Icon from '@app/shared/Icon'
import { useMemberStore } from '@app/modules/member/useMemberStore'
import { useNavigate } from 'react-router'
import Avatar from '@app/modules/member/Avatar'
import Container from '@app/shared/Container'

function SetupPage() {
  const navigate = useNavigate()
  const inputRef = useRef()
  const { photo, setPhoto, clearPhoto, nickname, setNickname } =
    useMemberStore()

  const openPicker = () => inputRef.current?.click()

  const onFileChange = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhoto({ file, url, name: file.name, size: file.size, type: file.type })
    e.target.value = ''
  }

  return (
    <Container>
      <div className="flex flex-col">
        <div className="mt-[10.4rem] flex flex-col items-center space-y-5">
          {photo ? (
            <Avatar onClick={clearPhoto} size="h-[4.375rem] w-[4.375rem]" />
          ) : (
            <div
              className="flex h-[4.375rem] w-[4.375rem] flex-shrink-0 items-center justify-center rounded-[21.875rem] border-2 border-[#3B2F46] bg-[#341E4C]"
              onClick={openPicker}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileChange}
              />

              <Icon name="camera" className="shrink-0" />
            </div>
          )}
          <input
            type="text"
            placeholder="昵称包含2至10个字元"
            className="text-grey placeholder-grey h-[2.8125rem] w-[22.6875rem] rounded-[0.3125rem] px-[0.9375rem] text-center text-[0.9375rem] leading-normal font-normal outline-2 outline-offset-[-2px] outline-[#341E4C] [background:linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.10)_100%),#0D0712]"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </div>
        <div
          id="next-button"
          className="active:bg-button-active fixed bottom-0 left-0 mx-[0.97rem] mb-[1.84rem] flex h-[2.8125rem] w-[22.6875rem] shrink-0 flex-col items-center justify-center gap-[0.8936875rem] self-stretch rounded-[0.5rem] border-2 border-solid border-[#00000000] bg-[#3F235D] bg-gradient-to-b from-black/0 from-[21.43%] to-black/10 px-[1.54906rem] py-[0.41706rem] text-left text-[0.9375rem] font-bold text-white backdrop-blur-[2.979] transition-transform duration-150 active:scale-95 active:brightness-110"
          onClick={() => navigate('/lobby')}
        >
          <p>下一步</p>
        </div>
      </div>
    </Container>
  )
}

export const Component = SetupPage
