'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import { clearUser } from '@/store/features/authSlice';
import CourseCard from '@/components/CourseCard/CourseCard';
import { userCoursesData } from '@/constants';
import TrainingsModal from '@/components/TrainingsModal/TrainingsModal';
import { getImagePath } from '@/utils/getImagePath';
import { filterCoursesByIds } from '@/utils/helpers';
import { getCourses } from '@/services/courseApi';
import { setAllCourses } from '@/store/features/courseSlice';
import type { CourseCardType } from '@/types/courseCard';
import { getCourseWorkout } from '@/services/courseApi';
import { toast } from 'react-toastify';
import { WorkoutType } from '@/types/courseType';


type TrainingItem = WorkoutType;

export default function UserProfile() {
  const [error, setError] = useState('');
  const { allCourses } = useAppSelector((state) => state.courses);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (allCourses.length === 0) {
      getCourses().then((data) => dispatch(setAllCourses(data)));
    }
  }, [allCourses.length, dispatch]);
  const favoriteCourses = filterCoursesByIds(
    allCourses,
    userCoursesData.selectedCourses,
  );

  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const handleLogoutClick = () => {
    dispatch(clearUser());
    router.push('/fitness/main');
  };

  // ---- modal state ----
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  // открыть модалку для конкретного курса
  const handleOpenTrainings = async (course: CourseCardType) => {
    setModalTitle(course.nameRU);
    setIsModalOpen(true);
    setModalLoading(true);

    try {
      const uniqueIds = Array.from(new Set(course.workouts ?? []));
      const data = await Promise.all(
        uniqueIds.map(async (id) => {
          const workout = await getCourseWorkout(id, { token: token });
          return workout;
        }),
      );
      //описать обработку ошибок корректно
      setTrainings(data);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message || 'Что-то пошло не так');
        setTrainings([]);
      }
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[60px] pt-[60px] pb-64">
      <div>
        <h2 className="font-semibold text-[40px] pb-10">Профиль</h2>
        <div className="bg-white rounded-[30px]">
          <div className="p-7.5 flex gap-8">
            <Image
              src="/img/user/avatar.svg"
              alt="Avatar"
              width={197}
              height={197}
            />
            <div className="flex flex-col justify-top items-left">
              <p className="pb-7.5 text-[32px] font-medium">Пользователь:</p>
              <span className="text-lg font-normal pb-11">
                Логин: {user?.email}
              </span>
              <Button
                text="Выйти"
                className="bg-white hover:bg-[#F7F7F7] border"
                onClick={handleLogoutClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-[40px]">Мои курсы</h2>
        <div className="pt-10 flex flex-wrap gap-14 w-full">
          {favoriteCourses.map((course, index) => (
            <CourseCard
              key={course._id}
              course={course}
              imageSrc={`/img/cards/${getImagePath(course.nameEN)}`}
              priority={index === 0}
              isProgress
              onOpenTrainings={handleOpenTrainings} // 👈 передаём обработчик
            />
          ))}
        </div>
      </div>

      <TrainingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        trainings={trainings}
        loading={modalLoading}
      />
    </div>
  );
}

// 'use client';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/store/store';
// import Image from 'next/image';
// import Button from '@/components/Button/Button';
// import { clearUser } from '@/store/features/authSlice';
// import CourseCard from '@/components/CourseCard/CourseCard';
// import { userCoursesData } from '@/constants';
// import TrainingsModal from '@/components/TrainingsModal/TrainingsModal';
// import { getImagePath } from '@/utils/getImagePath';
// import { filterCoursesByIds } from '@/utils/helpers';

// import { getCourses } from '@/services/courseApi';
// import { setAllCourses } from '@/store/features/courseSlice';

// export default function UserProfile() {
//   // const [courses, setCourses] = useState<CourseCardData[]>([]);
//   const { allCourses } = useAppSelector((state) => state.courses);
//   const dispatch = useAppDispatch()
//   const favoriteCourses = filterCoursesByIds(allCourses,userCoursesData.selectedCourses)

//   useEffect(() => {
//     if (allCourses.length === 0) {
//       getCourses().then((data) => dispatch(setAllCourses(data)));
//     }
//   }, [allCourses.length, dispatch]);

//   const router = useRouter();
//   const handleLogoutClick = () => {
//     dispatch(clearUser());
//     router.push('/fitness/main');
//   };

//   return (
//     <div className="flex flex-col gap-[60px] pt-[60px] pb-64">
//       <div>
//         <h2 className="font-semibold text-[40px] pb-10">Профиль</h2>
//         <div className="bg-white rounded-[30px]">
//           <div className="p-7.5 flex gap-8">
//             <Image
//               src="/img/user/avatar.svg"
//               alt="Avatar"
//               width={197}
//               height={197}
//             />
//             <div className="flex flex-col justify-top items-left">
//               <p className="pb-7.5 text-[32px] font-medium">Пользователь:</p>
//               <span className="text-lg font-normal pb-11">
//                 Логин: sergey.petrov96
//               </span>
//               <Button
//                 text="Выйти"
//                 className="bg-white hover:bg-[#F7F7F7] border"
//                 onClick={handleLogoutClick}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h2 className="font-semibold text-[40px] ">Мои курсы</h2>
//         <div className="pt-10 flex flex-wrap gap-14 w-full">
//           {favoriteCourses.map((course, index) => (
//             <CourseCard
//               key={course._id}
//               course={course}
//               imageSrc={`/img/cards/${getImagePath(course.nameEN)}`}
//               priority={index === 0}
//               isProgress={true}
//             />
//           ))}
//         </div>
//       </div>
//       <TrainingsModal />
//     </div>
//   );
// }
