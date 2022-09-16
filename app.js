// this will be a factory function as we will have multiple players.
//PROBLEM: board is editable from outside

const flowControl = (() => {


  // Method to call when someone wins or there is no more moves to make
  function gameEnds() {
    displayController.printResults();
  }

  function newGame() {
    gameBoard.board =
      ["", "", "",
        "", "", "",
        "", "", ""];
    displayController.updateBoardElement();
  }



  const Player = (markType) => {
    return { markType }
  };

  const player1 = Player('X');
  const player2 = Player('O');


  // creating module for our gameBoard to practice
  const gameBoard = (() => {
    var board =
      ["", "", "",
        "", "", "",
        "", "", ""];

    // front functionality of gameboard
    var player = player1;

    function checkBoard() {
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
        possibleWinner += checkThreeNumbers(board.slice(i*3, i*3 + 3));

        // console.log(board.slice(i, i + 3));

      }
      //check columns
      for (let i=0; i<3; i++) {
        possibleWinner += checkThreeNumbers([board[0*3+i], board[1*3+i], board[2*3+i]]);
      }

      //check two diagonals
      possibleWinner += checkThreeNumbers([board[0], board[4], board[8]]);
      possibleWinner += checkThreeNumbers([board[2], board[4], board[6]]);


      return possibleWinner
    }

    // gameboard needs to check if move is possible
    function writeEntry(i) {
      if (board[i] == "") {
        board[i] = player.markType;
        displayController.updateBoardElement();
        possibleWinner = checkBoard();

        if (possibleWinner != '') {
          gameEnds();
        }

        if (player.markType == player1.markType) {
          player = player2;
        }
        else { player = player1; }

      }

    }


    const boardElement = document.querySelector(".board");

    function frontEndTouch() {
      // console.log(gameBoarplayer.markType);

      for (let item of boardElement.children) {

        item.addEventListener('click', (e) => writeEntry(e.target.getAttribute('data') - 1));

      };
    }


    return { board: board, frontEndTouch: frontEndTouch };
  })();



  // another module for displaying the board
  const displayController = (() => {
    const boardElement = document.querySelector(".board");
    const bodyElement = document.querySelector('body');

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
      gamePanelElement.setAttribute('class', 'new-game-panel');
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

    }

  function gameStartPanelClose() {
    gameBoard.frontEndTouch();
    const gamePanelElement = document.querySelector('.new-game-panel');
    // startButton.removeEventListener('click', gameStartPanelClose);
    gamePanelElement.remove();

  }


    playerVsPlayerButton = document.querySelector('.two-players-button');
    playerVsPlayerButton.addEventListener('click', gameStartPanelOpen);

    return { updateBoardElement, printResults, boardElement };

  })();






  return {}


})()
