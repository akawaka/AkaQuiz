import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TimerProgress from "./TimerProgress";
import AuthenticationModal from "./AuthenticationModal";
import otterImage from "../../public/images/otter.webp";
import cartoonTroutImage from "../../public/images/cartoon_trout.webp";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Leaderboard from "./Leaderboard";
import { supabase } from "../supabaseClient";
import Input from "./foundations/Input";
import Button from "./foundations/Button";
import Card from "./foundations/Card";
import Heading from "./foundations/Heading";

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
  const [isGameEnd, setIsGameEnd] = useState(false);

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
    setIsGameEnd(false);
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
    if (!isActive) {
      setIsGameEnd(true);
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

  if (isGameEnd) {
    return (
      <div className="relative z-10">
        <Card>
          <Heading level={2}>Temps écoulé!</Heading>
          <div>
            <p className="text-lg">Score final: {score}</p>
            <p className="text-md">Bonnes réponses: {correctGuesses}</p>
            <div className="flex items-center mt-4 space-x-4">
              <Button
                label="Recommencer"
                variant="primary"
                onClick={handleRestart}
              ></Button>
              <Button
                label="Voir le leaderboard"
                variant="secondary"
                onClick={handleToggleLeaderboard}
              ></Button>
              {!user && (
                <Button
                  label="Enregistrer le score"
                  variant="primary"
                  onClick={handleOpenAuthModal}
                ></Button>
              )}
            </div>
          </div>
        </Card>
        {/* Render Leaderboard if visible */}
        {isLeaderboardVisible && (
          <div className="mt-6">
            <Leaderboard onClose={handleToggleLeaderboard} />
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
  }

  return (
    <div className="relative z-10 grid grid-cols-7 gap-4">
      <div className="absolute top-0 left-0">
        <Button variant="icon" onClick={onReturnHome}>
          <HomeIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className="col-span-5">
        <Card>
          <Heading level={2}>Quiz Time !</Heading>
          <p>
            Ceci est un jeu ou il faut trouver les mots via les définitions
            blablabla Essayez d&apos;en trouver le plus possible ! Si c&apos;est
            trop difficile, vous pouvez passer
          </p>
        </Card>
      </div>

      <div className="col-span-2">
        {/* Display the score and correct guesses */}
        <Card>
          <p className="text-lg font-bold">Score: {score}</p>
          <p className="text-gray-600 text-md">
            Bonnes réponses: {correctGuesses}
          </p>
        </Card>
      </div>
      <div className="col-span-3 row-span-2">
        <Card>
          <div className="mt-6">
            <p className="text-lg">Définition: {currentWord.def}</p>
            <p className="text-gray-600 text-md">
              Catégorie: {currentWord.catGram}
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center mt-4 space-x-4"
          >
            <Input
              type="text"
              value={userGuess}
              onChange={handleInputChange}
              placeholder="Votre réponse ici..."
            />
            <Button
              label="Valider"
              onClick={handleSubmit}
              variant="primary"
            ></Button>
          </form>
          <div className="pt-6">
            <Button
              variant="icon"
              icon={<ArrowPathIcon className="w-6 h-6" />}
              onClick={handlePass}
            >
              O secour c trop dur je pass
            </Button>
          </div>

          {feedback && (
            <p
              className={`mt-4 ${
                feedback === "Correct! Chargement d'un nouveau mot..."
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {feedback}
            </p>
          )}
        </Card>
      </div>
      <div className="col-span-4">
        <Card>
          <TimerProgress
            timeLeft={timeLeft}
            totalTime={totalTime}
            otterImage={otterImage}
            cartoonTroutImage={cartoonTroutImage}
          />
        </Card>
      </div>
      <div className="col-span-4">
        <Card>
          <p>totottototoototototo</p>
        </Card>
      </div>
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
