"use client"

import React from "react";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

import { InstructionsModal } from "./components/ModalComponent/Modals/InstructionsModal";
import GameView from "./views/GameView";

import { isNewVisitor } from "./utils";

export default function Home() {
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  useEffect(() => {
    if (isNewVisitor()) {
      setShowInstructionsModal(true);
    }

    localStorage.setItem('lastVisit', JSON.stringify(new Date().toLocaleString()));
  }, []);

  return (
    <main style={{ margin: '4vh auto' }} className="w-10/12 sm:w-8/12 md:w-1/2">
      <GameView setShowInstructionsModal={setShowInstructionsModal} />
      <InstructionsModal isOpen={showInstructionsModal} onClose={() => setShowInstructionsModal(false)} />
    </main >
  );
}
