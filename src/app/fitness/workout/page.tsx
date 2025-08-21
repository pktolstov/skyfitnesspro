'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getCourseWorkout } from '@/services/courseApi';
import {
  setCurrentWorkout,
  setCurrentCourse,
} from '@/store/features/courseSlice';
import { setAccessToken } from '@/store/features/authSlice';
// import ReactPlayer from 'react-player';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { getCourses } from '@/services/courseApi';
import {cutWorkoutName} from '@/utils/helpers'

export default function Workout() {
  const dispatch = useAppDispatch();
  const workout = useAppSelector((state) => state.courses.currentWorkout);
  const currentCourse = useAppSelector((state) => state.courses.currentCourse);
  const token = useAppSelector((state) => state.auth.token);
  const progress = 20;
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const workoutId = params.get('workoutId');

  useEffect(() => {
    if (!token) {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        dispatch(setAccessToken(savedToken));
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (!workoutId || !token) return; // ⚡ ждем пока появится токен

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

  if (loading) return <div>Загружаем тренировку…</div>;
  if (!workout || !currentCourse) return <div>Нет данных о тренировке</div>;

  return (
    <div className="flex w-full flex-col gap-10 pt-[60px]">
      <h2 className="text-6xl font-medium">{currentCourse.nameRU}</h2>
      <div className="w-full aspect-video">
        {/* <ReactPlayer src={workout.video} controls width="100%" height="100%"  /> */}
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
          {workout.exercises?.map((ex, i) => (
            <div key={i}>
              <div className="pb-2.5 text-lg font-normal">
                {`${cutWorkoutName(ex.name)} ${progress}%`}{' '}
              </div>

              <ProgressBar progress={progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 'use client';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import { getCourseWorkout, getCourseById } from '@/services/courseApi';

// import {
//   setCurrentWorkout,
//   setCurrentCourse,
// } from '@/store/features/courseSlice';
// import ReactPlayer from 'react-player';

// export default function Workout() {
//   const dispatch = useAppDispatch();
//   const workout = useAppSelector((state) => state.courses.currentWorkout);
//   const currentCourse = useAppSelector((state) => state.courses.currentCourse);
//   const token = useAppSelector((state) => state.auth.token);

//   const [loading, setLoading] = useState(false);
//   const params = useSearchParams();
//   const courseId = params.get('courseId');
//   const workoutId = params.get('workoutId');

//   useEffect(() => {
//     if (!courseId || !workoutId) return;

//     setLoading(true);
//     Promise.all([
//       getCourseById(courseId),
//       getCourseWorkout(workoutId, { token }),
//     ])
//       .then(([course, workout]) => {
//         dispatch(setCurrentCourse(course));
//         dispatch(setCurrentWorkout(workout));
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [courseId, workoutId, token, dispatch]);

//   if (loading) return <div>Загружаем тренировку…</div>;
//   if (!workout || !currentCourse) return <div>Нет данных о тренировке</div>;

//   return (
//     <div className="flex w-full flex-col gap-10 pt-[60px]">
//       <h2 className="text-6xl font-medium">{currentCourse.name}</h2>
//       <div className="w-full aspect-video">
//         <ReactPlayer src={workout.video} controls width="100%" height="100%" />
//       </div>
//       <div className="p-10 bg-white rounded-[30px]">
//         <h3 className="text-[32px] font-normal leading-normal">Упражнения</h3>
//         {workout.exercises?.map((ex, i) => (
//           <div key={i}>{ex.name}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
