'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import CourseCard from '@/components/CourseCard/CourseCard';
import { getImagePath } from '@/utils/getImagePath';
import { CourseCardType } from '@/types/courseCard';
// import { coursesCards } from '@/constants';
import Button from '@/components/Button/Button';
import Title from '@/components/Title/Title';
import { getCourses } from '@/services/courseApi';
import { setAllCourses } from '@/store/features/courseSlice';



export default function Main() {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<CourseCardType[]>([]);


  useEffect(() => {
    getCourses().then((data) => {
      setCourses(data);
      dispatch(setAllCourses(data));
    });
  }, [dispatch]);
  // useEffect(() => {
  //   getCourses().then((data) => setCourses(data));
  //   dispatch(setAllCourses(courses))
  
  // }, []);

  return (
    <>
      <Title />
      <div className="flex flex-wrap gap-14  min-h-max pt-12 w-full">
        {courses.map((course, index) => (
          <CourseCard
            key={course._id}
            course={course}
            imageSrc={`/img/cards/${getImagePath(course.nameEN)}`}
            priority={index === 0}
          />
        ))}
      </div>
      <div className="flex justify-center pt-8.5 pb-20">
        <Button
          text="Наверх ↑"
          className="px-4  h-12.5 w-[127px] text-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </>
  );
}
