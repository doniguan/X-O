let win = false
//флаг для проверки выполнения условия победы
let firstMoveIsHuman = false
//проверка очерёдности хода
let cells = []
//клетки, 9 штук, внутри свойств заполнено/незаполнено

onload = function () {
  const random = Math.floor(Math.random() * 2) + 1
  if (random === 1) {
    firstMoveIsHuman = true
  }

  while (!win) {
    move()
  }
}

move = function () {
  if (firstMoveIsHuman) {
    humanMove
  } else {
    computerMove
  }

  if (winCheck()) {
    winShowing()
  }

  firstMoveIsHuman = !firstMoveIsHuman;
}

computerMove = function () {
  alert("computer move")
}

humanMove = function () {
  alert("human move")
}

winCheck = function () {
  return win
}

winShowing = function () {}