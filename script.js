// Please implement exercise logic here
// create the board container element and put it on the screen
// keep data about the game in a 2-D array
// GLOBAL VAR
let board = [];
let boardSize = 0;
let sizeInput
let winInput
let blockRow = 0;
let blockColumn = 0;
let compBlock = false;
let compBlockWhere = ''
let compBlockedHorizontal = false;
let compBlockedVertical = true;
let compRowPick;
let compColumnPick;
let isCompFirstTurn = true
let isFirstGame = true
let clicks = 0;
// the element that contains the rows and squares
let boardElement;
// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;
// current player global starts at X
let currentPlayer = 'X';
let sameSquareChecksRequired = 0;
let currentSameSquareChecks = 0;


const playerWinMSG = document.createElement ('h1')
playerWinMSG.innerText = `That's a straight line! You Win!`
const compWinMSG = document.createElement ('h1')
compWinMSG.innerText = `The computer has won... Too bad! `
const drawMSG = document.createElement ('h1')
drawMSG.innerText = `Its a draw!`
const instructions = document.querySelector ('#header')
const submitButton = document.createElement('button')

//Generate a random number depending on the board length
const randomInteger = () => {
  return Math.floor (Math.random() * board.length)
}

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);
  
      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

const clearBoard = (board) => {
 for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board.length; j += 1) {
      board[i][j] = ''
    }
  }
  }

const checkIfBoardFull = (board) => {
  console.log('please run')
for (let i = 0; i < board.length; i += 1) {
  for (let j = 0; j < board.length; j += 1) {
    if (board[i][j] === ''){
      return false
    }
  }
}
return true
}

const squareClick = (row, column) => {
  console.log('coordinates', row, column);

  // see if the clicked square has been clicked on before
  if (board[row][column] === '') {
    // alter the data array, set it to the current player
    board[row][column] = currentPlayer

    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
    if (checkWin(board) === true) {
      // game over
      console.log('GameOver')
      document.body.appendChild(playerWinMSG)
    setTimeout(() => { document.body.removeChild (boardContainer)
      document.body.removeChild(playerWinMSG)
    clearBoard(board)
      initGame()
    },1000)
    } else {
      togglePlayer();
    }
  }
   if (checkIfBoardFull(board)) {
    document.body.appendChild(drawMSG)
    setTimeout(() => { document.body.removeChild (boardContainer)
        document.body.removeChild(drawMSG)
    clearBoard(board)
      initGame()
    },1000)
  }
  else {
  if (currentPlayer === "O") {
    compTurn(board)
  }
}
};

//computer turn
const compTurn = (board) => {
  // if Comp needs to block, it is the highest priority
  if (compBlock) {
    console.log ("BLOCK!")
    compBlockFunc(board)
    compBlock === false
  }
  // if first turn, then comp will choose a random square
  else if (isCompFirstTurn) {
  isCompFirstTurn = false
  compRandPick(board)
  }
  //if not first turn or needing to block player win, comp will try to path a victory
  else {
    compPathing(board)
    buildBoard(board)
  }
  // comp win
   if (checkWin(board) === true) {
     document.body.appendChild(compWinMSG)
       setTimeout(() => { document.body.removeChild (boardContainer)
        document.body.removeChild(compWinMSG)
    clearBoard(board)
      initGame()
    },1000)
  }
   if (checkIfBoardFull(board)) {
    document.body.appendChild(drawMSG)
    setTimeout(() => { document.body.removeChild (boardContainer)
        document.body.removeChild(drawMSG)
    clearBoard(board)
      initGame()
    },1000)
  }
  togglePlayer()
  buildBoard(board)
}


const compBlockFunc = (board) => {
  //comp block depending on which way player is going to win
      if (compBlockWhere === 'horizontal') {
        for(let j = 0; j <board.length; j+=1) {
          if (board[blockRow][j] === '') {
            board[blockRow][j] = currentPlayer
            buildBoard(board)
            return
          }
        }
      }
      if (compBlockWhere === 'vertical') {
        for(let i = 0; i <board.length; i+=1) {
          if (board[i][blockColumn] === '') {
            board[i][blockColumn] = currentPlayer
            buildBoard(board)
            return
          }
        }
      }
      if (compBlockWhere === 'diagonalRight') {
        for (let i = 0; i < board.length; i+=1) {
          if (board[i][i]=== ''){
            console.log ("1")
            board[i][i] = currentPlayer
            buildBoard(board)
            return
          }
        }
    }
        if (compBlockWhere === 'diagonalLeft') {
          for (let i= 0; i<board.length; i+=1){
            if (board[i][board.length - 1 - i] === ''){
              board[i][board.length-1-i] = currentPlayer
            buildBoard(board)
            return
            }
          }
      }
        compRandPick(board)
    }

const compRandPick = (board) => {
      compRowPick = randomInteger()
  compColumnPick = randomInteger()
  console.log (`${compRowPick}  ${compColumnPick}`)
    while (board[compRowPick][compColumnPick] != '') {
      compRowPick = randomInteger()
      compColumnPick = randomInteger()
    }
    board[compRowPick][compColumnPick] = currentPlayer
}

const compPathing = (board) => {
  compBlockedVertical = false
  compBlockedHorizontal = false
  // comp must evaluate if the horizontal and vertical paths are blocked
  compBlockCheck(board)
  // must eval if comp picked a pos where it is diagonal too. Eval if it is blocked too.
  console.log (`${compRowPick} ${compColumnPick}`)
}

const compBlockCheck = (board) => {
  //vertical path check, column remains constant
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][compColumnPick] === 'X') {
      console.log('blocked vertically')
      compBlockedVertical = true
    }
  }
  //horizontal path check, row remains constant
  for (let j = 0; j <board.length; j +=1) {
    if (board[compRowPick][j] === 'X') {
      console.log('blocked hori')
      compBlockedHorizontal = true
    }
  }
  // if both paths are blocked, pick random spot
  if (compBlockedHorizontal && compBlockedVertical) {
    let prevRowPick = compRowPick
    let prevColumnPick = compColumnPick
    compRandPick(board)
    while (compRowPick === prevRowPick) {
      compRowPick = randomInteger()
    }
    while (compColumnPick === prevColumnPick) {
      compColumnPick = randomInteger()
    }
  }
  // change row
  else if (compBlockedHorizontal && !compBlockedVertical) {
    compRowPick = randomInteger()
    while (board[compRowPick][compColumnPick] != ''){
      compRowPick = randomInteger()
    }
  }
  // change column if either blocked vertically or not blocked at all
  else {
    compColumnPick = randomInteger()
    while (board[compRowPick][compColumnPick] != ''){
      compColumnPick = randomInteger()
    }
  }
  board[compRowPick][compColumnPick] = currentPlayer
}

const checkWin = (board) => {
  currentSameSquareChecks = 0
  // check every position
  // there is a conditional for all 15 win conditions
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board.length; j += 1) {
      // XXX
      if (board[i][j] === currentPlayer) {
       currentSameSquareChecks += 1
       console.log(currentPlayer + currentSameSquareChecks)
      if (currentSameSquareChecks === sameSquareChecksRequired) {
        return true
      }
      else if (sameSquareChecksRequired - currentSameSquareChecks === 1) {
        blockRow = i
        compBlock = true;
        compBlockWhere = 'horizontal'
      }
    }
      }
      currentSameSquareChecks = 0
    }
  for (let j = 0; j < board.length; j += 1){
  for (let i = 0; i < board.length; i += 1) {
    // X
    // X
    // X
      if (board[i][j] === currentPlayer) {
       currentSameSquareChecks +=1
      if (currentSameSquareChecks === sameSquareChecksRequired) {
        return true
      }
      else if (sameSquareChecksRequired - currentSameSquareChecks === 1) {
        blockColumn = j
        compBlock = true;
        compBlockWhere = 'vertical'
      }
    }
  }
  currentSameSquareChecks = 0
}
    //diagonal to bottom left
    currentSameSquareChecks = 0
    for (let i = 0; i <board.length; i+=1) {
      if (board[i][i] === currentPlayer) {
        currentSameSquareChecks += 1
        if (currentSameSquareChecks === sameSquareChecksRequired) {
          return true
        }
        else if (sameSquareChecksRequired - currentSameSquareChecks === 1) {
        compBlock = true;
        compBlockWhere = 'diagonalRight'
      }
      }
    }
    //Diagonal to bottom right
    currentSameSquareChecks = 0
    for (let i = 0; i <board.length; i+=1) {
      if (board[i][board.length- 1 - i] === currentPlayer) {
        currentSameSquareChecks += 1
        if (currentSameSquareChecks === sameSquareChecksRequired) {
          return true
        }
        else if (sameSquareChecksRequired - currentSameSquareChecks === 1) {
        compBlock = true;
        compBlockWhere = 'diagonalLeft'
      }
      }
    }
};

const initGame = () => {
  if (Number(winInput.value) > Number(sizeInput.value)) {
    instructions.innerText = `The number of rows needed to win cannot be greater than the amount of rows!`
    setTimeout (() => {
      document.body.removeChild(sizeInput)
      document.body.removeChild(winInput)
      document.body.removeChild(submitButton)
      inputSize()
    }, 2000)
    return
  }
  if (isFirstGame) {
      document.body.removeChild(sizeInput)
      document.body.removeChild(winInput)
      document.body.removeChild(submitButton)
  }
  isFirstGame = false
  isCompFirstTurn
  compRowPick = ''
  compColumnPick = ''
  clearBoard(board)
  board = []
    boardSize = sizeInput.value
    sameSquareChecksRequired = Number(winInput.value)
  for (let i = 0; i < boardSize; i+=1) {
    board.push([])
    for (let j = 0; j <boardSize; j+=1) {
      board[i].push("")
    }
  }
  currentPlayer = "X"
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);
  // build the board - right now it's empty
  buildBoard(board);
};

const inputSize = () => {
  instructions.innerText = "First box is the size of the grid, second box is how many in a row needed to win!"
  sizeInput = document.createElement('input')
  sizeInput.type = 'number'
  sizeInput.placeholder = 'Size of grid'
  winInput = document.createElement('input')
  winInput.type = 'number'
  winInput.placeholder = 'Rows needed to win'
  submitButton.innerText = 'Submit'
  document.body.appendChild(sizeInput)
  document.body.appendChild(winInput)
  document.body.appendChild(submitButton)
  submitButton.addEventListener('click', 
  initGame)
}
inputSize()