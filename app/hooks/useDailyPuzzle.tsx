import { useState, useEffect } from 'react';
import puzzlesData from '../data/puzzlesV2.json';
import optionsData from '../data/options.json';

export type Answer = {
  text: string[];
  stat: string | null;
}

type PuzzleInput = {
  num: number;
  category: string;
  answers: Answer[];
  optionsKey: string;
  url?: string;
}

export type Puzzle = {
  num: number;
  category: string;
  answers: Answer[];
  optionsKey: string;
  options: string[];
  url?: string;
}

export const puzzles: { [key: string]: PuzzleInput } = puzzlesData;
const options: { [key: string]: string[] } = optionsData;

// This hook returns the puzzle for the current day
// If there is no puzzle for today, it returns null
const useDailyPuzzle: (day: string | undefined) => Puzzle | null = (day: string | undefined) => {
  const [todayPuzzle, setTodayPuzzle] = useState<Puzzle | null>(null);

  useEffect(() => {
    let puzzleDay = day
    if (!puzzleDay) {
      puzzleDay = getCurrentLocalDateAsString()
    }
    const dailyPuzzle: PuzzleInput = puzzles[puzzleDay]

    if (dailyPuzzle) {
      const optionsList: string[] = options[dailyPuzzle.optionsKey]
      setTodayPuzzle({
        ...dailyPuzzle,
        options: optionsList
      });
    } else {
      // Handle the case where there is no puzzle for today
      setTodayPuzzle(null);
    }
  }, [day]);

  return todayPuzzle;
}


const getCurrentLocalDateAsString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0-11
  const day = now.getDate();

  // Pad the month and day with a leading zero if they are less than 10
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export default useDailyPuzzle;
