"use client"
import { useState } from "react";

export default function Greeting({ startTrivia, setSelectedCategory, categories }) {
  const [category, setCategory] = useState("");

  const handleStartTrivia = () => {
    setSelectedCategory(category);
    startTrivia();
  };

  return (
    <div className="text-center flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Trivia Challenge!</h1>

      {/* Select Category Dropdown */}
      <div className="mx-14 mt-4 mb-20">
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-amber-50 text-purple-500 font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg"
        >
          <option value="">Any Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleStartTrivia}
        className="bg-purple-500 hover:bg-purple-700 text-amber-50 font-bold py-2 px-24 md:py-3 md:px-26 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
      >
        Start
      </button>
    </div>
  );
}