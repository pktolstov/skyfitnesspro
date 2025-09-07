import { coursesCards } from '@/constants';
import CourseDetailed from '@/components/CourseDetailed/CourseDetailed';

interface Params {
  id: string;
}

export default async function CoursePage({ params }: { params: Params }) {
  // Если данные будут из API, можно сделать await fetch
  const course = coursesCards.find((c) => c._id === params.id);

  if (!course) {
    return <div className="text-red-500">Курс не найден</div>;
  }

  return <CourseDetailed course={course} />;
}


