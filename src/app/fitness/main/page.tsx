import CourseCard from '@/components/CourseCard/CourseCard';

export default function Main() {
  return (
    <div className="flex flex-wrap gap-10 justify-center  min-h-screen pt-12">
                        {Array.from({ length: 6 }).map((_, index) => (
                    <CourseCard key={index} />
                  ))}
      <CourseCard />
    </div>
  );
}
