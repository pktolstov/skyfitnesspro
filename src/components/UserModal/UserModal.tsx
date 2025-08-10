import Image from "next/image"
import Button from "../Button/Button"
export default function UserModal() {
    return (
        <>
        <div className="flex gap-4 relative">
        <Image
          src="/img/user/profile.svg"
          alt="profile.svg"
          width={50}
          height={50}
          className=""
        />
        <div className="flex justify-center items-center gap-3">
          <div>
            <p className="font-normal text-2xl">Сергей</p>
          </div>

          <Image src="/img/user/expand.svg" width={15} height={15} alt="^" className='pt-1'/>
        </div>
      </div>

      <div className="rounded-[30px] bg-white w-[266px] flex flex-col items-center justify-center p-7.5 absolute  top-32 right-20 ">
        <div className="pb-8.5 text-center">
            <p className="font-normal text-lg pb-2.5 leading-tight">Сергей</p>
            <p className="text-lg font-normal text-[#9999] leading-tight">serge.gor@mail.ru</p>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
            <Button 
            text={'Мой профиль'}
            className="h-[52px] w-full"

            />
            <Button 
            text={'Выйти'}
            className="bg-white border border-black hover:bg-[#F7F7F7]"
            
            />
        </div>
      </div>
      </>
    )
}