
// creating module for our gameBoard to practice
const gameBoard = (() => {
  var board =
  ["X", "O", "",
    "", "", "",
    "", "O", ""];

  // front functionality of gameboard


  // gameboard needs to check if move is possible
  function writeEntry(markType, i) {
    if (board[i] == "") {
    board[i] = markType; }
  }


  const boardElement = document.querySelector(".board");

  function frontEndTouch(markType) {
    for (let item of boardElement.children) {
      // var datapoint = e.target.getAttribute('data')
      item.addEventListener('click', (e) => console.log(writeEntry(markType, e.target.getAttribute('data'))))
    };
  }


  return { board: board, frontEndTouch: frontEndTouch };
})();

// const gameBoardFront = ( () => {
//   const boardElement = document.querySelector(".board");

//   boardElement.forEach(addEventListener('click',(e) => console.log(e)));


// }
// )();

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

  return {moveOnBoard}
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

})();



displayController.updateBoardElement();
