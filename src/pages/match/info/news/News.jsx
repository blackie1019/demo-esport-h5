import data from './assets/data.json'
import Image from '@app/shared/Image'
import c1 from './assets/c1.png'
import c2 from './assets/c2.png'

function News() {
  return (
    <div className="flex w-full shrink-0 flex-col items-center justify-start gap-[0.75rem] overflow-scroll">
      {data.map((item, index) => (
        <div
          className="flex w-full overflow-hidden rounded-[0.375rem]"
          key={index}
        >
          <Image
            src={item.cover === 'c1' ? c1 : c2}
            alt=""
            className="h-[4.59375rem] w-[7.71875rem] shrink-0 object-cover"
          />
          <div className="bg-island flex flex-1 basis-0 items-start gap-[0.75rem] self-stretch p-[0.75rem]">
            <div className="inline-flex flex-1 basis-0 flex-col items-start justify-center gap-[0.125rem]">
              <div className="inline-flex items-start justify-start gap-[0.75rem]">
                <div className="text-tertiary-2 text-[0.625rem] font-normal">
                  {item.type}
                </div>
              </div>
              <div className="text-primary-white text-[0.8125rem] font-semibold">
                {item.title}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default News
