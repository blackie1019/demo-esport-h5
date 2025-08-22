import data from './assets/data.json'
import Image from '@app/shared/Image'
import cover from './assets/cover.png'
import clsx from 'clsx'
import a1 from './assets/a1.png'
import a2 from './assets/a2.jpg'
import Icon from '@app/shared/Icon'

function Video() {
  return (
    <div className="grid w-full shrink-0 grid-cols-2 items-center justify-start gap-[0.75rem] overflow-scroll">
      {data.map((item, index) => (
        <div
          key={index}
          className={clsx(
            'inline-flex h-full w-full shrink-0 flex-col overflow-hidden rounded-[0.625rem]'
          )}
        >
          <div className="relative flex w-full shrink-0 flex-col items-start justify-center">
            <Image
              src={cover}
              alt=""
              className="h-[6.438rem] w-[10.96875rem] object-cover"
            />
            <div className="absolute top-[4.714rem] left-0 h-[1.71875rem] w-full bg-[linear-gradient(0deg,#0D0712_0%,rgba(13,7,18,0)_100%)]" />

            <div className="absolute top-[5.15156rem] left-[0.3125rem] inline-flex h-[0.9375rem] w-[10.40625rem] items-center justify-between">
              <div className="flex h-full items-center justify-start gap-[0.625rem]">
                <span className="text-primary-white inline-flex items-center gap-[0.19rem] text-[0.4375rem] leading-none font-bold">
                  <Icon name="views" />
                  {item.playbackTimes}
                </span>

                <span className="text-primary-white inline-flex items-center gap-[0.19rem] text-[0.4375rem] leading-none font-bold">
                  <Icon name="comment" />
                  {item.commentsCount}
                </span>
              </div>

              <div className="flex items-center justify-center gap-[0.1875rem] rounded-[0.125rem] px-[0.1875rem] py-[0.125rem]">
                <span className="text-primary-white text-[0.4375rem] leading-none font-bold">
                  {item.duration}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-island flex flex-col items-start justify-center gap-[0.625rem] px-[0.3125rem] py-[0.625rem]">
            <h3 className="text-primary-white w-full text-[0.75rem] leading-none font-normal">
              {item.desc}
            </h3>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-start gap-[0.38rem]">
                <div className="bg-coloured-purple flex aspect-square h-[0.9375rem] w-[0.9375rem] items-center justify-center overflow-hidden rounded-full border-[0.03125rem] border-white">
                  <Image
                    className="h-full w-auto object-contain object-center"
                    src={a2}
                    alt=""
                  />
                </div>
                <div className="text-secondary-white flex items-center justify-center text-[0.4375rem] leading-none font-bold tracking-[0.06875rem] uppercase">
                  {item.hostName}
                </div>
              </div>
              <Icon name="more" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Video
