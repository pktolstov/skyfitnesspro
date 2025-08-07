import { ReactNode } from 'react';
import Header from '@/components/Header/Header';


interface CourseCardProps {
  children: ReactNode;
}

export default function FitnessLayout({ children }: CourseCardProps) {
  return (
    <div className="container mx-auto pt-12 px-10 w-full">
      <Header />
      {children}
      {/* <Title />
      {children}
      <div className="flex justify-center pt-8.5 pb-20">
        <Button text="Наверх ↑" className="px-5 py-2 h-14 w-[103px] text-lg" />
      </div> */}
    </div>
  );
}
