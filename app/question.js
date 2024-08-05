
export default function Question({questionObj}){
    const {
        question,
        allPossibleAnswers,
        verifyAnswer,
        removeCharacters,
        selectedAnswer,
        correctAnswer,
        showCorrectAnswer 
    } = questionObj;

    return(
        <div className="p-4 max-w-xl mx-auto bg-amber-50 rounded-lg shadow-lg">
            <div className="mb-4 text-lg font-bold text-gray-900">
                {removeCharacters(question)}
            </div>
            <div className="grid grid-cols-2 gap-4 text-lg text-gray-900">
                {allPossibleAnswers.map((answer, index) => (
                    <button key={index} onClick={() => verifyAnswer(answer)} className={`bg-purple-500 hover:bg-purple-700 text-amber-50 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-110 ${
                        selectedAnswer && selectedAnswer === answer ? selectedAnswer === correctAnswer ? "bg-green-500" : "bg-red-500" : ""
                    }`} 
                    disabled={!!selectedAnswer}>
                        {removeCharacters(answer)}
                    </button>
                ))}
            </div>
            {showCorrectAnswer && selectedAnswer !== correctAnswer && (
                <div className="mt-4 text-red-500 font-bold">
                    Correct Answer: {removeCharacters(correctAnswer)}
                </div>
            )}
        </div>
    );
}