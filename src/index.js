import './style.css';
import {
  createNewGame, saveScore, getScores,
} from './modules/functions';

const gameId = null || localStorage.getItem('gameID');

if (!gameId) {
  createNewGame();
}

// Function to submit the input
const handleSubmitButtonClick = () => {
  const nameInput = document.getElementById('nameInput');
  const scoreInput = document.getElementById('scoreInput');
  const user = nameInput.value.trim();
  const score = Number(scoreInput.value);

  saveScore(user, score);

  // Clear the input fields after saving the score
  nameInput.value = '';
  scoreInput.value = '';
};

// Function to handle the "Refresh" button click
const handleRefreshButtonClick = () => {
  getScores();
};

// Add event listeners to buttons
document.getElementById('refreshBtn').addEventListener('click', handleRefreshButtonClick);
document.getElementById('submitBtn').addEventListener('click', handleSubmitButtonClick);
