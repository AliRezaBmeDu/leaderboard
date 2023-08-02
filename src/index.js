import './style.css';
import scorecard from './modules/scorelist';

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

// Call the function to initially render the leaderboard
renderLeaderboard();
