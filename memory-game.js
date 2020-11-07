"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
console.log(colors, 'after shuffled');
const startButton = document.getElementById('startButton');
startButton.addEventListener("click", function(evt) {
  createCards(colors);
  startButton.style.display = "none";
});

let cardsFlipped = 0;
let card1 = null;
let card2 = null; 

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
    // colorElem.addEventListener('click', handleCardClick);
    gameBoard.appendChild(colorElem);
  }
  gameBoard.addEventListener("click", function(evt) {
      handleCardClick(evt);
      console.log('event', evt)
  });
}

/** Flip a card face-up. */

function flipCard(card) {
  // console.log(card.classList);
  // set card background to color picked by generator
  card.style.backgroundColor = card.classList[0];
  // add flipped cards to trial class
  card.classList.add("flipped");

}

/** Flip a card face-down. */

function unFlipCard(card) {
  // console.log('unflip card called');
  //remove currentTrail class
  // ******* would this be better placed somewhere else (ie. line 73) ****** 
  card.classList.remove('flipped');
  // console.log(card.classList);
  //remove backgroundColor style
  card.style.backgroundColor = 'initial';
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // console.log(evt.target);

  if (card1 && card2) return

  if (evt.target === card1 || evt.target === card2) return

  if (!(card1)) {
    card1 = evt.target;
    console.log(evt.target, 'card1');
    flipCard(card1);
    return
  }

  card2 = evt.target;
  flipCard(card2);
  console.log(evt.target, 'card2', card2.className);
  
  if (card1.className === card2.className) {
    card1.removeEventListener('click', handleCardClick);
    card2.removeEventListener('click', handleCardClick);
    card1 = null;
    card2 = null;
  }

  else {
    setTimeout(function(){
      unFlipCard(card1);
      unFlipCard(card2);
      card1 = null;
      card2 = null;
    }, FOUND_MATCH_WAIT_MSECS);
    
  }
}
