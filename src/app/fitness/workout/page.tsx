'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  getCourseWorkout,
  getCourses,
  updateWorkoutProgress,
  getWorkoutProgress,
} from '@/services/courseApi';
import {
  setCurrentWorkout,
  setCurrentCourse,
} from '@/store/features/courseSlice';
import { setAccessToken } from '@/store/features/authSlice';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { cutWorkoutName } from '@/utils/helpers';
import Button from '@/components/Button/Button';
import { ApiResponseWorkoutProgressType } from '@/types/courseType';
import Input from '@/components/Input/Iinput';

export default function Workout() {
  const dispatch = useAppDispatch();
  const workout = useAppSelector((state) => state.courses.currentWorkout);
  const currentCourse = useAppSelector((state) => state.courses.currentCourse);
  const token = useAppSelector((state) => state.auth.token);
  const params = useSearchParams();
  const workoutId = params.get('workoutId');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [progressInputs, setProgressInputs] = useState<number[]>([]);
  const [initialProgress, setInitialProgress] = useState<number[]>([]);

  const workoutProgressData = useAppSelector((state) =>
    currentCourse?._id
      ? state.courses.courseProgress?.[currentCourse._id]?.workouts?.find(
          (w) => w.workoutId === workoutId,
        )
      : undefined,
  );

  // 1. Загружаем токен
  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        dispatch(setAccessToken(savedToken));
      }
    }
  }, [token, dispatch]);

  // 2. Загружаем тренировку
  useEffect(() => {
    if (!workoutId || !token) return;

    setLoading(true);

    getCourseWorkout(workoutId, { token })
      .then((workout) => {
        dispatch(setCurrentWorkout(workout));

        return getCourses().then((courses) => {
          const course = courses.find((c) => c.workouts.includes(workoutId));
          if (course) dispatch(setCurrentCourse(course));
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [workoutId, token, dispatch]);

  // Загружаем прогресс при открытии модалки
  useEffect(() => {
    if (currentCourse?._id && workoutId && token) {
      getWorkoutProgress(currentCourse._id, workoutId, token)
        .then((data: ApiResponseWorkoutProgressType) => {
          setInitialProgress(data.progressData);
          setProgressInputs(data.progressData); // заполняем форму
        })
        .catch(console.error);
    }
  }, [currentCourse, workoutId, token]);

  // 3. Обработка открытия попапа
  const handleOpen = () => {
    const existingProgress = workoutProgressData?.progressData || [];
    setInputs(
      workout?.exercises?.map((_, i) => existingProgress[i] || 0) || [],
    );
    setShowPopup(true);
  };

  // 4. Обработка изменения инпутов
  //   const handleChange = (index: number, value: string) => {
  //     const num = parseInt(value, 10);
  //     setInputs((prev) =>
  //       prev.map((v, i) => (i === index ? (isNaN(num) ? 0 : num) : v))
  //     );
  //   };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...progressInputs];
    updated[index] = value === '' ? 0 : Math.max(0, Number(value));
    setProgressInputs(updated);
  };

  // 5. Отправка данных
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCourse?._id || !workoutId) return;

    // Если пользователь оставил поля пустыми, подставляем из initialProgress
    const mergedProgress = initialProgress.map(
      (val, index) => progressInputs[index] ?? val,
    );

    try {
      await updateWorkoutProgress(
        currentCourse._id,
        workoutId,
        { progressData: mergedProgress },
        token,
      );
      setShowPopup(false);
    } catch (err) {
      console.error('Ошибка сохранения прогресса', err);
    }
  };

  if (loading) return <div>Загружаем тренировку…</div>;
  if (!workout || !currentCourse) return <div>Нет данных о тренировке</div>;

  return (
    <>
      <div className="flex w-full flex-col gap-10 pt-[60px]">
        <h2 className="text-6xl font-medium">{currentCourse.nameRU}</h2>
        <div className="w-full aspect-video">
          <iframe
            src={workout.video}
            width="100%"
            height="100%"
            className="rounded-[30px]"
            loading="lazy"
          />
        </div>
        <div className="p-10 bg-white rounded-[30px]">
          <h3 className="text-[32px] font-normal leading-normal">
            Упражнения {workout.name}
          </h3>
          <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workout.exercises?.map((ex, i) => {
              const exerciseProgress =
                workoutProgressData?.progressData?.[i] ?? 0;
              const progress = Math.min(
                100,
                Math.round((exerciseProgress / ex.quantity) * 100),
              );

              return (
                <div key={i}>
                  <div className="pb-2.5 text-lg font-normal">
                    {`${cutWorkoutName(ex.name)} ${progress}%`}
                  </div>
                  <ProgressBar progress={progress} />
                </div>
              );
            })}
          </div>
          <div className="pt-10 pb-10">
            <Button
              text="Заполнить свой прогресс"
              className="h-12.5 w-80 text-lg"
              onClick={handleOpen}
            />
          </div>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div
            className="bg-white rounded-[30px] p-6 w-[360px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[24px] font-semibold mb-6">{'Мой прогресс'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2.5 pb-8.5">
                {inputs.map((val, i) => (
                  <Input
                    key={i}
                    type="number"
                    min="0"
                    placeholder="0"
                    value={progressInputs[i] ?? 0}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                  />
                ))}
              </div>
              <Button type="submit" text="Сохранить" className="w-full" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { getCourseWorkout } from '@/services/courseApi';
// import {
//   setCurrentWorkout,
//   setCurrentCourse,
// } from '@/store/features/courseSlice';
// import { setAccessToken } from '@/store/features/authSlice';
// // import ReactPlayer from 'react-player';
// import ProgressBar from '@/components/ProgressBar/ProgressBar';
// import { getCourses } from '@/services/courseApi';
// import { cutWorkoutName } from '@/utils/helpers';
// import Button from '@/components/Button/Button';

// export default function Workout() {
//   const dispatch = useAppDispatch();
//   const workout = useAppSelector((state) => state.courses.currentWorkout);
//   const currentCourse = useAppSelector((state) => state.courses.currentCourse);
//   const token = useAppSelector((state) => state.auth.token);
//   const [loading, setLoading] = useState(false);
//   const params = useSearchParams();
//   const workoutId = params.get('workoutId');
//   const workoutProgressData = useAppSelector((state) =>
//     currentCourse?._id
//       ? state.courses.courseProgress?.[currentCourse._id]?.workouts?.find(
//           (w) => w.workoutId === workoutId,
//         )
//       : undefined,
//   );
//   useEffect(() => {
//     if (!token) {
//       const savedToken = localStorage.getItem('token');
//       if (savedToken) {
//         dispatch(setAccessToken(savedToken));
//       }
//     }
//   }, [token, dispatch]);

//   useEffect(() => {
//     if (!workoutId || !token) return; // ⚡ ждем пока появится токен

//     setLoading(true);

//     getCourseWorkout(workoutId, { token })
//       .then((workout) => {
//         dispatch(setCurrentWorkout(workout));

//         return getCourses().then((courses) => {
//           const course = courses.find((c) => c.workouts.includes(workoutId));
//           if (course) dispatch(setCurrentCourse(course));
//         });
//       })
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [workoutId, token, dispatch]);

//   const handleSubmit = () => {
//     console.log();
//   };
//   const handleChange = () => {
//     console.log();
//   };

//   if (loading) return <div>Загружаем тренировку…</div>;
//   if (!workout || !currentCourse) return <div>Нет данных о тренировке</div>;

//   return (
//     <>
//       <div className="flex w-full flex-col gap-10 pt-[60px]">
//         <h2 className="text-6xl font-medium">{currentCourse.nameRU}</h2>
//         <div className="w-full aspect-video">
//           {/* <ReactPlayer src={workout.video} controls width="100%" height="100%"  /> */}
//           <iframe
//             src={workout.video}
//             width="100%"
//             height="100%"
//             className="rounded-[30px]"
//             loading="lazy"
//           />
//         </div>
//         <div className="p-10 bg-white rounded-[30px]">
//           <h3 className="text-[32px] font-normal leading-normal">
//             Упражнения {workout.name}
//           </h3>
//           <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {workout.exercises?.map((ex, i) => {
//               const exerciseProgress =
//                 workoutProgressData?.progressData?.[i] ?? 0;
//               const progress = Math.min(
//                 100,
//                 Math.round((exerciseProgress / ex.quantity) * 100),
//               );

//               return (
//                 <div key={i}>
//                   <div className="pb-2.5 text-lg font-normal">
//                     {`${cutWorkoutName(ex.name)} ${progress}%`}
//                   </div>
//                   <ProgressBar progress={progress} />
//                 </div>
//               );
//             })}
//             {/* {workout.exercises?.map((ex, i) => (
//             <div key={i}>
//               <div className="pb-2.5 text-lg font-normal">
//                 {`${cutWorkoutName(ex.name)} ${progress}%`}{' '}
//               </div>

//               <ProgressBar progress={progress} />
//             </div>
//           ))} */}
//           </div>
//           <div className="pt-10 pb-10">
//             <Button
//               text="Заполнить свой прогресс"
//               className="h-12.5 w-80 text-lg"
//               // onClick={handleOpen}
//             />
//           </div>
//         </div>
//       </div>
//           {/* модальное окно */}
//       <div
//         className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
//         //   onClick={onClose}
//       >
//         <div
//           className="bg-white rounded-[30px] p-6 w-[360px] shadow-lg"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <h2 className="text-[24px] font-semibold mb-6">{'Мой прогресс'}</h2>

//           <div>
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-col gap-2.5 pb-8.5">
//                 <input
//                   name="email"
//                   placeholder="0"
//                   autoComplete="username"
//                   onChange={handleChange}
//                   className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"
//                 />
//                 <input
//                   name="password"
//                   placeholder="0"
//                   autoComplete="current-password"
//                   type="password"
//                   onChange={handleChange}
//                   className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"
//                 />
//               </div>
//             </form>
//           </div>

//           <Button text="Сохранить"
//           className='w-full'
//           />
//         </div>
//       </div>
//     </>
//   );
// }
