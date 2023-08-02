import './style.css';

const scorecard = [
  { name: 'Ali', score: '100' },
  { name: 'Jacob', score: '97' },
  { name: 'Isac', score: '89' },
  { name: 'Freddy', score: '88' },
];

function renderLeaderboard() {
  const scoreboardElement = document.getElementById('scoreboard');
  scoreboardElement.innerHTML = '';

  for (let i = 0; i < scorecard.length; i++) {
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
