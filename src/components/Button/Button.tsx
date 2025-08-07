type ButtonProps = {
    text: string;
    className?: string;
    onClick?: () => void;
  };
  
  export default function Button({ text, className = '', onClick }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`bg-[#BCEC30] text-black rounded-full hover:bg-[#C6FF00] text-sm font-normal ${className}`}
      >
        {text}
      </button>
    );
  }