'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { closeModal, switchMode } from '@/store/features/modalSlice';
import Button from '@/components/Button/Button';
import Image from 'next/image';

export default function AuthModal() {
  const dispatch = useDispatch();
  const { isOpen, mode } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // отключаем скролл
    } else {
      document.body.style.overflow = ''; // возвращаем скролл
    }
    return () => {
      document.body.style.overflow = ''; // очищаем при размонтировании
    };
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50  bg-black/40 bg-opacity-10"
      onClick={() => dispatch(closeModal())}
    >
      <div
        className="bg-white rounded-[30px] p-10 w-[360px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Логотип */}
        <div className="pb-12 flex justify-center gap-2.5">
          <Image src="/img/logo.svg" width={18} height={20} alt="Logo" className="h-6 w-auto"/>
          <Image src="/img/logo_text.svg" width={183} height={28} alt="SkyFitness" className=" w-auto" />
        </div>

        {mode === 'login' ? (
            <form>
          <div className='flex flex-col gap-2.5 pb-8.5'>
            {/* Форма входа */}
            <input placeholder="Логин" autoComplete="username" className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full" />
            <input placeholder="Пароль" autoComplete="current-password" type="password" className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Button text="Войти" />
              <Button
                text="Зарегистрироваться"
                onClick={() => dispatch(switchMode('signup'))}
                className="bg-white border border-black hover:bg-gray-200"
              />
            </div>
          
          </form>
        ) : (
          <form>
          <div className='flex flex-col gap-2.5 pb-8.5'>
            {/* Форма регистрации */}
            <input placeholder="Эл. почта" autoComplete="username" className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full" />
            <input placeholder="Пароль" autoComplete="current-password" type="password" className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full" />
            <input placeholder="Повторите пароль" autoComplete="current-password" type="password" className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Button text="Зарегистрироваться" />
              <Button
                text="Войти"
                onClick={() => dispatch(switchMode('login'))}
                className="bg-white border border-black hover:bg-[#F7F7F7] active:bg-[#E9ECED] in-active:text-[#999999]"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}



// 'use client';

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { closeModal, openSignup } from '@/store/features/modalSlice';
// import Image from 'next/image';
// import Link from 'next/link';
// import Button from '@/components/Button/Button';
// import { useState } from 'react';

// export default function AuthModal() {
//   const dispatch = useDispatch();
//   const { isOpen, mode } = useSelector((state: RootState) => state.modal);

//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => setIsLoading(false), 1000);
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
//       onClick={() => dispatch(closeModal())}
//     >
//       <div
//         className="bg-white rounded-[30px] p-10 w-[360px]"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Логотип */}
//         <Link href={'/fitness/main'}>
//           <div className="pb-12 flex justify-center gap-2.5">
//             <Image src="/img/logo.svg" alt="SkyLogo" height={20} width={18} />
//             <Image
//               src="/img/logo_text.svg"
//               height={28}
//               width={183}
//               alt="SkyFitnessPro"
//               style={{ width: 'auto' }}
//             />
//           </div>
//         </Link>

//         {/* Форма */}
//         <form className="flex flex-col" onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-2.5 pb-8.5">
//             <input
//               type="text"
//               name="email"
//               placeholder="Эл. почта"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border rounded-lg border-[#999999] p-4 placeholder:text-gray-400 placeholder:text-lg focus:outline-none"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Пароль"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-lg border-[#999999] p-4 placeholder:text-gray-400 placeholder:text-lg focus:outline-none"
//             />
//           </div>

//           {error && <div className="pt-2 text-red-500 text-xs">{error}</div>}

//           <div className="flex flex-col gap-2.5">
//             <Button
//               text={isLoading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
//               disabled={isLoading}
//               type="submit"
//               className="w-full h-[52px] active:bg-black active:text-white"
//             />

//             <Button
//               text={mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
//               onClick={() => dispatch(openSignup())}
//               className="w-full h-[52px] bg-white border border-[#999999] hover:bg-[#999999] hover:text-white"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }