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


// PLAYER FACTORY FINCTION
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
          best_move = minimax(current_board, player.markType)[1];

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

    function printResults() {
      const resultElement = document.createElement('div');
      resultElement.setAttribute('class', 'result-display');
      resultElement.textContent = 'GAME OVER SOMEONE WON';
      bodyElement.appendChild(resultElement);
    }

    function gameStartPanelOpen() {

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


      startButton.addEventListener('click', gameStartPanelClose);

      this.style.backgroundColor = 'grey';

    }

    function gameStartPanelClose() {
      newGame();
      gameBoard.frontEndTouch();
      const gamePanelElement = document.querySelector('.panel');
      playerVsPlayerButton.removeEventListener('click', gameStartPanelOpen);
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

      function featureNotSupportedPanelOpen() {

        const gamePanelElement = document.createElement('div');
        gamePanelElement.setAttribute('class', 'panel');
        const gameButtonsElement = document.createElement('div');
        gameButtonsElement.setAttribute('class', 'game-buttons');

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.setAttribute('class', 'cancel');

        const boardContent = document.querySelector('.board-content');
        gamePanelElement.textContent = 'This feature is not yet supported';
        boardContent.appendChild(gamePanelElement);
        gameButtonsElement.appendChild(cancelButton);
        gamePanelElement.appendChild(gameButtonsElement);

        cancelButton.addEventListener('click', featureNotSupportedPanelClose);

        playerVsPlayerButton.addEventListener('click', gameStartPanelOpen);

        playerVsPlayerButton.style.backgroundColor = 'black';
        this.style.backgroundColor = 'grey';

      }

      function featureNotSupportedPanelClose() {
        const panelElement = document.querySelector('.panel');
        panelElement.remove();

        aiVsPlayerButton.style.backgroundColor = 'black';

        // just make sure when we do this, there is no way of starting a new game.
        for (let item of boardElement.children) {

          item.removeEventListener('click', gameBoard.writeEntry);

        };

        newGame();
        gameBoard.frontEndTouch_ai();
      }


    playerVsPlayerButton.addEventListener('click', gameStartPanelOpen);

    aiVsPlayerButton.addEventListener('click', featureNotSupportedPanelOpen);

    return {
      updateBoardElement, printResults, gameOverPanelOpen, boardElement};

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
      value = -2;
      best_move = moves[0];
      for (i = 0; i < moves.length; i++) {
        // board + moves[i]
        board_added_move = board_status;
        board_added_move[moves[i]] = 'X';
        value = Math.max(value, minimax(board_added_move, 'O')[0]);
        if (value < minimax(board_added_move, 'O')[0]) {
          best_move = moves[i];
        }
      }
    }

    else {
      value = 2
      for (i = 0; i < moves.length; i++) {
        best_move = moves[0];
        board_added_move = board_status;
        board_added_move[moves[i]] = 'O';
        value = Math.min(value, minimax(board_added_move, 'X')[0]);
        if (value > minimax(board_added_move, 'O')[0]) {
          best_move = moves[i];
        }
      }
    }
    return [value, best_move]
  }




  return {}


})()
