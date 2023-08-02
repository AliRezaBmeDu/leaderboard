const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
var scorecard = [];
export let gameId = null || localStorage.getItem('gameID');


//Function for rendering the scoreboard
const renderLeaderboard = async() => {
  const scoreboardElement = document.getElementById('scoreboard');
  scoreboardElement.innerHTML = '';
  scorecard.sort((a, b) => b.score - a.score);
  console.log('Is it calling the scorecard?', scorecard);
  for (let i = 0; i < scorecard.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.textContent = `${scorecard[i].user} - ${scorecard[i].score}`;

    // Add appropriate IDs and classes to the list items
    listItem.setAttribute('id', `player-${i + 1}`);
    listItem.classList.add('player-item');

    scoreboardElement.appendChild(listItem);
  }
}



//Function for creating a new Game
export const createNewGame = async() => {
  try{
      const response = await fetch(`${baseUrl}/games/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'My cool game' })
      });
      console.log('data', response);
      const data = await response.json();
      gameId = data.result;

      console.log(`Game created with ID: ${gameId}`);
      localStorage.setItem('gameID', gameId);
  }
  catch (error) {
      console.error('Error creating a new game:', error);
  }
}

//Function to get all the scores of the created game
export const getScores = async () => {
  try{
      const response =  await fetch(`${baseUrl}/games/${gameId}/scores/`);
      const data = await response.json();

      console.log('getScoresData',data)

      scorecard = await data.result;
      console.log('scorecard:',scorecard);

      renderLeaderboard();
  }
  catch (error) {
      console.error('Error fetching scores:', error)
  }
}

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