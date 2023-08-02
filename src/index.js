import './style.css';
import scorecard from './modules/scorelist';

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
let gameId = null;

//Function for creating a new Game
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

//Function to get all the scores of the created game
const getScores = async () => {
    try{
        if(!gameId){
            console.error('The Game is not created yet');
            return
        }
        const response =  await fetch(`${baseUrl}/games/${gameId}/scores/`);
        const data = await response.json();
        scorecard.push(data.result);
    }
    catch (error) {
        console.error('Error fetching scores:', error)
    }
}

// Function to save a new score for the game created by you
const saveScore = async (user, score) => {
    try {
      if (!gameId) {
        console.error('No game is created yet.');
        return;
      }
  
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


//Function for rendering the scoreboard
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
if(!gameId){
    createNewGame();
}


// Call the function to initially render the leaderboard
renderLeaderboard();
