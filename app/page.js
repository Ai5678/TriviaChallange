"use client"
import { useState, useEffect } from "react";
import Trivia from "./trivia";
import Greeting from "./greeting";
import Summary from "./summary";

export default function Home() {
  const [stage, setStage] =useState('greeting');
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // adding for categories selection function
  useEffect(() => {
    async function fetchCategories(){
      try {
        const response = await fetch("https://opentdb.com/api_category.php"
        );
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
      }
        const data = await response.json();
        setCategories(data.trivia_categories);
        
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }
    fetchCategories();
  },[]);

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
      return <Greeting startTrivia={startTrivia} setSelectedCategory={setSelectedCategory} categories={categories}/>;
    case 'trivia':
      return <Trivia finishTrivia={finishTrivia} category={selectedCategory}/>;
    case 'summary':
      return <Summary score={score} restartTrivia={restartTrivia}/>;
    default:
      return <div className="text-center text-red-500">Unknown Stage</div>
  }
}
