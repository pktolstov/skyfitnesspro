'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { openModal } from '@/store/features/modalSlice';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import UserModal from '../UserModal/UserModal';
import {
  setUser,
  setIsAuth,
  setAccessToken,
  clearUser,
} from '@/store/features/authSlice';
import { getUserCourses } from '@/services/auth';

export default function Header() {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAccessToken(token));
      getUserCourses({ token }).then((user) => {
        if (user) {
          dispatch(setUser(user));
          dispatch(setIsAuth(true));
        }
      });
    }
  }, [dispatch]);
  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    router.push('/fitness/profile'); // замените на свой путь
  };

  const handleLogoutClick = () => {
    dispatch(clearUser());
    router.push('/fitness/main');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="container flex items-center justify-between relative">
      <Link href={'/fitness/main'}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2.5">
            <Image src="/img/logo.svg" height={20} width={18} alt="SkyLogo" />
            <Image
              src="/img/logo_text.svg"
              height={28}
              width={183}
              alt="SkyFitnessPro"
            />
          </div>
          <span className="text-sm text-gray-500">
            Онлайн-тренировки для занятий дома
          </span>
        </div>
      </Link>

      {isAuth && user ? (
        <div className="relative">
          <div
            className="flex gap-4 cursor-pointer"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
          >
            <Image
              src="/img/user/profile.svg"
              alt="profile.svg"
              width={50}
              height={50}
            />
            <div className="flex justify-center items-center gap-3">
              <p className="font-normal text-2xl">{user.email}</p>
              <Image
                src="/img/user/expand.svg"
                width={15}
                height={15}
                alt="^"
                className="pt-1"
              />
            </div>
          </div>

          {isUserMenuOpen && (
            <div className="absolute top-16 right-0 z-50">
              <UserModal
                onProfileClick={handleProfileClick}
                onLogoutClick={handleLogoutClick}
                email={user.email}
              />
            </div>
          )}
        </div>
      ) : (
        <Button
          text="Войти"
          className="px-5 py-2 h-14 w-[103px] text-lg"
          onClick={() => dispatch(openModal('login'))}
        />
      )}
    </header>
  );
}

// 'use client';

// import { useAppSelector, useAppDispatch } from '@/store/store';
// import { openModal } from '@/store/features/modalSlice';
// import Image from 'next/image';
// import Link from 'next/link';
// import Button from '@/components/Button/Button';
// import UserModal from '../UserModal/UserModal';

// export default function Header() {
//   const dispatch = useAppDispatch();
//   const { isAuth, user } = useAppSelector((state) => state.auth);

//   return (
//     <header className="container flex items-center justify-between">
//       <Link href={'/fitness/main'}>
//         <div className="flex flex-col gap-2">
//           <div className="flex gap-2.5">
//             <Image src="/img/logo.svg" height={20} width={18} alt="SkyLogo" />
//             <Image
//               src="/img/logo_text.svg"
//               height={28}
//               width={183}
//               alt="SkyFitnessPro"
//             />
//           </div>
//           <span className="text-sm text-gray-500">
//             Онлайн-тренировки для занятий дома
//           </span>
//         </div>
//       </Link>
//       {isAuth && user ? (
//         <UserModal
//         email={user.email}/> // в нем уже будет user.name
//       ) : (
//         <Button
//           text="Войти"
//           className="px-5 py-2 h-14 w-[103px] text-lg"
//           onClick={() => dispatch(openModal('login'))}
//         />
//       )}
//     </header>
//   );
// }
