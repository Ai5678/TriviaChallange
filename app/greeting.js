
export default function Greeting({startTrivia}){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Trivia Challenge!</h1>
            <button onClick={startTrivia} className="bg-amber-50 text-purple-500 font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110">Start</button>
        </div>
    );
}