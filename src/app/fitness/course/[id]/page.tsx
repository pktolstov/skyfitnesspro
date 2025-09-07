import { coursesCards } from '@/constants';
import CourseDetailed from '@/components/CourseDetailed/CourseDetailed';

interface PageProps {
  params: { id: string };
}

export default function CoursePage({ params }: PageProps) {
  const course = coursesCards.find((c) => c._id === params.id);

  if (!course) {
    return <div className="text-red-500">Курс не найден</div>;
  }

  return <CourseDetailed course={course} />;
}
