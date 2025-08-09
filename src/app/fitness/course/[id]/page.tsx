import { coursesCards } from '@/constants';
import CourseDetailed from '@/components/CourseDetailed/CourseDetailed';

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = coursesCards.find((c) => c._id === params.id);

  if (!course) {
    return <div className="text-red-500">Курс не найден</div>;
  }

  return <CourseDetailed course={course} />;
}



// import CourseDetailed from '@/components/CourseDetailed/CourseDetailed';

// export default function Course() {
//   return <CourseDetailed />;
// }
