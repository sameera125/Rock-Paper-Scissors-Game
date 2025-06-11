document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const resultText = document.getElementById('result-text');
    const playerMoveElement = document.getElementById('player-move');
    const computerMoveElement = document.getElementById('computer-move');
    const resetButton = document.getElementById('reset');

    let playerScore = 0;
    let computerScore = 0;
    let gameActive = true;

    const moves = {
        rock: '<img src="https://raw.githubusercontent.com/your-username/rock-paper-scissors/main/images/rock.png" alt="Rock" class="choice-img">',
        paper: '<img src="https://raw.githubusercontent.com/your-username/rock-paper-scissors/main/images/paper.png" alt="Paper" class="choice-img">',
        scissors: '<img src="https://raw.githubusercontent.com/your-username/rock-paper-scissors/main/images/scissors.png" alt="Scissors" class="choice-img">'
    };

    const getComputerChoice = () => {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    };

    const determineWinner = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) {
            return 'tie';
        }

        if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'player';
        }

        return 'computer';
    };

    const updateScore = (winner) => {
        if (winner === 'player') {
            playerScore++;
            playerScoreElement.textContent = playerScore;
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreElement.textContent = computerScore;
        }
    };

    const updateResult = (winner, playerChoice, computerChoice) => {
        resultText.classList.remove('winner', 'loser');
        
        if (winner === 'tie') {
            resultText.textContent = `It's a tie! Both chose ${playerChoice}`;
        } else if (winner === 'player') {
            resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
            resultText.classList.add('winner');
        } else {
            resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
            resultText.classList.add('loser');
        }
    };

    const playRound = (playerChoice) => {
        if (!gameActive) return;

        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);

        // Add shake animation
        playerMoveElement.classList.add('shake');
        computerMoveElement.classList.add('shake');

        // Update moves display
        playerMoveElement.innerHTML = moves[playerChoice];
        computerMoveElement.innerHTML = moves[computerChoice];

        // Remove shake animation after it completes
        setTimeout(() => {
            playerMoveElement.classList.remove('shake');
            computerMoveElement.classList.remove('shake');
        }, 500);

        updateScore(winner);
        updateResult(winner, playerChoice, computerChoice);

        // Check for game end
        if (playerScore === 5 || computerScore === 5) {
            gameActive = false;
            const finalMessage = playerScore === 5 ? 
                'Congratulations! You won the game!' : 
                'Game Over! Computer won the game!';
            resultText.textContent = finalMessage;
            resultText.classList.add(playerScore === 5 ? 'winner' : 'loser');
        }
    };

    const resetGame = () => {
        playerScore = 0;
        computerScore = 0;
        gameActive = true;
        playerScoreElement.textContent = '0';
        computerScoreElement.textContent = '0';
        resultText.textContent = 'Choose your move!';
        resultText.classList.remove('winner', 'loser');
        playerMoveElement.innerHTML = '';
        computerMoveElement.innerHTML = '';
    };

    // Event Listeners
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const playerChoice = choice.id;
            playRound(playerChoice);
        });
    });

    resetButton.addEventListener('click', resetGame);

    // Add hover effects
    choices.forEach(choice => {
        choice.addEventListener('mouseenter', () => {
            if (gameActive) {
                choice.style.transform = 'translateY(-5px) scale(1.05)';
            }
        });

        choice.addEventListener('mouseleave', () => {
            choice.style.transform = 'translateY(0) scale(1)';
        });
    });
}); 