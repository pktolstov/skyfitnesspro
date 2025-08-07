import Image from 'next/image';
export default function Title() {
  return (
    <div className="pt-12 flex flex-row justify-between items-center">
      <div className="">
        <p className="whitespace-nowrap text-6xl text-black text-left font-medium tracking-normal">
          Начните заниматься спортом
          <br />и улучшите качество жизни
        </p>
      </div>
      <Image
        src="/img/moto.svg"
        width={288}
        height={102}
        alt="Moto"
        style={{ height: 'auto', width: 'auto' }}
      />
      {/* <div className="flex items-center space-x-4 h-24 w-56 ">
        <div className="relative bg-lime-400 text-black px-5 py-3 rounded-lg text-lg font-medium shadow-md ">
          Измени своё тело за полгода!
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-lime-400 transform rotate-45"></div>
        </div>
      </div> */}
    </div>
  );
}
