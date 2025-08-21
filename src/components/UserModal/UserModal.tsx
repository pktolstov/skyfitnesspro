import Button from '../Button/Button';

interface UserProps {
  email: string;
  onProfileClick: () => void;
  onLogoutClick: () => void;
}

export default function UserModal({ email,onProfileClick, onLogoutClick }: UserProps) {
  return (
    <div className="rounded-[30px] bg-white w-[266px] flex flex-col items-center justify-center p-7.5 shadow-lg">
      <div className="pb-8.5 text-center">
        <p className="font-normal text-lg pb-2.5 leading-tight">
          Пользователь:
        </p>
        <p className="text-lg font-normal text-gray-500 leading-tight">
          {email}
        </p>
      </div>
      <div className="flex flex-col gap-2.5 w-full">
        <Button text={'Мой профиль'} className="h-[52px] w-full" onClick={onProfileClick} />
        <Button
          text={'Выйти'}
          className="bg-white border border-black hover:bg-[#F7F7F7]"
          onClick={onLogoutClick}
        />
      </div>
    </div>
  );
}

// import Image from 'next/image';
// import Button from '../Button/Button';

// interface UserProps {
//     email: string;

//   }
// export default function UserModal({email}:UserProps) {
//   return (
//     <>
//       <div className="flex gap-4 relative">
//         <Image
//           src="/img/user/profile.svg"
//           alt="profile.svg"
//           width={50}
//           height={50}
//           className=""
//         />
//         <div className="flex justify-center items-center gap-3">
//           <div>
//             <p className="font-normal text-2xl">{email}</p>
//           </div>

//           <Image
//             src="/img/user/expand.svg"
//             width={15}
//             height={15}
//             alt="^"
//             className="pt-1"
//           />
//         </div>
//       </div>

//       <div className="rounded-[30px] bg-white w-[266px] flex flex-col items-center justify-center p-7.5 absolute  top-32 right-20 ">
//         <div className="pb-8.5 text-center">
//           <p className="font-normal text-lg pb-2.5 leading-tight">
//             Пользователь:
//           </p>
//           <p className="text-lg font-normal text-[#9999] leading-tight">
//             {email}
//           </p>
//         </div>
//         <div className="flex flex-col gap-2.5 w-full">
//           <Button text={'Мой профиль'} className="h-[52px] w-full" />
//           <Button
//             text={'Выйти'}
//             className="bg-white border border-black hover:bg-[#F7F7F7]"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
