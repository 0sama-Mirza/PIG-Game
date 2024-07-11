'use strict';

function DisplayDice(randomNumber) {
  switch (randomNumber) {
    case 1:
      Dice.src = 'images/dice-1.png';
      break;
    case 2:
      Dice.src = 'images/dice-2.png';
      break;
    case 3:
      Dice.src = 'images/dice-3.png';
      break;
    case 4:
      Dice.src = 'images/dice-4.png';
      break;
    case 5:
      Dice.src = 'images/dice-5.png';
      break;
    case 6:
      Dice.src = 'images/dice-6.png';
      break;
    default:
      Dice.src = 'images/Gemini_Generated_Image_eb111web111web11.jpg';
      break;
  }
  Dice.classList.remove('hidden');
}

function DisplayTurn(turn) {
  const player1 = document.querySelector('.player--0');
  const player2 = document.querySelector('.player--1');
  if (player1.classList.contains('player--winner')) {
    player1.classList.remove('player--winner');
  } else if (player2.classList.contains('player--winner')) {
    player2.classList.remove('player--winner');
  }
  if (turn === true && !player1.classList.contains('player--active')) {
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  } else if (turn === false && !player2.classList.contains('player--active')) {
    player2.classList.add('player--active');
    player1.classList.remove('player--active');
  }
}

function win(P1Score, P2Score, Dice) {
  let END_GAME = false;
  const player1 = document.querySelector('.player--0');
  const player2 = document.querySelector('.player--1');
  if (P1Score >= MAX_POINT) {
    player1.classList.add('player--winner');
    Dice.src = 'images/Player1Wins3.jpg';
    END_GAME = true;
  } else if (P2Score >= MAX_POINT) {
    player2.classList.add('player--winner');
    Dice.src = 'images/Player2Wins.jpg';
    END_GAME = true;
  }
  if (END_GAME) {
    player1.classList.remove('player--active');
    player2.classList.remove('player--active');
  }
  //   Dice.classList.add('hidden');
  return END_GAME;
}

const MAX_POINT = 100;
let P1Score = 0;
let P2Score = 0;
let turn = true;
let tempScore = 0;

const btnRoll = document.querySelector('.btn--roll');
const tempP1 = document.querySelector('#current--0');
const tempP2 = document.querySelector('#current--1');
const btnHold = document.querySelector('.btn--hold');
const displayP1score = document.querySelector('#score--0');
const displayP2score = document.querySelector('#score--1');
const Dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');

btnRoll.addEventListener('click', function () {
  if (win(P1Score, P2Score, Dice)) return;
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  DisplayDice(randomNumber);
  if (!(randomNumber === 1)) {
    tempScore = tempScore + randomNumber;
  } else {
    tempScore = 0;
    if (turn === true) {
      tempP1.textContent = 0;
    } else {
      tempP2.textContent = 0;
    }
    turn = !turn;
  }
  if (turn === true) {
    tempP1.textContent = tempScore;
  } else {
    tempP2.textContent = tempScore;
  }
  DisplayTurn(turn);
});

btnHold.addEventListener('click', function () {
  if (turn === true) {
    P1Score = P1Score + tempScore;
    displayP1score.textContent = P1Score;
  } else {
    P2Score = P2Score + tempScore;
    displayP2score.textContent = P2Score;
  }
  tempScore = 0;
  tempP1.textContent = tempScore;
  tempP2.textContent = tempScore;
  if (win(P1Score, P2Score, Dice)) return;
  turn = !turn;
  DisplayTurn(turn);
  Dice.src = 'images/Gemini_Generated_Image_eb111web111web11.jpg';
});

btnNew.addEventListener('click', function () {
  P1Score = 0;
  P2Score = 0;
  turn = true;
  tempScore = 0;
  tempP1.textContent = 0;
  tempP2.textContent = 0;
  displayP1score.textContent = 0;
  displayP2score.textContent = 0;
  DisplayTurn(turn);
  DisplayDice();
});
