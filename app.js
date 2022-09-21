// this will be a factory function as we will have multiple players.

const flowControl = (() => {


  // Method to call when someone wins or there is no more moves to make
  function gameEnds(winner) {
    displayController.gameOverPanelOpen(winner);
  }

  function newGame() {
    gameBoard.emptyGameBoard()
    displayController.updateBoardElement();
  }



// PLAYER FACTORY FUNCTION
  const Player = (markType) => {
    return { markType }
  };

  const player1 = Player('X');
  const player2 = Player('O');






// GAMEBOARD MODULE
  const gameBoard = (() => {
    var board =
      ["", "", "",
        "", "", "",
        "", "", ""];

    // front functionality of gameboard
    var player = player1;

    function emptyGameBoard() {
      for (i = 0; i < 9; i++) {
        board[i] = "";
      }

      player = player1;
    }

    function checkBoard(lst_board) {
      function checkThreeNumbers(arrayToCheck) {
        endResult = {'X': 0, 'O': 0};
        for (let i=0; i<3; i++) {endResult[arrayToCheck[i]] += 1;}
        if (endResult['X'] == 3) { return 'X'}
        else if (endResult['O'] == 3) {return 'O'}
        else {return ''}
      }


      let possibleWinner = "";

      //check rows
      for (let i = 0; i < 3; i++) {
        possibleWinner += checkThreeNumbers(lst_board.slice(i*3, i*3 + 3));

        // console.log(board.slice(i, i + 3));

      }
      //check columns
      for (let i=0; i<3; i++) {
        possibleWinner += checkThreeNumbers([lst_board[0 * 3 + i], lst_board[1 * 3 + i], lst_board[2*3+i]]);
      }

      //check two diagonals
      possibleWinner += checkThreeNumbers([lst_board[0], lst_board[4], lst_board[8]]);
      possibleWinner += checkThreeNumbers([lst_board[2], lst_board[4], lst_board[6]]);


      let filledEntries = 0;

      for (i=0; i<9; i++) {
        if (lst_board[i] != "") {
          filledEntries += 1;
        }
      }

      if (possibleWinner == "") {
        if (filledEntries == 9) {
          possibleWinner = 'tie';
        }
      }

      return possibleWinner

    }


    function writeEntry() {

      i = this.getAttribute('data') - 1

      if (board[i] == "") {
        board[i] = player.markType;
        displayController.updateBoardElement();
        possibleWinner = checkBoard(board);

        if (possibleWinner != '') {
          gameEnds(possibleWinner);
        }

        if (player.markType == player1.markType) {
          player = player2;
        }
        else { player = player1; }

      }

    }

    function writeEntry_ai() {

      i = this.getAttribute('data') - 1

      if (board[i] == "") {
        board[i] = player.markType;
        displayController.updateBoardElement();
        possibleWinner = checkBoard(board);

        if (possibleWinner != '') {
          gameEnds(possibleWinner);
        }

        if (player.markType == player1.markType) {
          player = player2;


          const current_board = board.slice();
          console.log(current_board);
          best_move = minimax(current_board, player.markType)[1];
          // console.log(minimax(current_board, player.markType)[1]);
          board[best_move] = player.markType;

          displayController.updateBoardElement();
          player = player1;
        }
        else { player = player1; }

      }

    }

    const boardElement = document.querySelector(".board");

    function frontEndTouch() {

      for (let item of boardElement.children) {

       item.removeEventListener('click', writeEntry);
        item.addEventListener('click', writeEntry);

      };
    }

    function frontEndTouch_ai() {

      for (let item of boardElement.children) {

        item.removeEventListener('click', writeEntry_ai);
        item.addEventListener('click', writeEntry_ai);

      };
    }


    return {
      board: board, frontEndTouch: frontEndTouch, writeEntry: writeEntry, emptyGameBoard
        : emptyGameBoard, frontEndTouch_ai: frontEndTouch_ai, checkBoard: checkBoard};
  })();




// DISPLAY CONTROLLER MODULE
  const displayController = (() => {
    const boardElement = document.querySelector(".board");
    const bodyElement = document.querySelector('body');
    const aiVsPlayerButton = document.querySelector('.ai-button');
    const playerVsPlayerButton = document.querySelector('.two-players-button');


    function updateBoardElement() {

      for (var i = 0; i < boardElement.children.length; i++) {
        boardElement.children[i].textContent = gameBoard.board[i];
      }
    }

    function disableClicks() {
      for (let item of boardElement.children) {
        item.removeEventListener('click', gameBoard.writeEntry);}

      aiVsPlayerButton.removeEventListener('click', gameStartPanelOpen);
      playerVsPlayerButton.removeEventListener('click', gameStartPanelOpen);
    }

    function enableClicks() {

    }

    function gameStartPanelOpen() {
      disableClicks();

      const gamePanelElement = document.createElement('div');
      gamePanelElement.setAttribute('class', 'panel');
      const gameButtonsElement = document.createElement('div');
      gameButtonsElement.setAttribute('class', 'game-buttons');
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.setAttribute('class', 'cancel');

      const startButton = document.createElement('button');
      startButton.textContent = 'Start';
      startButton.setAttribute('class', 'start');

      const boardContent = document.querySelector('.board-content');
      boardContent.appendChild(gamePanelElement);
      gamePanelElement.textContent = 'Enter the players names';
      gameButtonsElement.appendChild(cancelButton);
      gameButtonsElement.appendChild(startButton);
      gamePanelElement.appendChild(gameButtonsElement);

      mode = this.getAttribute('class')
      startButton.addEventListener('click', () => gameStartPanelClose(mode));

      this.style.backgroundColor = 'grey';

    }

    function gameStartPanelClose(mode) {
      newGame();

      if (mode == 'two-players-button') { gameBoard.frontEndTouch(); }
      else { gameBoard.frontEndTouch_ai(); }

      const gamePanelElement = document.querySelector('.panel');
      gamePanelElement.remove();

    }


    function gameOverPanelOpen(winner) {

        const gamePanelElement = document.createElement('div');
        gamePanelElement.setAttribute('class', 'panel');
        const gameButtonsElement = document.createElement('div');
        gameButtonsElement.setAttribute('class', 'game-buttons');
        const cancelButton = document.createElement('button');

        const startButton = document.createElement('button');
        startButton.textContent = 'New Game';
        startButton.setAttribute('class', 'start');

        const boardContent = document.querySelector('.board-content');
        boardContent.appendChild(gamePanelElement);
        if (winner == 'tie') {
          gamePanelElement.textContent = 'It is a tie!';
        }
        else { gamePanelElement.textContent = 'Player with marker ' + winner + ' won!!!';}
        gameButtonsElement.appendChild(startButton);
        gamePanelElement.appendChild(gameButtonsElement);

        startButton.addEventListener('click', gameStartPanelClose);

      }


    playerVsPlayerButton.addEventListener('click', gameStartPanelOpen);

    aiVsPlayerButton.addEventListener('click', gameStartPanelOpen);

    return {
      updateBoardElement, gameOverPanelOpen, boardElement};

  })();

  function minimax(board_status, player) {


    let moves = [];
    for (i = 0; i < board_status.length; i++) {
      if (board_status[i] == "") {
        moves.push(i);
      }
    }

    if (gameBoard.checkBoard(board_status) != "") {
      if (gameBoard.checkBoard(board_status) == 'X') {return [1, -1]}
      else if (gameBoard.checkBoard(board_status) == 'O') {return [-1, -1]}
      else {return [0, -1]}
    }

    else if (player == 'X') {
      let value = -2;
      best_move = moves[0];
      for (let i = 0; i < moves.length; i++) {
        // board + moves[i]
        board_added_move = board_status;
        board_added_move[moves[i]] = 'X';
        let new_score = minimax(board_added_move, 'O')[0];
        if (value < new_score) {
          best_move = moves[i];
        }
        value = Math.max(value, new_score);

      }
      return [value, best_move]
    }

    else {
      let value = 2;
      best_move = moves[0];
      for (let i = 0; i < moves.length; i++) {
        board_added_move = board_status;
        board_added_move[moves[i]] = 'O';

        let new_score = minimax(board_added_move, 'X')[0];

        if (value > new_score) {
          best_move = moves[i];
        }
        value = Math.min(value, new_score);
      }
      return [value, best_move]
    }

  }


  return {}


})()
