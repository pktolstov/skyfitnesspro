type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div>

        {/* <p className="text-lg font-normal pb-2.5">
          Прогресс <span>{progress}%</span>
        </p> */}
        <div className="w-full h-1.5 bg-gray-200 rounded-[50px] overflow-hidden">
          <div
            className="h-1.5 bg-sky-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>


  );
}
