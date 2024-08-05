"use client"
import {useEffect, useState} from "react";
import Question from "./question";


export default function Trivia({finishTrivia}) {

    const [triviaQuestions, setTriviaQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [currentPoints, setCurrentPoints] = useState(0);
    const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    async function getTriviaData(){
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=3");
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.results.length > 0){
                setTriviaQuestions(data.results);
                setCurrentQuestionIndex(0);
                setQuestionAndAnswers(data.results[0]);
            } else {
                throw new Error("No trivia questions available");
            }
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }
    
    function setQuestionAndAnswers(question) {
        setCorrectAnswer(question.correct_answer);
        const allAnswers = [...question.incorrect_answers, question.correct_answer];
        setAllPossibleAnswers(allAnswers.sort(() => Math.random() - 0.5));
        setSelectedAnswer("");
        setShowCorrectAnswer(false);
    }
        
    useEffect(() => {
        getTriviaData();
    }, []);

    function verifyAnswer(selectedAnswer) {
        setSelectedAnswer(selectedAnswer);
        if (selectedAnswer === correctAnswer){
            setCurrentPoints(currentPoints + 1);
        } else{
            setShowCorrectAnswer(true);
        } 
    }

    function nextQuestion(){
        const nextIndex = currentQuestionIndex + 1;
        if(nextIndex < triviaQuestions.length){
            setCurrentQuestionIndex(nextIndex);
            setQuestionAndAnswers(triviaQuestions[nextIndex]);
        } else{
            finishTrivia(currentPoints);
        }
    }

    function removeCharacters(text) {
        return text
            .replace(/(&quot\;)/g, "\"")
            .replace(/(&rsquo\;)/g, "'")
            .replace(/(&#039\;)/g, "'")
            .replace(/(&amp\;)/g, "&");
    }

    if (triviaQuestions.length === 0) return <p>Loading...</p>;
    const currentQuestion = triviaQuestions[currentQuestionIndex];

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-amber-50 p-5">
            <header className="text-center max-w-4xl">
                <div className="text-center text-2xl font-bold py-5">Current Points: {currentPoints}</div>
                <div className="grid grid-cols-2 gap-4 py-5">
                    <div className="text-left text-lg font-medium">Difficulty: {currentQuestion.difficulty}</div>
                    <div className="text-right text-lg font-medium">Category: {removeCharacters(currentQuestion.category)}</div>
                </div>
                <div className="flex items-center justify-center">
                    <Question questionObj={{
                        question: currentQuestion.question,
                        allPossibleAnswers: allPossibleAnswers,
                        verifyAnswer: verifyAnswer,
                        removeCharacters: removeCharacters,
                        selectedAnswer: selectedAnswer,
                        correctAnswer: correctAnswer,
                        showCorrectAnswer: showCorrectAnswer
                    }}/>
                </div>
                {selectedAnswer && (
                    <button 
                        onClick={nextQuestion}
                        className="bg-amber-50 text-purple-500 font-bold mt-5 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Next Question
                    </button>
                )}
            </header>
        </div>
    );
}