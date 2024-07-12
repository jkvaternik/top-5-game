import React from 'react';
import { Puzzle } from '../hooks/useDailyPuzzle';
import { getCurrentLocalDateAsString, getDayAfter, getDayBefore } from '../utils';

interface ArchiveHeaderProps {
  date: string;
  puzzle: Puzzle;
  changePuzzle: (date: string) => void;
}

const ArchiveHeader: React.FC<ArchiveHeaderProps> = ({ date, puzzle, changePuzzle }) => {
  const nextDate = getDayAfter(date)
  const previousDate = getDayBefore(date)

  const hasNext = nextDate !== getCurrentLocalDateAsString();
  const hasPrevious = previousDate !== '2024-02-24' // First puzzle date is 2024-02-25

  return (
    <div className="m-4vh shadow-top fixed z-50 bottom-0 left-0 right-0 z-1000 flex justify-between mt-4 bg-slate-300 text-center items-center md:relative rounded md:mb-3 md:shadow-none md:m-0">
      <button
        className="p-2 bg-gray-200 disabled:opacity-0 rounded-tl rounded-bl"
        onClick={() => changePuzzle(previousDate)}
        disabled={!hasPrevious}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className='text-center'>
        Archive Mode: Puzzle #{puzzle.num}
      </div>
      <button
        className="p-2 bg-gray-200 disabled:opacity-0 rounded-tr rounded-br"
        onClick={() => changePuzzle(nextDate)}
        disabled={!hasNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div >
  );
};

export default ArchiveHeader;