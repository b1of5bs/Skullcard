document.addEventListener('DOMContentLoaded', function() {
    // Function to solidify player names
    function solidifyPlayerName(playerInputId, playerHeaderId) {
        const input = document.getElementById(playerInputId);
        const header = document.getElementById(playerHeaderId);

        input.addEventListener('change', function() {
            header.textContent = this.value || `Player ${playerHeaderId[playerHeaderId.length - 1]}`;
            this.readOnly = true;
        });
    }

    // Attach the function to each player input
    solidifyPlayerName('player1Name', 'player1Header');
    solidifyPlayerName('player2Name', 'player2Header');
    solidifyPlayerName('player3Name', 'player3Header');
});

function calculateTotals() {
    let totalPlayer1 = 0;
    let totalPlayer2 = 0;
    let totalPlayer3 = 0;

    // Iterate over all score inputs and sum up the values for each player
    document.querySelectorAll('.score-input[data-player="1"]').forEach(input => {
        totalPlayer1 += Number(input.value) || 0;
    });
    document.querySelectorAll('.score-input[data-player="2"]').forEach(input => {
        totalPlayer2 += Number(input.value) || 0;
    });
    document.querySelectorAll('.score-input[data-player="3"]').forEach(input => {
        totalPlayer3 += Number(input.value) || 0;
    });

    // Update the total inputs
    document.getElementById('totalPlayer1').value = totalPlayer1;
    document.getElementById('totalPlayer2').value = totalPlayer2;
    document.getElementById('totalPlayer3').value = totalPlayer3;
}

// Add this inside your script tag
document.querySelectorAll('.score-input').forEach(input => {
    input.addEventListener('change', calculateTotals);
});
function checkAndHideNameInputs() {
    var player1Name = document.getElementById('player1Name').value.trim();
    var player2Name = document.getElementById('player2Name').value.trim();
    var player3Name = document.getElementById('player3Name').value.trim();

    // Check if all names are entered
    if (player1Name !== '' && player2Name !== '' && player3Name !== '') {
        // Hide the name input boxes
        document.getElementById('player1Name').style.display = 'none';
        document.getElementById('player2Name').style.display = 'none';
        document.getElementById('player3Name').style.display = 'none';
        
        // Optionally, you can also update the headers with the names entered
        document.getElementById('player1Header').textContent = player1Name;
        document.getElementById('player2Header').textContent = player2Name;
        document.getElementById('player3Header').textContent = player3Name;
    }
}

// Add event listeners to name input boxes
document.getElementById('player1Name').addEventListener('change', checkAndHideNameInputs);
document.getElementById('player2Name').addEventListener('change', checkAndHideNameInputs);
document.getElementById('player3Name').addEventListener('change', checkAndHideNameInputs);

document.addEventListener('DOMContentLoaded', (event) => {
    // Your code to check and hide name inputs here
});

//---------------------------------------------------------------------------------------

document.getElementById('finalScoresTally3').addEventListener('click', function() {
  // Get player scores
  const scores = [
      parseInt(document.getElementById('totalPlayer1').value, 10) || 0,
      parseInt(document.getElementById('totalPlayer2').value, 10) || 0,
      parseInt(document.getElementById('totalPlayer3').value, 10) || 0
  ];

  // Create a sorted copy of the scores to determine rank
  const sortedScores = Array.from(scores).sort((a, b) => b - a);
  
  // Get unique scores for medal distribution
  const uniqueScores = [...new Set(sortedScores)];
  
  // Assign medals based on unique score ranking
  const medalColors = ['gold', 'silver', 'tan'];
  const playerMedals = scores.map(score => {
      const rank = uniqueScores.indexOf(score);
      return medalColors[rank] || 'no-medal'; // Fallback in case there are more than 3 unique scores
  });

  // Apply the medal color to each player's total cell and header
  ['totalPlayer1', 'totalPlayer2', 'totalPlayer3'].forEach((id, index) => {
      const cell = document.getElementById(id).parentNode; // Assuming the total is in an input within a td
      const header = document.getElementById(`player${index + 1}Header`);
      const medal = playerMedals[index];
      
      // Apply the medal color if there is one
      if (medal !== 'no-medal') {
          cell.style.backgroundColor = medal;
          header.style.backgroundColor = medal;
      } else {
          cell.style.backgroundColor = ''; // Remove color if no medal
          header.style.backgroundColor = '';
      }
  });
});
