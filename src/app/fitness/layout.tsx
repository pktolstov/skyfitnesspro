import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import AuthModal from '@/components/AuthModal/AuthModal';

interface CourseCardProps {
  children: ReactNode;
}

export default function FitnessLayout({ children }: CourseCardProps) {
  return (
    <div className="container mx-auto pt-12 px-10 w-full">
      <Header />
      {children}
      <AuthModal />
    </div>
  );
}
