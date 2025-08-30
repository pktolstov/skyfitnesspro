
import clsx from 'clsx';

interface InputProps {
  name: string;
  placeholder:string
  autoComplete?: string
  
  className?: string;
  disabled?: boolean;
  handleChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Input({
  name,
  placeholder,
  autoComplete,
  className,
  
}: InputProps) {
  return (
    <input
    name={name}
    placeholder={placeholder}
    autoComplete={autoComplete}

      className={clsx(
        'border border-[#D0CECE] h-[52px] rounded-[10px] px-4.5 py-4 w-full text-black font-normal transition-colors duration-200',
        'bg-white disabled:opacity-50 text-lg',
        className
      )}
    >
     
    </input>
  );
}


// name="email"
// placeholder="0"
// autoComplete="username"
// onChange={handleChange}
// className="border h-[52px] rounded-[10px] px-4.5 py-4 w-full"