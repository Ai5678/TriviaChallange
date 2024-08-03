"use client"
import { useState } from "react";
import Trivia from "./trivia";
import Greeting from "./greeting";
import Summary from "./summary";

export default function Home() {
  const [stage, setStage] =useState('greeting');
  const [score, setScore] = useState(0);

  const startTrivia = () => {
    setStage('trivia');
  };

  const finishTrivia = (finalScore) => {
    setScore(finalScore);
    setStage('summary');
  };

  const restartTrivia = () => {
    setScore(0);
    setStage('trivia');
  };

  switch (stage) {
    case 'greeting':
      return <Greeting startTrivia={startTrivia}/>;
    case 'trivia':
      return <Trivia finishTrivia={finishTrivia}/>;
    case 'summary':
      return <Summary score={score} restartTrivia={restartTrivia}/>;
    default:
      return <div className="text-center text-red-500">Unknown Stage</div>
  }
}
