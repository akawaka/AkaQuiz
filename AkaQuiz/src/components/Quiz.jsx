import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";
import TimerProgress from "./TimerProgress";
import AuthenticationModal from "./AuthenticationModal";
import lighthouseImage from "../assets/lighthouse.svg";
import lobsterImage from "../assets/lobster.svg";
import cuteLobsterImage from "../assets/cute_lobster.png";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Leaderboard from "./Leaderboard";
import { supabase } from "../supabaseClient";
import Input from "./foundations/Input";
import Button from "./foundations/Button";
import Card from "./foundations/Card";
import Heading from "./foundations/Heading";
import Badge from "./foundations/Badge";
import BodyText from "./foundations/BodyText";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Quiz = ({ timeLeft, totalTime = 123, isActive, onRestart }) => {
  const [words, setWords] = useState({});
  const [currentWord, setCurrentWord] = useState(null);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswersList, setCorrectAnswersList] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const scoreRef = useRef({ value: 0 });
  const [countdown, setCountdown] = useState(3);
  const [isGameStarted, setIsGameStarted] = useState(false);


  // Countdown logic to start the game after 3 seconds
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsGameStarted(true);
    }
  }, [countdown]);

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
    setUserGuess("");
    setFeedback("");
    setCorrectAnswersList([]);
    selectRandomWord(words);
    onRestart();
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
    setIsGameEnd(false);
    setIsGameStarted(false);
    setCountdown(3);
  };

  // Handle passing the word (skip)
  const handlePass = () => {
    setFeedback("Mot passé. Chargement d'un nouveau mot...");
    setTimeout(() => {
      selectRandomWord(words);
    }, 1000);
  };

  // Animate score change using GSAP
  const animateScore = (newScore) => {
    gsap.to(scoreRef.current, {
      duration: 0.7,
      value: newScore, // Animate the 'value' property
      roundProps: "value", // Ensure rounding the value
      onUpdate: () => {
        setScore(Math.round(scoreRef.current.value)); // Update React state during animation
      },
    });
  };

  // Handle form submission for guessing the word
  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedUserGuess = normalizeString(userGuess);
    const normalizedCorrectWord = normalizeString(currentWord.word);

    if (normalizedUserGuess === normalizedCorrectWord) {
      setFeedback("Correct! Chargement d'un nouveau mot...");
      const newScore = scoreRef.current.value + 10; // Increment the score
      animateScore(newScore); // Animate the score change
      setCorrectAnswersList((prevList) => [
        ...prevList,
        { word: currentWord.word, definition: currentWord.def },
      ]);
      setTimeout(() => {
        selectRandomWord(words);
      }, 500);
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

  if (!isGameStarted) {
    return (
      <>
        <div className="fixed inset-0 z-30 bg-slate-800 bg-opacity-80"></div>
          <div className="absolute z-40 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <Card>
                <Heading level={3}>Préparez-vous...</Heading>
                <Heading level={2} className="text-5xl">
                  {countdown}
                </Heading>
            </Card>
          </div>
      </>
    );
  }

  if (isGameEnd) {
    return (
      <div className="relative z-10">
        <div className="absolute left-0 transform -translate-y-full -top-4">
          <Button variant="icon">
            <a href="/">
              <ArrowLeftIcon className="w-6 h-6" />
            </a>
          </Button>
        </div>
        <Card>
          <div className="flex flex-col items-center justify-center space-y-8">
            <Heading level={2}>Temps écoulé !</Heading>
            <div className="flex flex-col items-center justify-center">
              <BodyText variant="paragraph">
                Félécitation, votre score final est de
              </BodyText>
              <Heading level={2}>{score} </Heading>
            </div>
          </div>
          <div>
            <div className="flex items-center mt-8 space-x-4">
              <Button
                label="Voir le Classement"
                variant="soft"
                onClick={handleToggleLeaderboard}
              ></Button>
              <Button
                label="Recommencer"
                variant="primary"
                onClick={handleRestart}
              ></Button>
              {!user && (
                <Button
                  label="Enregistrer le score"
                  variant="secondary"
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
    <div className="relative z-10 grid grid-cols-1 gap-4 mt-12 xl:grid-cols-7">
      <div className="absolute left-0 transform -translate-y-full -top-4">
        <Button variant="icon">
          <a href="/">
            <ArrowLeftIcon className="w-8 h-8" />
          </a>
        </Button>
      </div>
      <div className="xl:col-span-5">
        <Card>
          <div className="space-y-4 text-center">
            <Heading level={2}>Le Dictionnaire à l&apos;Envers</Heading>
            <BodyText variant="paragraph">
              Devinez le mot correspondant à la définition affichée. Si
              c&apos;est correct, vous marquez des points et passez au mot
              suivant. En cas d&apos;erreur, réessayez ou passez sans pénalité.
              Attention ! le compte à rebours à démarré
            </BodyText>
          </div>
        </Card>
      </div>

      <div className="hidden xl:block xl:col-span-2">
        {/* Display the score and correct guesses */}
        <Card
          backgroundColor="bg-indigo-500"
          justifyContent="justify-center"
          alignContent="items-start"
        >
          <div className="z-10">
            <Heading level={3} white>
              ton score
            </Heading>
            <Heading level={2} white>
              {score} points
            </Heading>
          </div>
          <img
            className="absolute -right-12 z-0 w-40 h-40 transform rotate-[20deg] opacity-90 top-20"
            src={cuteLobsterImage}
            alt=""
          />
        </Card>
      </div>
      <div className="order-3 xl:order-1 xl:col-span-3 xl:row-span-2">
        <Card justifyContent="justify-center">
          <Heading level={3}>Les mots à trouver</Heading>
          <div className="flex flex-col items-center justify-center pt-8 space-y-4 text-center">
            <Badge variant="withBorder">{currentWord.catGram}</Badge>
            <div className="relative">
              <svg
                fill="none"
                viewBox="0 0 162 128"
                aria-hidden="true"
                className="absolute top-0 z-10 h-12 -translate-x-1/2 -translate-y-1/2 left-1 tranform stroke-slate-900/20"
              >
                <path
                  d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                />
                <use x={86} href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" />
              </svg>
              <BodyText variant="blockquote">{currentWord.def}</BodyText>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center mt-8 space-x-4"
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
            {feedback && (
              <p
                className={`absolute -bottom-8 -left-4 ${
                  feedback === "Correct! Chargement d'un nouveau mot..."
                    ? "text-green-600"
                    : feedback === "Mot passé. Chargement d'un nouveau mot..."
                    ? "text-slate-600"
                    : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
          <div className="pt-16">
            <Button
              variant="labelIcon"
              icon={<ArrowPathIcon className="w-6 h-6" />}
              label="O secour c trop dur je pass"
              onClick={handlePass}
            ></Button>
          </div>
        </Card>
      </div>
      <div className="order-2 xl:order-2 xl:col-span-4">
        <Card>
          <Heading level={3}>Le temps restant</Heading>
          <TimerProgress
            timeLeft={timeLeft}
            totalTime={totalTime}
            lighthouseImage={lighthouseImage}
            lobsterImage={lobsterImage}
          />
        </Card>
      </div>
      <div className="hidden xl:block xl:order-3 xl:col-span-4">
        <Card>
          <Heading level={3}>Bonnes réponses</Heading>
          <div className="flex flex-wrap gap-2 pt-8">
            {correctAnswersList.map((answer, index) => (
              <div
                key={index}
                className="flex justify-center p-2 rounded even:bg-indigo-50 odd:bg-red-50"
              >
                <BodyText variant="paragraph">{answer.word}</BodyText>
              </div>
            ))}
          </div>
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
};

export default Quiz;
