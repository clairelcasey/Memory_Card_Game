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

    // ***** could this be an instance to use target and only have one eventlistener for all tiles? ******
    colorElem.addEventListener('click', function(evt) {
      handleCardClick(evt);
    });
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // console.log(card.classList);
  // set card background to color picked by generator
  card.style.backgroundColor = card.classList[0];
  // add flipped cards to trial class
  card.classList.add("currentTrial");
  // create array to store two cards at a time for comparison
  let testForMatchArray = document.querySelectorAll('.currentTrial');
  // console.log("test for match array", testForMatchArray)
  // console.log("test for string of color", testForMatchArray[0].classList[0])
  if (testForMatchArray.length === 2) {
    // console.log(testForMatchArray[0].classList[0],testForMatchArray[1].classList[0])
    if (testForMatchArray[0].classList[0] !== testForMatchArray[1].classList[0]) { // classList.contains('currentTrial')
      //****** ASK ABOUT SETTIMEOUT SETUP *******
      // when cards in array don't match, call unflip at determined timeout
      // reset cardsFlipped
        setTimeout(function() {
          unFlipCard(testForMatchArray[0])
          unFlipCard(testForMatchArray[1])
          cardsFlipped = 0;
        }, FOUND_MATCH_WAIT_MSECS);
          // console.log(cardsFlipped, 'cardsFlippedSet Timeout');
    }
    // if cards do match remove them from trial class to free up space for next cards
    // reset cardsFlipped
    else {
      testForMatchArray[0].classList.remove('currentTrial');
      testForMatchArray[1].classList.remove('currentTrial');
      cardsFlipped = 0;
      // console.log(cardsFlipped, 'cardsFlipped for a match');
    }
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // console.log('unflip card called');
  //remove currentTrail class
  // ******* would this be better placed somewhere else (ie. line 73) ****** 
  card.classList.remove('currentTrial');
  // console.log(card.classList);
  //remove backgroundColor style
  card.style.backgroundColor = 'initial';
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // console.log(evt.target);
  if (!evt.target.classList.contains('currentTrial')) {
    // console.log('clicked');
    cardsFlipped++;
    if (cardsFlipped < 3) {
      flipCard(evt.target)
      // console.log(cardsFlipped, 'cardsFlipped in if statement');
    }
  }
}
