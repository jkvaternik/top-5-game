"use client"

import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import ResultCard from "./components/ResultCard";
import InputComponent from "./components/InputComponent";
import useDailyPuzzle from "./hooks/useDailyPuzzle";
import { getLocalStorageOrDefault, getScore, setLocalStorageAndState } from "./utils";
import { HeartIcon, ShareIcon } from '@heroicons/react/24/solid'
import GameOverModal from "./components/GameOverModal";

import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const LIVES = 5

export default function Home() {
  const puzzle = useDailyPuzzle();

  const [guessHistory, setGuessHistory] = useState<string[]>(getLocalStorageOrDefault('guessHistory', []));
  const [guesses, setGuesses] = useState<string[]>(getLocalStorageOrDefault('guesses', Array<string>(LIVES).fill('')));
  const [lives, setLives] = useState<number>(getLocalStorageOrDefault('lives', LIVES));
  const isGameOver = lives === 0 || guesses.every(g => g.length > 0);

  const [isExploding, setIsExploding] = useState(false);
  const [animateChange, setAnimateChange] = useState(false);

  const [showModal, setShowModal] = useState(true);

  // Trigger animations on life loss
  useEffect(() => {
    if (lives < LIVES) {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        setAnimateChange(true);
        setTimeout(() => setAnimateChange(false), 500);
      }, 500);
    }
  }, [lives]);

  if (!puzzle) {
    return null;
  }

  const handleGuess = (guess: string) => {
    const newGuessHistory = [...guessHistory, guess];
    setLocalStorageAndState('guessHistory', newGuessHistory, setGuessHistory);

    const index = puzzle.answers.indexOf(guess);
    if (index === -1) {
      const newlives = lives - 1;
      setLocalStorageAndState('lives', newlives, setLives);
    } else {
      const newGuesses = guesses.map((g, i) => i === index ? guess : g);
      setLocalStorageAndState('guesses', newGuesses, setGuesses);
    }
  }

  const guessesView = guesses.map((guess, index) => (<ResultCard key={index} index={index} guess={guess} />));
  const answerView = puzzle.answers.map((answer, index) => (<ResultCard key={index} index={index} guess={answer} />));

  const gameView = (
    <>
      <section className="flex flex-row gap-4 items-end w-full text-dark-maroon">
        <div className="flex flex-col items-center">
          <h1>top</h1>
          <h1 className="text-3xl" style={{ marginBottom: '-2px' }}>5</h1>
        </div>
        <p className="grow">{puzzle.category}</p>
        <div className="self-end flex flex-row items-center gap-2">
          {isGameOver ?
            <ShareIcon className="h-5 w-5" onClick={() => setShowModal(true)}/>
            :
            <>
              <div className="relative">
                {isExploding && <div className="explode absolute inset-0 bg-red-500 rounded-full"></div>}
                <HeartIcon className={`h-5 w-5 ${isExploding ? 'shrink text-red-500' : ''}`} />
              </div><span className={`text-xl ${animateChange ? 'lives-change' : ''}`}>{lives}</span>
            </>
          }
        </div>
      </section>
      <section>
        <InputComponent items={puzzle.options} handleGuess={handleGuess} isGameOver={isGameOver} />
      </section>
      <br></br>
      <section className="flex flex-col gap-4">
        {isGameOver ? answerView : guessesView}
      </section>
    </>
  )

  return (
    <main style={{ margin: '4vh auto' }} className="w-10/12 sm:w-8/12 md:w-1/2">
      <ToastContainer closeButton={false} />
      {gameView}
      {isGameOver && <GameOverModal puzzle={puzzle} isOpen={showModal} score={getScore(guessHistory, puzzle.answers)} onClose={() => setShowModal(false)}/>}
    </main >
  );
}
