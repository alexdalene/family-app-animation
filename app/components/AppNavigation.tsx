import { ChevronLeft, CircleHelp } from 'lucide-react';

export default function AppNavigation() {
  return (
    <nav className="flex justify-between items-center w-full mb-20">
      <ChevronLeft className="text-gray-400" />
      <div className="grid grid-cols-[15px_15px_25px_15px_15px] gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            className="h-[3px] w-full bg-gray-200 rounded-full [&:nth-child(3)]:bg-sky-400"
            key={index}
          ></div>
        ))}
      </div>
      <CircleHelp className="text-gray-400" />
    </nav>
  );
}
