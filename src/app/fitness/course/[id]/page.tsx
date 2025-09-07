import { coursesCards } from '@/constants';
import CourseDetailed from '@/components/CourseDetailed/CourseDetailed';
import React from 'react';

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function CoursePage({ params }: Props): Promise<React.ReactNode> {
  const course = coursesCards.find((c) => c._id === params.id);

  if (!course) {
    return <div className="text-red-500">Курс не найден</div>;
  }

  return <CourseDetailed course={course} />;
}