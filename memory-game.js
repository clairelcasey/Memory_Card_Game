"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
console.log(colors, 'after shuffled');
createCards(colors);

let cardsFlipped = 0;

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");


  for (let color of colors) {
    // missing code here ...
    const colorElem = document.createElement('div');
    colorElem.classList.add(color);

    gameBoard.appendChild(colorElem);

    colorElem.addEventListener('click', function(evt) {
      handleCardClick(evt);
    });
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  // console.log(card.classList);
  card.style.backgroundColor = card.classList[0];
  card.classList.add("currentTrial");
  let testForMatchArray = document.querySelectorAll('.currentTrial');
  console.log("test for match array", testForMatchArray)
  // console.log("test for string of color", testForMatchArray[0].classList[0])
  if (testForMatchArray.length === 2) {
    console.log(testForMatchArray[0].classList[0],testForMatchArray[1].classList[0])
    if (testForMatchArray[0].classList[0] !== testForMatchArray[1].classList[0]) {
      //ASK ABOUT SETTIMEOUT SETUP
        setTimeout(function() {
          unFlipCard(testForMatchArray[0])
        }, FOUND_MATCH_WAIT_MSECS);
        setTimeout(function() {
          unFlipCard(testForMatchArray[1])
          cardsFlipped = 0;
          console.log(cardsFlipped, 'cardsFlippedSet Timeout');
        }, FOUND_MATCH_WAIT_MSECS);
    }
    else {
      testForMatchArray[0].classList.remove('currentTrial');
      testForMatchArray[1].classList.remove('currentTrial');
      cardsFlipped = 0;
      console.log(cardsFlipped, 'cardsFlipped for a match');
    }
  }
  // cardsFlipped = 0;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  //remove currentTrail class
  //remove backgroundColor style
  // ... you need to write this ...
  console.log('unflip card called');
  card.classList.remove('currentTrial');
  console.log(card.classList);
  card.style.backgroundColor = 'initial';
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  // console.log(evt.target);
  console.log('clicked');
  
  cardsFlipped++;
  if (cardsFlipped < 3) {
    flipCard(evt.target)
    console.log(cardsFlipped, 'cardsFlipped in if statement');

  }
}
