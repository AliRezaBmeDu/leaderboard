import './style.css';
import scorecard from './modules/scorelist';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
let gameId = null;

const createNewGame = async () => {
    try{
        const response = await fetch(`${baseUrl}/games/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'My cool game' })
        });

        const data = await response.json();
        gameId = data.result;

        console.log(`Game created with ID: ${gameId}`);
    }
    catch (error) {
        console.error('Error creating a new game:', error);
    }
}

function renderLeaderboard() {
  const scoreboardElement = document.getElementById('scoreboard');
  scoreboardElement.innerHTML = '';

  for (let i = 0; i < scorecard.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.textContent = `${scorecard[i].name} - ${scorecard[i].score}`;

    // Add appropriate IDs and classes to the list items
    listItem.setAttribute('id', `player-${i + 1}`);
    listItem.classList.add('player-item');

    scoreboardElement.appendChild(listItem);
  }
}

// Call the function to create a new game when the page loads
createNewGame();

// Call the function to initially render the leaderboard
renderLeaderboard();
