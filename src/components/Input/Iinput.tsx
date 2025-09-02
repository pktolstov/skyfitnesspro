import clsx from 'clsx';
import { InputHTMLAttributes, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  className?: string;
  value?: number | string;
}

export default function Input({ name, className,type, value, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      name={name}
      className={clsx(
        'border border-[#D0CECE] h-[52px] rounded-[10px] px-4.5 py-4 w-full text-black font-normal transition-colors duration-200 placeholder:text-gray-400',
        'bg-white disabled:opacity-50 text-lg',
        type === 'number' && 'appearance-none [MozAppearance:textfield]',
        className
      )}
      value={isFocused ? value : value ?? ''}
      placeholder={isFocused ? '' : String(value ?? 0)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}



// import clsx from 'clsx';
// import { InputHTMLAttributes } from 'react';

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
//   name?: string;
//   className?: string;
// }

// export default function Input({
//   name,
//   className,
//   type,
//   ...props
// }: InputProps) {
//   return (
//     <input
//       name={name}
//       className={clsx(
//         'border border-[#D0CECE] h-[52px] rounded-[10px] px-4.5 py-4 w-full text-black font-normal transition-colors duration-200 placeholder:text-gray-50',
//         'bg-white disabled:opacity-50 text-lg',
//         type === 'number' && 'appearance-none [MozAppearance:textfield]',
//         className
//       )}
//       {...props}
//     />
//   );
// }





// import clsx from 'clsx';

// interface InputProps {
//   name: string;
//   placeholder:string
//   autoComplete?: string
  
//   className?: string;
//   disabled?: boolean;
//   handleChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
// }

// export default function Input({
//   name,
//   placeholder,
//   autoComplete,
//   className,
  
// }: InputProps) {
//   return (
//     <input
//     name={name}
//     placeholder={placeholder}
//     autoComplete={autoComplete}

//       className={clsx(
//         'border border-[#D0CECE] h-[52px] rounded-[10px] px-4.5 py-4 w-full text-black font-normal transition-colors duration-200',
//         'bg-white disabled:opacity-50 text-lg',
//         className
//       )}
//     >
     
//     </input>
//   );
// }


// name="email"
// placeholder="0"
// autoComplete="username"
// onChange={handleChange}
// className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"