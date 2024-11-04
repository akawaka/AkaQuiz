// src/sounds.js

const sounds = {
  correctAnswer: new Audio("/correct_answer.mp3"),
  wrongAnswer: new Audio("/wrong_answer.mp3"),
  startMusic: new Audio("/start_music.mp3"),
  backgroundMusic: new Audio("/game_music.mp3"),
};

sounds.backgroundMusic.loop = true;

export default sounds;
