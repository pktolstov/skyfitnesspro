'use client';

import { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard/CourseCard';
import { getImagePath } from '@/utils/getImagePath';
import { CourseCardData } from '@/types/courseCard';
// import { coursesCards } from '@/constants';
import Button from '@/components/Button/Button';
import Title from '@/components/Title/Title';
import { getCourses } from '@/services/courseApi';

// const coursesCardsData: CourseCardData[] = coursesCards;

export default function Main() {
  const [courses, setCourses] = useState<CourseCardData[]>([]);

  useEffect(() => {
    getCourses().then((data) => setCourses(data));
  }, []);

  return (
    <>
      <Title />
      <div className="flex flex-wrap gap-14  min-h-screen pt-12 w-full">
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
