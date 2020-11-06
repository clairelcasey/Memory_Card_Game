"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

let card1 = null;
let card2 = null;
let numMatchesFound = 0;
let waitingShowingMatch = false;
const colors = shuffle(COLORS);

createCards(colors);


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
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(color);
    cardDiv.addEventListener("click", handleCardClick);
    gameBoard.append(cardDiv);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.classList.add("flipped");
  card.style.backgroundColor = card.classList[0];
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.classList.remove("flipped");
  card.style.backgroundColor = "";
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // if clicking during wait period after a successful match, ignore click
  if (waitingShowingMatch) return;

  const currentCard = evt.target;

  // can't flip if this card is already flipped
  if (currentCard.classList.contains("flipped")) return;

  // flipping first card: show it and return so user can click second
  if (!card1) {
    card1 = currentCard;
    flipCard(card1);
    return;
  }

  // flipping second card:
  card2 = currentCard;
  flipCard(card2);

  if (card1.className === card2.className) {
    // match found: ensure cards can't be flipped & clear choices so user can
    // start flipping new cards
    numMatchesFound += 2;
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    card1 = null;
    card2 = null;
  } else {
    // match found: keep them facing-up for a while and then flip them down and
    // reset so user can start flipping new cards
    waitingShowingMatch = true;
    setTimeout(function unFlipAfterAPause() {
      unFlipCard(card1);
      unFlipCard(card2);
      card1 = null;
      card2 = null;
      waitingShowingMatch = false;
    }, FOUND_MATCH_WAIT_MSECS);
  }

  if (numMatchesFound === colors.length) alert("game over!");
}