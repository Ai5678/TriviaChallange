

export default function Summary({score, restartTrivia}) {
    return(
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
        <p className="text-2xl mb-4">Your final score is: {score}</p>
        <button onClick={restartTrivia} className="bg-white text-purple-500 font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110">
        Start Again
        </button>
    </div>
    );
}