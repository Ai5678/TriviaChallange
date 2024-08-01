"use client"
import {useEffect, useState} from "react";

export default function Trivia(){

    const [triviaQuestion, setTriviaQuestion] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [currentPoints, setCurrentPoints] = useState(0);
    const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
    
    async function combineAllAnswers(incorrectAnswers, correct) {
        let allAnswers = [...incorrectAnswers, correct];
        allAnswers.sort(() => Math.random() - 0.5);
        setAllPossibleAnswers(allAnswers);
    }

    async function getTriviaData(){
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=3&type=multiple"
            );
            const data = await response.json();
            if(!response.ok){
                console.log(`Error: ${response.statusText}`);
            }
            const results = data.results[0];
            setTriviaQuestion(results);
            setCorrectAnswer(results.correct_answer);
            combineAllAnswers(results.incorrect_answers, results.correct_answer);
        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }
    useEffect(() => {
        getTriviaData();
    }, []);

    function verifyAnswer(selectedAnswer) {
        if (selectedAnswer === correctAnswer){
            setCurrentPoints(currentPoints + 1);
            getTriviaData();
        } else{
            getTriviaData();
        }
    }

    function removeCharacters(question) {
        return question
            .replace(/(&quot\;)/g, "\"")
            .replace(/(&rsquo\;)/g, "'")
            .replace(/(&#039\;)/g, "'")
            .replace(/(&amp\;)/g, "&");
    }

    if (!triviaQuestion) return <p>Loading...</p>;

    return(
        <div>
            <header>
                <div>
                    <div>Current Points: {currentPoints}</div>
                    <br />
                    <div>
                        <div>{removeCharacters(triviaQuestion.question)}</div>
                        <br />
                        <div>
                            {allPossibleAnswers.map((answer, index) => (
                                <button key={index} onClick={() => verifyAnswer(answer)}>
                                    {removeCharacters(answer)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}