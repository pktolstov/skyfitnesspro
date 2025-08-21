'use client';
import clsx from 'clsx';

interface ButtonProps {
  text: string;
  // onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  text,
  onClick,
  type = 'button',
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-5 py-2 h-[52px] rounded-full text-black font-normal transition-colors duration-200',
        'bg-[#BCEC30] hover:bg-[#C6FF00] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-lg',
        className
      )}
    >
      {text}
    </button>
  );
}




// type ButtonProps = {
//   text: string;
//   className?: string;
//   onClick?: () => void;
//   type?: string;
//   disabled?: boolean;
// };

// export default function Button({ text, className = '', onClick }: ButtonProps) {
//   return (
//     <button
//       onClick={onClick}
//       className={`bg-[#BCEC30] text-black rounded-full hover:bg-[#C6FF00] text-sm font-normal ${className}`}
//     >
//       {text}
//     </button>
//   );
// }
