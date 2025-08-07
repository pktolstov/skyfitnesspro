import CourseCard from '@/components/CourseCard/CourseCard';
import { getImagePath } from '@/utils/getImagePath';
import { CourseCardData } from '@/types/courseCard';
import { coursesCards } from '@/constants';
import Button from '@/components/Button/Button';
import Title from '@/components/Title/Title';

const coursesCardsData: CourseCardData[] = coursesCards;

export default function Main() {
  return (
<>
    <Title />
     <div className="flex flex-wrap gap-14  min-h-screen pt-12 w-full">
      {coursesCardsData.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          imageSrc={getImagePath(course.nameEN)}
        />
      ))}
    </div>
    <div className="flex justify-center pt-8.5 pb-20">
      <Button text="Наверх ↑" className="px-4  h-12.5 w-[127px] text-lg" />
    </div>

    </>
  );
}
