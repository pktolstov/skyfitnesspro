// components/YogaCourseCard.tsx

import Image from 'next/image';

export default function CourseDetailed() {
  return (
    <div>
      <div className="w-full flex flex-col gap-[60px] mx-auto  overflow-hidden text-white">
        <div className="pt-15">
          <Image
            src="/img/courses/yoga.svg"
            alt="Йога"
            width={1120}
            height={310}
            className="w-full"
          />
        </div>
        <div>
          <h2 className="font-semibold text-4xl text-black pb-10 tracking-normal">
            Подойдет для вас, если:
          </h2>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            {[
              'Давно хотели попробовать йогу, но не решались начать',
              'Хотите укрепить позвоночник, избавиться от болей в спине и суставах',
              'Ищете активность, полезную для тела и души',
            ].map((text, index) => (
              <div
                key={index}
                className="rounded-[28px] text-sm flex items-center gap-2 w-full md:w-1/3 h-36"
                style={{
                  background:
                    'linear-gradient(115.81deg, #151720 34.98%, #1E212E 91.5%)',
                }}
              >
                <div className="p-5 flex flex-row justify-between gap-5 items-center">
                  <span className="text-[#A1F65E] text-[75px] font-medium">
                    {index + 1}
                  </span>
                  <span className="text-2xl font-normal tracking-normal leading-none font-roboto">
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Directions Section */}
        <div className="bg-[#A1F65E] text-black px-8 py-6 grid grid-cols-2 md:grid-cols-3 gap-y-3 text-sm font-medium">
          {[
            'Йога для новичков',
            'Классическая йога',
            'Йогатерапия',
            'Кундалини-йога',
            'Хатха-йога',
            'Аштанга-йога',
          ].map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-lg font-bold">+</span>
              {item}
            </span>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white bg-[url('/img/courses/athlete.png')] bg-no-repeat bg-contain  bg-right text-black px-8 py-6 flex flex-col md:flex-row items-center gap-6 rounded-b-[30px]  ">
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-4">
              Начните путь к новому телу
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              <li>проработка всех групп мышц</li>
              <li>тренировка суставов</li>
              <li>улучшение циркуляции крови</li>
              <li>упражнения заряжают бодростью</li>
              <li>помогают противостоять стрессам</li>
            </ul>
            <button className="mt-5 bg-[#A1F65E] text-black font-semibold px-6 py-2 rounded-full">
              Войти, чтобы добавить курс
            </button>
          </div>

          {/* <div className="relative w-[387px] h-[500px]">
            

          <Image
            src="/img/courses/athlete.png"
            alt="Тренировка"
            fill
            className="object-contain"
          />
        </div> */}

          {/* Optional Decorative Arrow or Stroke */}
          <div className=" w-24 h-24 bg-no-repeat bg-contain pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
