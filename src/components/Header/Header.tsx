import Image from 'next/image';
import Button from '@/components/Button/Button';

export default function Header() {
  return (
    <header className="container flex items-center justify-between bg-white w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2.5">
          <Image
            height={20}
            width={18}
            src="/img/logo.svg"
            alt="SkyLogo"
            className="h-6 w-auto"
          />

          <Image
            src="/img/logo_text.svg"
            height={28}
            width={183}
            alt="SkyFitnessPro"
            style={{ width: 'auto' }}
          />
        </div>

        <span className="text-sm text-gray-500">
          Онлайн-тренировки для занятий дома
        </span>
      </div>
      <Button text="Войти" className="px-5 py-2 h-14 w-[103px] text-lg"/>

      {/* <button className="bg-[#BCEC30] text-black px-5 py-2 rounded-full hover:bg-[#C6FF00] text-sm font-normal h-14 w-[103px]">
        Войти
      </button> */}
    </header>
  );
}
