import { useEffect, useState } from "react";
import { HeartIcon } from '@heroicons/react/24/solid';
import { ModalComponent } from "./ModalComponent"
import RankItem from "./RankItem";
import { Montserrat } from "next/font/google";
import { Answer } from "../hooks/useDailyPuzzle";

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ["latin"]
});

export const InstructionsModal = ({ isOpen, onClose }:
  {
    isOpen: boolean,
    onClose: () => void
  }) => {
  const [lives, setLives] = useState(5);
  const [guess, setGuess] = useState<Answer | undefined>(undefined);
  const [isExploding, setIsExploding] = useState(false);
  const [animateChange, setAnimateChange] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setGuess({ text: ['Pacific Ocean'], stat: '63.8 million mi²' });
    }, 4000);
    setTimeout(() => {
      setLives(4);
    }, 5000);
  }, []);

  // Trigger animations on life loss
  useEffect(() => {
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
      setAnimateChange(true);
      setTimeout(() => setAnimateChange(false), 500);
    }, 500);
  }, [lives]);

  return (
    <ModalComponent delayMs={500} show={isOpen} onClose={onClose} showChildren={isOpen}>
      <div className="p-12 pt-0 text-dark-maroon">
        <h2 className={`text-2xl mb-4 font-bold text-dark-maroon ${montserrat.className}`}>How to play</h2>
        <p className="text-l mb-2">Guess the Top 5 of today&apos;s list!</p>
        <p className="text-l mb-2">With each puzzle, you have 5 lives:</p>
        <ul className="list-disc list-outside ml-5 mb-4 ">
          <li className="mb-2">If your attempt is correct, the answer will show on the board</li>
          <div className="mb-4">
            <p className="text-l mb-2 font-semibold">Example</p>
            <RankItem index={0} answer={guess} />
          </div>
          <li className="mb-2">If your attempt is incorrect, you will lose a life </li>
          <div className="self-end flex flex-row items-center gap-2">
            <div className="relative">
              {isExploding && <div className="explode absolute inset-0 bg-red-500 rounded-full"></div>}
              <HeartIcon className={`h-5 w-5 ${isExploding ? 'shrink text-red-500' : ''}`} />
            </div>
            <span className={`text-l ${animateChange ? 'lives-change' : ''}`}>{lives}</span>
          </div>
        </ul>
        <p className="text-l">A new list is available every day at midnight. Good luck!</p>
      </div>
    </ModalComponent>
  );
}
