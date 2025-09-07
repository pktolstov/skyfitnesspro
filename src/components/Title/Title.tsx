import Image from 'next/image';

export default function Title() {
  return (
    <div className="pt-12 flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-0 px-4 xl:px-0">
      <div className="text-justify text-left">
        <p className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-black font-medium tracking-normal">
          Начните заниматься спортом
          <br className="hidden sm:block" />и улучшите качество жизни
        </p>
      </div>
      <div className="hidden md:block relative w-48 sm:w-56 md:w-64 xl:w-72 aspect-[288/102]">
        <Image
          src="/img/moto.svg"
          alt="Moto"
          fill
          className="object-contain"
          priority
        />
      </div>
      {/* <Image
        src="/img/moto.svg"
        width={288}
        height={102}
        alt="Moto"
        className="h-auto w-auto hidden md:block"
        
      /> */}
    </div>
  );
}

// import Image from 'next/image';

// export default function Title() {
//   return (
//     <div className="pt-12 flex flex-col xl:flex-row justify-between items-center gap-6 xl:gap-0 px-4 xl:px-0">
//       <div className="text-justify xl:text-left">
//         <p className="md:whitespace-nowrap text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-black font-medium tracking-normal">
//           Начните заниматься спортом
//           <br />и улучшите качество жизни
//         </p>
//       </div>
//       <Image
//         src="/img/moto.svg"
//         width={288}
//         height={102}
//         alt="Moto"
//         className="w-48 sm:w-56 md:w-64 xl:w-auto h-auto hidden md:block "
//       />
//     </div>
//   );
// }

// import Image from 'next/image';
// export default function Title() {
//   return (
//     <div className="pt-12 flex flex-row justify-between items-center">
//       <div className="">
//         <p className="whitespace-nowrap text-6xl text-black text-left font-medium tracking-normal">
//           Начните заниматься спортом
//           <br />и улучшите качество жизни
//         </p>
//       </div>
//       <Image
//         src="/img/moto.svg"
//         width={288}
//         height={102}
//         alt="Moto"
//         style={{ height: 'auto', width: 'auto' }}
//       />
//       {/* <div className="flex items-center space-x-4 h-24 w-56 ">
//         <div className="relative bg-lime-400 text-black px-5 py-3 rounded-lg text-lg font-medium shadow-md ">
//           Измени своё тело за полгода!
//           <div className="absolute -bottom-2 left-6 w-4 h-4 bg-lime-400 transform rotate-45"></div>
//         </div>
//       </div> */}
//     </div>
//   );
// }
