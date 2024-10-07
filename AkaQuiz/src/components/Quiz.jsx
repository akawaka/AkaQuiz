import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TimerProgress from "./TimerProgress";
import AuthenticationModal from "./AuthenticationModal";
import otterImage from "../../public/images/otter.webp";
import cartoonTroutImage from "../../public/images/cartoon_trout.webp";
import Leaderboard from "./Leaderboard";
import { supabase } from "../supabaseClient";

const Quiz = ({
  timeLeft,
  totalTime = 30,
  isActive,
  onRestart,
  onReturnHome,
}) => {
  const [words, setWords] = useState({});
  const [currentWord, setCurrentWord] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);

  // Fetch the words from the JSON file
  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch("/words.json");
      const data = await response.json();
      setWords(data.words);
      selectRandomWord(data.words);
    };

    fetchWords();
  }, []);

  // Reset the game state
  const resetGame = () => {
    setScore(0);
    setCorrectGuesses(0);
    setUserGuess("");
    setFeedback("");
    selectRandomWord(words);
  };

  // Check if the user is already logged in
  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setUser(session.user); // If a session exists, store the user info
      }
    };
    checkUserSession(); // Check for session on mount
  }, []);

  // Select a random word from the words object
  const selectRandomWord = (words) => {
    const wordKeys = Object.keys(words);
    const randomIndex = Math.floor(Math.random() * wordKeys.length);
    const randomWord = wordKeys[randomIndex];
    console.log("Random word:", randomWord);
    setCurrentWord({
      word: randomWord,
      catGram: words[randomWord].catGram,
      def: words[randomWord].def,
    });
    setUserGuess("");
    setFeedback("");
  };

  // Helper function to normalize strings (remove accents)
  const normalizeString = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  // Handle restarting the game
  const handleRestart = () => {
    resetGame();
    onRestart();
  };

  // Handle passing the word (skip)
  const handlePass = () => {
    setFeedback("Mot passé. Chargement d'un nouveau mot...");
    setTimeout(() => {
      selectRandomWord(words);
    }, 1000);
  };

  // Handle form submission for guessing the word
  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedUserGuess = normalizeString(userGuess);
    const normalizedCorrectWord = normalizeString(currentWord.word);

    if (normalizedUserGuess === normalizedCorrectWord) {
      setFeedback("Correct! Chargement d'un nouveau mot...");
      setScore((prevScore) => prevScore + 10);
      setCorrectGuesses((prevCount) => prevCount + 1);
      setTimeout(() => {
        selectRandomWord(words);
      }, 1000);
    } else {
      setFeedback("Incorrect, essayez à nouveau!");
      setUserGuess("");
    }
  };

  const submitScore = useCallback(
    async (score) => {
      if (!user) {
        return;
      }

      // Use the display_name from user metadata or fallback to email if it doesn't exist
      const displayName = user.user_metadata?.display_name || user.email;

      // Fetch the existing score for the user
      const { data: existingScore, error: fetchError } = await supabase
        .from("leaderboard")
        .select("score")
        .eq("user_id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching existing score:", fetchError);
        return;
      }

      // Check if the existing score is higher or equal to the new score
      if (existingScore && existingScore.score >= score) {
        return;
      }

      // Insert or update the user's score in the leaderboard
      const { data, error: updateError } = await supabase
        .from("leaderboard")
        .upsert(
          {
            user_id: user.id,
            username: displayName,
            score,
          },
          { onConflict: ["user_id"], returning: "representation" }
        );

      if (updateError) {
        console.error("Error updating score:", updateError);
      } else {
        console.log("Score updated successfully", data);
      }
    },
    [user]
  );

  // Automatically submit score when game ends and user is logged in
  useEffect(() => {
    if (!isActive && user) {
      submitScore(score);
    }
  }, [isActive, user, score, submitScore]);

  // Handle opening the authentication modal at the end of the game
  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthenticated = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && session.user && session.user.id) {
      const authenticatedUser = session.user;

      setUser(authenticatedUser);
      setIsAuthModalOpen(false);

      submitScore();
    } else {
      console.error("No valid session found after registration");
    }
  };

  if (!currentWord) {
    return <div>Chargement...</div>;
  }

  // Handle leaderboard visibility toggle
  const handleToggleLeaderboard = () => {
    setIsLeaderboardVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="z-10 flex flex-col items-center w-1/3 p-8 bg-white rounded-lg shadow-md">
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
            <p className="text-gray-600 text-md">
              Catégorie: {currentWord.catGram}
            </p>
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
          <button
            onClick={handlePass}
            className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Pass
          </button>

          {feedback && (
            <p
              className={`mt-4 ${
                feedback === "Correct! Loading a new word..."
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}

          {/* Display the score and correct guesses */}
          <div className="mt-6">
            <p className="text-lg font-bold">Score: {score}</p>
            <p className="text-gray-600 text-md">
              Bonnes réponses: {correctGuesses}
            </p>
          </div>
        </>
      ) : (
        <div className="mt-6">
          <p className="text-2xl font-bold">Temps écoulé!</p>
          <p className="text-lg">Score final: {score}</p>
          <p className="text-md">Bonnes réponses: {correctGuesses}</p>

          {/* Buttons to restart the game, return home, or authenticate */}
          <div className="flex items-center mt-4 space-x-4">
            <button
              onClick={handleRestart}
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
            <button
              onClick={handleToggleLeaderboard}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Voir le Leaderboard
            </button>
            {!user && ( // Show auth button only if user is not authenticated
              <button
                onClick={handleOpenAuthModal}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Enregistrer le score
              </button>
            )}
          </div>
        </div>
      )}

      {/* Render Leaderboard if visible */}
      {isLeaderboardVisible && (
        <div className="mt-6">
          <Leaderboard />
          <button
            onClick={handleToggleLeaderboard}
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Fermer le Leaderboard
          </button>
        </div>
      )}

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <AuthenticationModal
          onClose={() => setIsAuthModalOpen(false)}
          onAuthenticated={handleAuthenticated}
        />
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
