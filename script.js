// Player factory
const createPlayer = (name, marker) => {
    return {name, marker};
}

// Game board object
const gameBoard = (() => {
    const board = Array(9).fill('');
    const squares = document.querySelectorAll('.square');

    const getBoard = () => {
        return board;
    }
    
    const drawBoard = () => {
        for (let i = 0; i < board.length; i++) {
            squares.item(i).textContent = board[i];
        }
    }

    const clearBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }
        squares.forEach((square) => {
            square.textContent = '';
        });
    }

    squares.forEach((square) => {
        square.addEventListener('click', () => {
            const index = Array.from(squares).indexOf(square);
            if (board[index] === '') {
                board[index] = game.getActivePlayer().marker;
                drawBoard();
                if (game.checkWin()) {
                    game.toggleResultModal(`${game.getActivePlayer().name} Wins`);
                }
                else if (game.checkTie()) {
                    game.toggleResultModal('Tie');
                }
                else {
                    game.changeActivePlayer();
                }
            }
        });
    });

    return {getBoard, clearBoard};
})();

// Game object
const game = (() => {
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');

    // Player whos current turn it is
    let activePlayer = playerOne;

    // All possible combinations of markers to win game
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Display which players turn it is
    const playerName = document.getElementById('player-name');

    // Result modal
    const resultModal = document.getElementById('result-modal');
    const resultForm = document.getElementById('result-form');
    const resultText = document.getElementById('result-text');
    const overlay = document.getElementById('overlay');

    const getActivePlayer = () => {
        return activePlayer;
    }
    
    // Change player turn
    const changeActivePlayer = () => {
        activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
        updatePlayerName();
    }

    const updatePlayerName = () => {
        playerName.textContent = activePlayer.name;
    }

    const checkWin = () => {
        const board = gameBoard.getBoard();
        for (const combo of winningCombos) {
            if (board[combo[0]] !== '' && board[combo[0]]=== board[combo[1]]
                && board[combo[0]] === board[combo[2]]) {
                return true;
            }
        }
        return false;
    }

    const checkTie = () => {
        const board = gameBoard.getBoard();
        return board.every(val => val !== '');
    }

    const toggleResultModal = (result) => {
        if (result !== null) {
            resultText.textContent = result;
        }
        resultModal.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    resultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetGame();
        toggleResultModal();
    });
    
    const resetGame = () => {
        gameBoard.clearBoard();
        activePlayer = playerOne;
        updatePlayerName();
    }

    updatePlayerName();

    return {getActivePlayer, changeActivePlayer, checkWin, checkTie, toggleResultModal};
})();