import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import AuthModal from '@/components/AuthModal/AuthModal';
import { ToastContainer } from 'react-toastify';

interface CourseCardProps {
  children: ReactNode;
}

export default function FitnessLayout({ children }: CourseCardProps) {
  return (
    <div className="container mx-auto pt-12 px-10 w-full max-h-[100%]">
      <Header />
      {children}
      <AuthModal />
      <ToastContainer autoClose={1500} />
    </div>
  );
}
