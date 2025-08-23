import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, BarChart } from 'lucide-react';
import { CourseCardType } from '@/types/courseCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '@/components/Button/Button';
import { useAppSelector } from '@/store/store';

interface CardsProps {
  course: CourseCardType;
  imageSrc: string;
  priority?: boolean;
  isProgress?: boolean;
  onOpenTrainings?: (course: CourseCardType) => void; // 👈 новый проп
}

export default function CourseCard({
  course,
  imageSrc,
  priority = false,
  isProgress = false,
  onOpenTrainings,
}: CardsProps) {
  const handleOpen = (e: React.MouseEvent) => {
    // чтобы Link не срабатывал
    e.preventDefault();
    e.stopPropagation();
    onOpenTrainings?.(course);
  };
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const icon = isAuth ? '-' : '+';
  return (
    <Link
      href={`/fitness/course/${course._id}`}
      className=" bg-white rounded-[30px] max-h-max shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[360px] overflow-hidden transform transition-transform duration-300 hover:scale-[1.03] gap-5"
    >
      <div className="relative w-full h-[325px] rounded-[30px]">
        <Image
          src={imageSrc}
          alt={course.nameRU}
          fill
          className="object-cover"
          priority={priority}
        />
        <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
          <span className="text-2xl font-bold text-gray-500">{icon}</span>
        </div>
      </div>

      <div className="px-7.5 pt-6 pb-3.5 flex flex-col gap-5">
        <h2 className="font-medium text-3xl text-black">{course.nameRU}</h2>

        <div className="flex gap-2 text-sm text-gray-700 flex-wrap">
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            <Calendar size={16} />
            <span>{course.durationInDays} дней</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            <Clock size={16} />
            <span>
              {course.dailyDurationInMinutes.from}-
              {course.dailyDurationInMinutes.to} мин/день
            </span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full w-max text-sm text-gray-700">
            <BarChart size={16} />
            <span>{course.difficulty}</span>
          </div>
        </div>

        {isProgress && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-lg font-normal pb-2.5">
                Прогресс <span>{20}%</span>
              </p>
              <ProgressBar progress={20} />
            </div>

            <Button
              text="Продолжить"
              className="h-12.5 w-full text-lg"
              // onClick={handleOpen}
              onClick={handleOpen}
            />
          </div>
        )}
      </div>
    </Link>
  );
}


// className="block bg-white rounded-[30px] max-h-max shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[360px] overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]"