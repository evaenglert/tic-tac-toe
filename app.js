
// creating module for our gameBoard to practice
const gameBoard = (() => {
  var board =
  ["", "", "",
    "", "", "",
    "", "", ""];

  // front functionality of gameboard


  // gameboard needs to check if move is possible
  function writeEntry(player, i) {
    if (board[i] == "") {
      board[i] = player.markType;
      displayController.updateBoardElement();
      // if (player === player1) {
      //   flowControl.previousPlayer = player1;
      // }
      // else { flowControl.previousPlayer = player2}
      flowControl.switchPlayer(player);


    }

    // once I have made a new Entry, I will make sure to let displayController know that display
    // needs to be updated

    // after this is done, also let the control flow know that it is now the other player's turn

  }


  const boardElement = document.querySelector(".board");

  function frontEndTouch(player) {
    console.log("This is what goes into fronEndTouch");
    console.log(player.markType);
    console.log("This is what is stored in previousPlayer");
    console.log(flowControl.previousPlayer);
    for (let item of boardElement.children) {
      // var datapoint = e.target.getAttribute('data')

      if (player === player1) {
        console.log("If is called");
        item.removeEventListener('click', (e) => writeEntry(player2, e.target.getAttribute('data') - 1))
        item.addEventListener('click', (e) => writeEntry(player1, e.target.getAttribute('data') - 1))

      }
      else {
        console.log("Else is called");
        item.removeEventListener('click', (e) => writeEntry(player1, e.target.getAttribute('data') - 1))
        item.addEventListener('click', (e) => writeEntry(player2, e.target.getAttribute('data') - 1))

      }
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

var previousPlayer;

// We are starting the game! I will let gameBoard know that currently player 1 has access to the board.

function switchPlayer(currentPlayer) {

  if (currentPlayer === player1) {
    console.log("Player 2 is coming!!!!!!")
    gameBoard.frontEndTouch(player2);

  }
  else {
    console.log("Player 1 is coming!!!!!")
    gameBoard.frontEndTouch(player1);

  }
}

return {previousPlayer, switchPlayer}
})();


player1 = Player('X');
player2 = Player('O');

// We are starting the game! I will let gameBoard know that currently player 1 has access to the board.
gameBoard.frontEndTouch(player1);
