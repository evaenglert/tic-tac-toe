// this will be a factory function as we will have multiple players.
const Player = (markType) => {
  return { markType }
};

player1 = Player('X');
player2 = Player('O');


// creating module for our gameBoard to practice
const gameBoard = (() => {
  var board =
  ["", "", "",
    "", "", "",
    "", "", ""];

  // front functionality of gameboard
  var player = player1;

  // gameboard needs to check if move is possible
  function writeEntry(i) {
    if (board[i] == "") {
      board[i] = player.markType;
      displayController.updateBoardElement();

      if (player.markType == player1.markType) {
        player = player2;
      }
      else {player = player1;}



    }

  }


  const boardElement = document.querySelector(".board");

  function frontEndTouch() {
    // console.log(gameBoarplayer.markType);

    for (let item of boardElement.children) {

      item.addEventListener('click', (e) => writeEntry(e.target.getAttribute('data')-1));

    };
  }


  return { board: board, frontEndTouch: frontEndTouch, player: player};
})();


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

return {}
})();


gameBoard.frontEndTouch();
