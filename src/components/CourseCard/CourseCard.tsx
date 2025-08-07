import Image from 'next/image';
import { Calendar, Clock, BarChart } from 'lucide-react';

export default function CourseCard() {
  return (
    <div className="bg-white rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[320px] overflow-hidden">
      <div className="relative w-full h-[300px]">
        <Image
          src="/img/bodyflex.svg"
          alt="Бодифлекс"
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
          <span className="text-2xl font-bold text-gray-500">+</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h2 className="font-medium text-3xl text-black">Бодифлекс</h2>

        <div className="flex gap-2 text-sm text-gray-700 flex-wrap">
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            <Calendar size={16} />
            <span>25 дней</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            <Clock size={16} />
            <span>20-50 мин/день</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full w-max text-sm text-gray-700">
          <BarChart size={16} color="blue" />
          <span>Сложность</span>
        </div>
      </div>
    </div>
  );
}
