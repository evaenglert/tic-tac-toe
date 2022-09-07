
// creating module for our gameBoard to practice
const gameBoard = (() => {
  var board =
  ["", "", "",
    "", "", "",
    "", "", ""];

  // front functionality of gameboard


  // gameboard needs to check if move is possible
  function writeEntry(markType, i) {
    if (board[i] == "") {
    board[i] = markType; }

    // once I have made a new Entry, I will make sure to let displayController know that display
    // needs to be updated
    displayController.updateBoardElement();
  }


  const boardElement = document.querySelector(".board");

  function frontEndTouch(player) {
    for (let item of boardElement.children) {
      // var datapoint = e.target.getAttribute('data')
      item.addEventListener('click', (e) => console.log(writeEntry(player.markType, e.target.getAttribute('data') -1)))
    };
  }


  return { board: board, frontEndTouch: frontEndTouch };
})();


// this will be a factory function as we will have multiple players.
const Player = (markType) => {
// player has property points
// player has property that tells mark type
// player can modify gameBoard

  function moveOnBoard(i) {
  // let the gameBoard object know that it is my turn to make a move
  // gameBoard.dosomething()
    gameBoard.writeEntry(markType, i);
    // WILL NEED TO MOVE THIS EVENTUALLY!!!!
    displayController.updateBoardElement();
  }

  return {markType}
};

// another module for displaying the board
const displayController = (() => {
  const boardElement = document.querySelector(".board");

  function updateBoardElement() {
    console.log(boardElement);


  for (var i=0; i < boardElement.children.length; i++) {
    boardElement.children[i].textContent = gameBoard.board[i];
  }
  }

  return { updateBoardElement, boardElement};

})();

// module for controlling the flow of the game
const flowControl = (() => {
// I will have two players, whoever plays first will have markType X, second one markType O
player1 = Player('X');
player2 = Player('O');

// We are starting the game! I will let gameBoard know that currently player 1 has access to the board.
gameBoard.frontEndTouch(player1);

})();


player1 = Player('X');
player2 = Player('O');

// We are starting the game! I will let gameBoard know that currently player 1 has access to the board.
gameBoard.frontEndTouch(player1);
