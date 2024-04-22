//дописать показ предложения играть снова
//дописать возможность повторной игры

let firstMoveIsHuman = false
let winnerFound = false
let cells = []
let humanIcon = 'O'
let computerIcon = 'X'
let resultMessage

onload = function () {
  resultMessage = document.getElementById('win_message')

  const random = Math.floor(Math.random() * 2) + 1
  if (random === 1) {
    firstMoveIsHuman = true
    humanIcon = 'X'
    computerIcon = 'O'
  }

  cells = document.getElementsByClassName('cell')

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function () {
      humanMove(this)
    })
  }

  if (!firstMoveIsHuman) {
    computerMove()
  }
}

humanMove = function (item) {
  if (item.hasChildNodes()) {
    return false
  }
  item.innerHTML = humanIcon
  winnerFound = winChk()

  if (!winnerFound) {
    computerMove()
    winnerFound = winChk()
    if (!winnerFound) {
      if (!checkFreeSpace()) {
        drawShowing()
      }
    } else {
      winShowing()
    }
  } else {
    winShowing()
  }
}

computerMove = function () {
  while (true) {
    if (checkFreeSpace()) {
      const random = Math.floor(Math.random() * 9)
      if (!cells[random].hasChildNodes()) {
        cells[random].innerHTML = computerIcon
        return true
      }
    } else {
      drawShowing()
      return false
    }
  }
}

checkFreeSpace = function () {
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].hasChildNodes()) {
      return true
    }
  }
  return false
}

winnerChk = function (item) {
  if (item.innerHTML === humanIcon) {
    return true
  } else {
    return false
  }
}

winChk = function () {
  if (
    ((cells[0].innerHTML === cells[4].innerHTML &&
      cells[4].innerHTML === cells[8].innerHTML) ||
      (cells[2].innerHTML === cells[4].innerHTML &&
        cells[4].innerHTML === cells[6].innerHTML) ||
      (cells[3].innerHTML === cells[4].innerHTML &&
        cells[4].innerHTML === cells[5].innerHTML) ||
      (cells[1].innerHTML === cells[4].innerHTML &&
        cells[4].innerHTML === cells[7].innerHTML)) &&
    cells[4].hasChildNodes()
  ) {
    winnerIsHuman = winnerChk(cells[4])
    winnerFound = true
    return true
  } else {
    if (
      ((cells[0].innerHTML === cells[1].innerHTML &&
        cells[0].innerHTML === cells[2].innerHTML) ||
        (cells[0].innerHTML === cells[3].innerHTML &&
          cells[0].innerHTML === cells[6].innerHTML)) &&
      cells[0].hasChildNodes()
    ) {
      winnerIsHuman = winnerChk(cells[0])
      winnerFound = true
      return true
    } else {
      if (
        ((cells[6].innerHTML === cells[7].innerHTML &&
          cells[8].innerHTML === cells[7].innerHTML) ||
          (cells[2].innerHTML === cells[5].innerHTML &&
            cells[5].innerHTML === cells[8].innerHTML)) &&
        cells[8].hasChildNodes()
      ) {
        winnerIsHuman = winnerChk(cells[8])
        winnerFound = true
        return true
      } else return false
    }
  }
}

winShowing = function () {
  resultMessage.style.display = 'block'

  if (winnerIsHuman) {
    resultMessage.innerHTML = 'Вы выиграли!'
    resultMessage.style.color = 'green'
  } else {
    resultMessage.innerHTML = 'Вы проиграли.'
    resultMessage.style.color = 'red'
  }
}

drawShowing = function () {
  resultMessage.innerHTML = 'Ничья :|'
  resultMessage.style.color = 'blue'
  resultMessage.style.display = 'block'
}