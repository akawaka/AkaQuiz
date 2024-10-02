import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimerProgress from './TimerProgress';
import otterImage from '../../public/images/otter.webp';
import cartoonTroutImage from '../../public/images/cartoon_trout.webp';

const Quiz = ({ timeLeft, totalTime = 120, isActive, onRestart, onReturnHome }) => {
  const [words, setWords] = useState({});
  const [currentWord, setCurrentWord] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0); // Track the score
  const [correctGuesses, setCorrectGuesses] = useState(0); // Track correct guesses

  // Fetch the words from the JSON file
  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch('/words.json');
      const data = await response.json();
      setWords(data.words);
      selectRandomWord(data.words);
    };

    fetchWords();
  }, []);

  // Select a random word from the words object
  const selectRandomWord = (words) => {
    const wordKeys = Object.keys(words);
    const randomIndex = Math.floor(Math.random() * wordKeys.length);
    const randomWord = wordKeys[randomIndex];
    setCurrentWord({
      word: randomWord,
      catGram: words[randomWord].catGram,
      def: words[randomWord].def,
    });
    setUserGuess('');
    setFeedback('');
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  // Handle form submission for guessing the word
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userGuess.toLowerCase() === currentWord.word.toLowerCase()) {
      setFeedback('Correct! Loading a new word...');
      setScore((prevScore) => prevScore + 10); // Increment score by 10 points
      setCorrectGuesses((prevCount) => prevCount + 1); // Increment correct guesses
      setTimeout(() => {
        selectRandomWord(words);
      }, 1500);
    } else {
      setFeedback('Incorrect, try again!');
      setUserGuess('');
    }
  };

  if (!currentWord) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Quiz Time!</h1>
      <TimerProgress
        timeLeft={timeLeft}
        totalTime={totalTime}
        otterImage={otterImage}
        cartoonTroutImage={cartoonTroutImage}
      />

      {isActive ? (
        <>
          <div className="mt-6">
            <p className="text-lg">Définition: {currentWord.def}</p>
            <p className="text-gray-600 text-md">Catégorie: {currentWord.catGram}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              value={userGuess}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Guess the word"
            />
            <button
              type="submit"
              className="px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>

          {feedback && (
            <p className={`mt-4 ${feedback === 'Correct! Loading a new word...' ? 'text-green-600' : 'text-red-600'}`}>
              {feedback}
            </p>
          )}

          {/* Display the score and correct guesses */}
          <div className="mt-6">
            <p className="text-lg font-bold">Score: {score}</p>
            <p className="text-gray-600 text-md">Bonnes réponses: {correctGuesses}</p>
          </div>
        </>
      ) : (
        <div className="mt-6">
          <p className="text-2xl font-bold">Temps écoulé!</p>
          <p className="text-lg">Score final: {score}</p>
          <p className="text-md">Bonnes réponses: {correctGuesses}</p>

          {/* Buttons to restart the game or return home */}
          <div className="mt-4">
            <button
              onClick={onRestart}
              className="px-4 py-2 mr-4 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Recommencer
            </button>
            <button
              onClick={onReturnHome}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Quiz.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  totalTime: PropTypes.number,
  isActive: PropTypes.bool.isRequired,
  onRestart: PropTypes.func.isRequired,
  onReturnHome: PropTypes.func.isRequired,
};

export default Quiz;
