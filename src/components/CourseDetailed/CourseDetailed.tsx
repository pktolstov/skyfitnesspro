'use client';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import { getImagePath } from '@/utils/getImagePath';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { openModal } from '@/store/features/modalSlice';
import { addUserCourse } from '@/services/courseApi';
import { toast } from 'react-toastify';
import { addFavoriteCourse } from '@/store/features/courseSlice';

interface CourseDetailedProps {
  course: {
    _id: string;
    nameRU: string;
    nameEN: string;
    description: string;
    directions: string[];
    fitting: string[];
  };
}

export default function CourseDetailed({ course }: CourseDetailedProps) {
  const { isAuth, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      await addUserCourse({ courseId: course._id }, { token });

      toast.success('Курс добавлен!');
      dispatch(addFavoriteCourse(course._id));
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message || 'Ошибка добавления курса');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full flex flex-col gap-[60px] mx-auto overflow-hidden text-white">
        <div className="pt-15">
          <Image
            src={`/img/courses/${getImagePath(course.nameEN)}`}
            alt={course.nameRU}
            width={1120}
            height={310}
            className="w-full"
          />
        </div>

        <div>
          <h2 className="font-semibold text-[40px] text-black pb-10 tracking-normal">
            Подойдет для вас, если:
          </h2>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            {course.fitting.map((text, index) => (
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

        {/* Блок "Направления" */}
        <div className="flex flex-col gap-10">
          <p className="font-semibold text-[40px] text-black tracking-normal">
            Направления
          </p>
          <div className="bg-[#BCEC30] rounded-[28px] text-black p-7.5 grid grid-cols-2 md:grid-cols-3 gap-y-3 text-sm font-medium">
            {course.directions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Image
                  src={'/img/courses/sparcle.svg'}
                  alt="+"
                  width={26}
                  height={26}
                />
                <span className="text-2xl font-normal tracking-normal">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="pb-12.5 pt-7 ">
          <div className="bg-white text-black flex flex-col md:flex-row items-center gap-6 rounded-[30px] relative overflow-visible shadow-[0px_4px_67px_-12px_#00000021]">
            <div className="z-10 max-w-lg flex flex-col gap-7 pt-10 pl-10">
              <h3 className="text-6xl font-medium">
                Начните путь к новому телу
              </h3>
              <ul className="list-disc list-inside text-2xl font-normal text-gray-800 space-y-1 opacity-60">
                <li>проработка всех групп мышц</li>
                <li>тренировка суставов</li>
                <li>улучшение циркуляции крови</li>
                <li>упражнения заряжают бодростью</li>
                <li>помогают противостоять стрессам</li>
              </ul>
              <div className="pb-10 w-full">
                {isAuth ? (
                  <Button
                    text="Добавить курс"
                    className="px-5 py-2 h-12.5 text-lg w-full"
                    onClick={handleSubmit}
                  />
                ) : (
                  <Button
                    text="Войдите, чтобы добавить курс"
                    className="px-5 py-2 h-12.5 text-lg w-full"
                    onClick={() => {
                      // Открыть модалку авторизации
                      dispatch(openModal('login'));
                    }}
                  />
                )}
                {/* <Button
                  text="Добавить курс"
                  className="px-5 py-2 h-12.5 text-lg w-full"
                /> */}
              </div>
            </div>

            <div className="absolute right-0 bottom-5 w-[587px] h-[643px] translate-y-12 translate-x-0">
              <Image
                src="/img/courses/athlete.svg"
                alt="Тренировка"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
