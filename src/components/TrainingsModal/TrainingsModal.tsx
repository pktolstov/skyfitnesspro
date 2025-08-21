'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { splitTitleSubtitle } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentWorkout } from '@/store/features/courseSlice';
import { useRouter } from 'next/navigation';
import { WorkoutType } from '@/types/courseType';

type TrainingItem = WorkoutType;

interface TrainingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  trainings: TrainingItem[];
  loading?: boolean;
}

export default function TrainingsModal({
  isOpen,
  onClose,
  title = 'Выберите тренировку',
  trainings,
  loading = false,
}: TrainingsModalProps) {
  const currentCourse = useAppSelector((state) => state.courses.currentCourse);
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // сбрасываем выбор при открытии
    if (isOpen) setSelected([]);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };


  const handleStart = () => {
    if (!selected.length) return;
  
    const workout = trainings.find((t) => t._id === selected[0]);
    if (!workout) return;
  
  
  
    dispatch(setCurrentWorkout(workout));
    onClose();
  
    router.push(`/fitness/workout?workoutId=${workout._id}`);
  };
  
  // const handleStart = () => {
  //   if (!selected.length) return;
  //   const workout = trainings.find((t) => t._id === selected[0]); // одна тренировка
  //   if (!workout) return;
  //   dispatch(setCurrentWorkout(workout));
  //   onClose();
  //   // router.push('/fitness/workout');
  //   if (!currentCourse) return null;
  //   console.log(`${currentCourse}`);
  //   router.push(
  //     `/fitness/workout?courseId=${currentCourse._id}&workoutId=${workout._id}`,
  //   );
  //   console.log(`Не найден ${currentCourse}`);
  // };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[30px] p-6 w-[360px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[24px] font-semibold mb-6">{title}</h2>

        <div className="max-h-[300px] overflow-y-auto pr-2">
          {loading && (
            <div className="py-6 text-center text-gray-500">
              Загружаем тренировки…
            </div>
          )}

          {!loading && trainings.length === 0 && (
            <div className="py-6 text-center text-gray-500">Список пуст</div>
          )}

          {!loading &&
            trainings.map((item, idx) => {
              const { title: trainingTitle, subtitle: trainingSubtitle } =
                splitTitleSubtitle(item.name);

              return (
                <div
                  key={item._id ?? `${item.name}-${idx}`}
                  className={clsx(
                    'flex items-start gap-3 py-3 border-b border-gray-200 last:border-none cursor-pointer',
                  )}
                  onClick={() => toggleSelect(item._id)}
                >
                  {selected.includes(item._id) ? (
                    <Image
                      src="/img/modals/done.svg"
                      alt="Selected"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <div className="w-6 h-6 border border-gray-400 rounded-full" />
                  )}

                  <div>
                    <p className="text-lg font-semibold">{trainingTitle}</p>
                    <span className="text-sm text-gray-500">
                      {trainingSubtitle || `Тренировка ${idx + 1}`}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        <button
          className="mt-6 w-full bg-[#BCEC30] rounded-full py-3 text-lg font-medium hover:brightness-95 transition"
          // onClick={onClose}
          disabled={!selected}
          onClick={handleStart}
        >
          Начать
        </button>
      </div>
    </div>
  );
}
