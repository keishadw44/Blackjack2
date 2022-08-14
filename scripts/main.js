
// const dealerHand = document.getElementById("dealer-hand");
// const playerHand = document.getElementById("player-hand");
let deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
let playerHand = [];
let playerPoints = 0;
let dealerHand = [];
let dealerPoints = 0;
let messages = document.getElementById("messages")

//event listeners
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.querySelector("#stand-button");

dealButton.addEventListener("click",dealCards);

hitButton.addEventListener("click",() => {
  hitMe();
  console.log("hi");
  }
);

standButton.addEventListener("click", () => {
  standLogic();
    console.log('stand');
  }
);

let playerHandContainer = document.getElementById('player-hand');
let dealerHandContainer = document.getElementById('dealer-hand')

//creating the deck using the arrays at the top of the page
function makeDeck (rank, suit) {

  const card = {
    rank: rank,
    suit: suit,
    image: rank > 1 || rank < 11 ? `./images/${rank}_of_${suit}.png` : null,
    pointValue: rank > 10 ? 10 : rank,
  };

  switch (card.rank) {
    case 1:
      card.rank = 'ace'; // card.rank accesses the card object and rank key
      card.image = `./images/ace_of_${suit}.png`
      break; // exits the code when the condition is met

    case 11:
      card.rank = 'jack';
      card.image = `./images/jack_of_${suit}.png`
      break; // exits the code when the condition is met

    case 12:
      card.rank = 'queen';
      card.image = `./images/queen_of_${suit}.png`
    break; // exits the code when the condition is met

    case 13:
      card.rank = 'king';
      card.image = `./images/king_of_${suit}.png`
    break; // exits the code when the condition is met
  
    default:
      break;
  };

  deck.push(card);
  
};
// build the deck
function buildSuits(suits, ranks) {

  for (let suit of suits) { // outter loop 1 time at a time - for a total of 4 times

    for (let rank of ranks) { // inner loop 13 times at a time - for a total of 52 times

      makeDeck(rank, suit);

    };
  };
  shuffleArray(deck);
}
//shuffle the deck
function shuffleArray(deck){
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  };
};

// Initial deal. 2 cards to each.

function dealCards(playerType) {
  dealerHand.length = 0;
  playerHand.length = 0;
  playerHandContainer.innerHTML = ``;
  dealerHandContainer.innerHTML = ``;
  playerPoints = 0;
  dealerPoints = 0;
  showPoints('player', playerPoints);
  showPoints('dealer', dealerPoints);

  messages.innerHTML = ``;
  buildSuits(suits, ranks);
  //deal four total cards one at a time to player and dealer

  for (let i = 0; i < 2; i++) {
    let playerTempCard = [], dealerTempCard = [];
    // push cards to player one at a time
    playerTempCard = deck.pop();
    if (playerTempCard.rank === 'ace') {
      playerTempCard.pointValue = 11;
    }
    playerHand.push(playerTempCard);
    playerHandContainer.innerHTML += `<img src=${playerHand[i].image} id=${playerHand[i].rank}_of_${playerHand[i].suit}>`;
    calculatePoints('player');
  

    dealerTempCard = deck.pop();
    if (dealerTempCard.rank === 'ace') {
      dealerTempCard.pointValue = 11;
    }
    dealerHand.push(dealerTempCard);
    dealerHandContainer.innerHTML += `<img src=${dealerHand[i].image} id=${dealerHand[i].rank}_of_${dealerHand[i].suit}>`;
    calculatePoints('dealer');
  }
  showPoints('player', playerPoints);
  showPoints('dealer', dealerPoints);
};

//count points
function calculatePoints(playerType) {
  if (playerType === 'player') {
    playerPoints = playerPoints + playerHand[playerHand.length - 1].pointValue;
  }
  else if (playerType === 'dealer') {
    dealerPoints = dealerPoints + dealerHand[dealerHand.length - 1].pointValue;
  }
};
//display points
function showPoints(playerType, points) {
  if (playerType === 'player') {
    let playerPointsUpdate = document.getElementById('player-points');
    playerPointsUpdate.innerText = `${points} points`;
  }
  else if (playerType === 'dealer') {
    let dealerPointsUpdate = document.getElementById('dealer-points');
    dealerPointsUpdate.innerText = `${points} points`;
  }
};
//hit me button function
function hitMe(playerType) {
    buildSuits(suits, ranks);
    //deal four total cards one at a time to player and dealer
  
    for (let i = 0; i < 1; i++) {
      let playerTempCard = [], dealerTempCard = [];
      // push cards to player one at a time
      playerTempCard = deck.pop();
      if (playerTempCard.rank === 'ace') {
        playerTempCard.pointValue = 11;
      }
      playerHand.push(playerTempCard);
      playerHandContainer.innerHTML += `<img src=${playerHand[i].image} id=${playerHand[i].rank}_of_${playerHand[i].suit}>`;
      calculatePoints('player');
    
  
      dealerTempCard = deck.pop();
      if (dealerTempCard.rank === 'ace') {
        dealerTempCard.pointValue = 11;
      }
      dealerHand.push(dealerTempCard);
      dealerHandContainer.innerHTML += `<img src=${dealerHand[i].image} id=${dealerHand[i].rank}_of_${dealerHand[i].suit}>`;
      calculatePoints('dealer');
    }
    showPoints('player', playerPoints);
    showPoints('dealer', dealerPoints);
    if (playerPoints > 21) {
      messages.innerHTML += `<h3>Player busted!</h3>`;
      showPoints('player', playerPoints);
    showPoints('dealer', dealerPoints);
    }
    else if (dealerPoints > 21) {
      messages.innerHTML  += `<h3>Dealer busted!</h3>`
      showPoints('player', playerPoints);
    showPoints('dealer', dealerPoints);
  };
  };



//stand button function
function standLogic() {
  if (dealerPoints < 17) {
    for (let i = 0; i < 1; i++) {
      dealerTempCard = [];
      dealerTempCard = deck.pop();
      dealerHand.push(dealerTempCard);
      dealerHandContainer.innerHTML += `<img src=${dealerHand[i].image} id=${dealerHand[i].rank}_of_${dealerHand[i].suit}>`;
      calculatePoints('dealer');
    }
    showPoints('dealer', dealerPoints);
    if (dealerPoints > 21) {
      messages.innerHTML += `<h3>Dealer busted!</h3>`
      // playerHandContainer.innerHTML = ``;
      // dealerHandContainer.innerHTML = ``;
      //   playerPoints = 0;
      //   dealerPoints = 0;
      //   showPoints('player', playerPoints);
      // showPoints('dealer', dealerPoints);
    }
    else {
      if (dealerPoints === playerPoints) {
        messages.innerHTML += `<h3>It's a tie!</h3>`;
  
      }
      else if (dealerPoints < playerPoints) {
        messages.innerHTML += `<h3>Player wins!</h3>`
      }
      else if (dealerPoints > playerPoints) {
        console.log('ligma')
        messages.innerHTML += `<h3>Dealer wins!</h3>`;
      }
    }
  }
  else if (dealerPoints >= 17 && dealerPoints <= 21) {
console.log('object')
    if (dealerPoints === playerPoints) {
      messages.innerHTML += `<h3>It's a tie!</h3>`;

    }
    else if (dealerPoints < playerPoints) {
      messages.innerHTML += `<h3>Player wins!</h3>`;
    }
    else if (dealerPoints > playerPoints) {
      console.log('ligma')
      messages.innerHtml += `<h3>Dealer wins!</h3>`;
    }
  }
}