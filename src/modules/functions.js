const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
let scorecard = [];
let gameId = 'Game with ID: wzJALsaAZgWF8DUFUCaY added.';

// Function for rendering the scoreboard
const renderLeaderboard = async () => {
  const scoreboardElement = document.getElementById('scoreboard');
  scoreboardElement.innerHTML = '';
  scorecard.sort((a, b) => b.score - a.score);
  for (let i = 0; i < scorecard.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.textContent = `${scorecard[i].user} - ${scorecard[i].score}`;

    if (i === 0) {
      const crown = document.createElement('i');
      crown.classList.add('fas', 'fa-crown');
      listItem.appendChild(crown);
    }

    // Add appropriate IDs and classes to the list items
    listItem.setAttribute('id', `player-${i + 1}`);
    listItem.classList.add('player-item');

    scoreboardElement.appendChild(listItem);
  }
};

// Function for creating a new Game
export const createNewGame = async () => {
  try {
    const response = await fetch(`${baseUrl}/games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'My cool game' }),
    });
    const data = await response.json();
    gameId = data.result;

    console.log(`Game created with ID: ${gameId}`);
    localStorage.setItem('gameID', gameId);
  } catch (error) {
    console.error('Error creating a new game:', error);
  }
};

// Function to get all the scores of the created game
export const getScores = async () => {
  try {
    console.log(`This is the url to fetch data in getScores:  ${baseUrl}/games/${gameId}/scores/`);
    const response = await fetch(`${baseUrl}/games/${gameId}/scores/`);
    const data = await response.json();
    scorecard = await data.result;

    renderLeaderboard();
  } catch (error) {
    console.error('Error fetching scores:', error);
  }
};

// Function to save a new score for the game created by you
export const saveScore = async (user, score) => {
  try {
    const response = await fetch(`${baseUrl}/games/${gameId}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    });

    const data = await response.json();
    console.log('Score saved:', data);
  } catch (error) {
    console.error('Error saving score:', error);
  }
};