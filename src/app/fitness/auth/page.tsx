import UserModal from "@/components/UserModal/UserModal";

export default function Modal() {
    return (
        <UserModal></UserModal>
    )
}








// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Button from '@/components/Button/Button';

// export default function AuthModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [mode, setMode] = useState<'login' | 'signup'>('login');
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const openLogin = () => {
//     setMode('login');
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setError('');
//     setFormData({ username: '', email: '', password: '' });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       // Здесь логика отправки формы
//     }, 1000);
//   };

//   return (
//     <div>
//       {/* Кнопка открыть модалку */}
//       <Button text={'Войти'} onClick={openLogin} className="w-full" />

//       {isOpen && (
//         <div
//           className="fixed inset-0  flex items-center justify-center z-50 rounded-[30px]"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white rounded-[30px] p-10 w-[360px] relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Логотип */}
//             <Link href={'/fitness/main'}>
//               <div className="pb-12">
//                 <div className="flex justify-center gap-2.5">
//                   <Image
//                     height={20}
//                     width={18}
//                     src="/img/logo.svg"
//                     alt="SkyLogo"
//                     className="h-6 w-auto"
//                   />

//                   <Image
//                     src="/img/logo_text.svg"
//                     height={28}
//                     width={183}
//                     alt="SkyFitnessPro"
//                     style={{ width: 'auto' }}
//                   />
//                 </div>
//               </div>
//             </Link>

//             {/* Форма входа */}
//             {mode === 'login' && (
//               <form className="flex flex-col" onSubmit={handleSubmit}>
//                 <div className="flex flex-col gap-2.5 pb-8.5">
//                   <input
//                     type="text"
//                     name="email"
//                     placeholder="Логин"
//                     value={formData.email}
//                     onChange={handleChange}
//                     autoComplete="username"
//                     className="w-full border rounded-lg border-gray-300 p-4 placeholder:text-gray-400 placeholder:text-lg focus:outline-none"
//                   />
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Пароль"
//                     value={formData.password}
//                     onChange={handleChange}
//                     autoComplete="current-password"
//                     className="w-full border rounded-lg border-gray-300 p-4 placeholder:text-gray-400 placeholder:text-lg focus:outline-none"
//                   />
//                 </div>

//                 {error && (
//                   <div className="pt-2 text-red-500 text-xs">{error}</div>
//                 )}
//                 <div className="flex flex-col gap-2.5">
//                   <Button
//                     text={isLoading ? 'Загрузка...' : 'Войти'}
//                     disabled={isLoading}
//                     type="submit"
//                     className="w-full h-[52px]  active:bg-black active:text-white in-active:bg-[#f7f7f7] in-active:text-[#99999] text-lg"
//                   />

//                   <Button
//                     text={'Зарегистрироваться'}
//                     type="submit"
//                     onClick={() => setMode('signup')}
//                     className="w-full h-[52px] bg-white border-black active:bg-[#E9ECED] in-active:bg-[#f7f7f7] in-active:text-[#99999] in-active:border-[#999999] text-lg hover:bg-[#999999]"
//                   />
//                 </div>
//               </form>
//             )}

//             {/* Форма регистрации */}
//             {mode === 'signup' && (
//               <form className="flex flex-col" onSubmit={handleSubmit}>
//                 <div className="flex flex-col gap-2.5 pb-8.5">
//                   <input
//                     type="text"
//                     name="email"
//                     placeholder="Эл. почта"
//                     value={formData.email}
//                     onChange={handleChange}
//                     autoComplete="username"
//                     className="w-full border rounded-lg border-gray-300 p-4 placeholder:text-gray-400 placeholder:text-lg focus:outline-none"
//                   />
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Пароль"
//                     value={formData.password}
//                     onChange={handleChange}
//                     autoComplete="current-password"
//                     className="w-full border rounded-lg border-gray-300 p-4 placeholder:text-gray-400 placeholder:text-lg focus:outline-none"
//                   />
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Повторите пароль"
//                     value={formData.password}
//                     onChange={handleChange}
//                     autoComplete="current-password"
//                     className="w-full border rounded-lg border-gray-300 p-4 placeholder:text-gray-400 placeholder:text-lg focus:outline-none"
//                   />
//                 </div>

//                 {error && (
//                   <div className="pt-2 text-red-500 text-xs">{error}</div>
//                 )}
//                 <div className="flex flex-col gap-2.5">
//                   <Button
//                     text={isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
//                     disabled={isLoading}
//                     type="submit"
//                     className="w-full h-[52px]  active:bg-black active:text-white in-active:bg-[#f7f7f7] in-active:text-[#99999] text-lg"
//                   />

//                   <Button
//                     text={'Войти'}
//                     type="submit"
//                     onClick={() => setMode('signup')}
//                     className="w-full h-[52px] bg-white border-black active:bg-[#E9ECED] in-active:bg-[#f7f7f7] in-active:text-[#99999] in-active:border-[#999999] text-lg hover:bg-[#999999]"
//                   />
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
