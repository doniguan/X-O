let firstMoveIsHuman = false
let winnerFound = false
let cells = []
let humanIcon = 'O'
let computerIcon = 'X'
let resultMessage
let again

onload = function () {
  resultMessage = document.getElementById('win_message')
  again = document.getElementById('again')

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

  again.addEventListener('click', function () {
    resultMessage.style.display = 'none'
    again.style.display = 'none'
    clearTable()
    humanIcon = 'O'
    computerIcon = 'X'
    firstMoveIsHuman = false
    const random = Math.floor(Math.random() * 2) + 1
    if (random === 1) {
      firstMoveIsHuman = true
      humanIcon = 'X'
      computerIcon = 'O'
    }

    if (!firstMoveIsHuman) {
      computerMove()
    }
  })

  if (!firstMoveIsHuman) {
    computerMove()
  }
}

function humanMove (item) {
  if (item.hasChildNodes()) {
    return false
  }
  item.innerHTML = humanIcon
  item.style.color = 'green'
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

function computerMove () {
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

function checkFreeSpace () {
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].hasChildNodes()) {
      return true
    }
  }
  return false
}

function winnerChk (item) {
  if (item.innerHTML === humanIcon) {
    return true
  } else {
    return false
  }
}

function winChk () {
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

function winShowing () {
  resultMessage.style.display = 'block'
  again.style.display = 'block'
  if (winnerIsHuman) {
    resultMessage.innerHTML = 'You won!'
    resultMessage.style.color = 'green'
  } else {
    resultMessage.innerHTML = 'You lose.'
    resultMessage.style.color = 'red'
  }
}

function drawShowing () {
  resultMessage.innerHTML = 'Draw.'
  resultMessage.style.color = '#369'
  resultMessage.style.display = 'block'
  again.style.display = 'block'
}

function clearTable () {
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = ''
    cells[i].style.color = 'red'
  }
}
