
export default function Greeting({startTrivia}){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Trivia Challenge!</h1>
            <button onClick={startTrivia} className="bg-white text-purple-500 font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110">Start</button>
        </div>
    );
}