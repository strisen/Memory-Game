// TO DO LIST
/*
	Do Up CSS By Tonight preferably

	Find a way to shrink the cards array for 24 tiles

	DRY My Code 

	Re-adjust the card populator

	To add in additional modal functions/animations after Base Game is ready

	eg. Game/Modal Overlays and Player Name requests
*/
// END OF TO DO LIST

$(document).ready(function(){

// Core Functions
var cardsInPlay = [];
var playerScores = [0, 0];
var trackedCards = [];
var log = [];
var currentPlayer = 0;
var flippedCardId;
var cards = [
{
	rank: "queen",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	cardImage: "images/king-of-diamonds.png"
},
{
	rank: "queen",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	cardImage: "images/king-of-diamonds.png"
},
{
	rank: "king",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	cardImage: "images/king-of-diamonds.png"
},
{
	rank: "queen",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	cardImage: "images/king-of-diamonds.png"
},
{
	rank: "king",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	cardImage: "images/king-of-diamonds.png"
}
];

// Tracking of Players

// function playTurn(index){

// 	for (var i = 0; i < (log.length+1); i++){
// 		if(index == log[i]){
// 		return false;
// 		}
// 	}
// 	log.push(index);
// 	currentPlayer = log.length%2;
// 	return true;
// }

// console.log(log);
// End of Player Tracking
// Basic Card Flip Functionality - Tested with 5 sets

function flipCard(id){
	var flippedCardId = this.getAttribute("id");
	console.log(flippedCardId);
	// cardCheck();
	if(flippedCardId != trackedCards[0]){
		trackedCards.push(flippedCardId);
		cardsInPlay.push(cards[flippedCardId].rank);
		var cardId = this.setAttribute('src', cards[flippedCardId].cardImage)

		if(cardsInPlay.length == 2){
			var cardOne = cardsInPlay[0];
			var cardTwo = cardsInPlay[1];
			// console.log(cardOne.includes(cardTwo));

			if(cardOne.includes(cardTwo)){
				// cardsInPlay = [];
				// trackedCards = [];
				playerScores[currentPlayer]++;
				console.log(playerScores);
				console.log(flippedCardId);
				console.log(log);
				console.log(log.length);


				// If First Pair
				// if(log.length == 0){
					console.log(trackedCards);
					log.push(parseInt(trackedCards[0]));
					log.push(parseInt(trackedCards[1]));
					console.log("Current Player is " + currentPlayer);

					if(currentPlayer == 0){
						document.getElementById("p1").innerHTML = playerScores[currentPlayer];
					} else {
						document.getElementById("p2").innerHTML = playerScores[currentPlayer];
					}
					setTimeout(function(){document.getElementById(flippedCardId).removeEventListener('click', flipCard);}, 600);
					console.log(log);
					console.log(log.length);
					cardsInPlay = [];
					trackedCards = [];


					//Second Pair Onwards
				// } 

				// else {

				// 	for(var i = 0; i < log.length; i++){

				// 		if((log[i] == parseInt(trackedCards[0]) || log[i] == parseInt(trackedCards[1])) == false){

				// 		log.push(parseInt(trackedCards[0]));
				// 		log.push(parseInt(trackedCards[1]));
				// 		console.log(log);
				// 		console.log(log.length);

				// 		// log.push(parseInt(flippedCardId));
				// 		setTimeout(function(){
				// 			document.getElementById(flippedCardId).removeEventListener('click', flipCard);
				// 		}, 500);
				// 		console.log(log);
				// 		console.log(log.length);
				// 		cardsInPlay = [];
				// 		trackedCards = [];
				// 		}
				// 	}
				// }

					//If not matching pair

				} 	else { 

						// Should cut off into separate function

						if(gameOver() == false){

							if(currentPlayer == 0){
									currentPlayer = 1;
									console.log("Current Player is " + currentPlayer);
									$(".playerDisplay").empty();
									$(".playerDisplay").append("Player Two");
									setTimeout(revert, 500);
								} 
								else {
									currentPlayer = 0;
									console.log("Current Player is " + currentPlayer);
									$(".playerDisplay").empty();
									$(".playerDisplay").append("Player One");
									setTimeout(revert, 500);
								}
						}
					}
		}
	}
	// gameOver();
	whoWon();
}

function revert(){
	document.getElementById(trackedCards[0]).setAttribute('src', 'images/back.png');
	document.getElementById(trackedCards[1]).setAttribute('src', 'images/back.png');
	setTimeout(function(){trackedCards = [];}, 500)
	cardsInPlay = [];
}


// cardCheck is to be removed.

// function cardCheck(){
// 	for (var i = 0; i < log.length; i++){
// 		if(log[i] == flippedCardId){
// 			alert("Choose another card");
// 		}
// 	}
// }

// End of Basic Flip Card Functionality

// Cards Shuffler

function shuffle(array) {
  var cardsArrayLength = array.length, cardHolder, index;

  // While there remain elements to shuffle…
  while (cardsArrayLength) {

    // Pick a remaining element…
    index = Math.floor(Math.random() * cardsArrayLength--);

    // And swap it with the current element.
    cardHolder = array[cardsArrayLength];
    array[cardsArrayLength] = array[index];
    array[index] = cardHolder;
  }

  return array;
};

// console.log(cards);
// console.log(shuffle(cards));
//End of Card Shuffler


//Creating of the Game Board

// var card;

// var gameBoardSetup = function
	function gameBoardSetup(){
		shuffle(cards);
		$("#mainBoard").empty();
		// console.log(cards);
		for (var i = 0; i < cards.length; i++){
			var card = document.createElement('img');
			card.setAttribute('src', 'images/back.png');
			card.setAttribute('id', i);
			card.addEventListener('click', flipCard);
			document.getElementById("mainBoard").appendChild(card);
			}
};

// gameBoardSetup();
//End of Game Board Creation

// Game Over Function

function gameOver(){
	if(playerScores[0] + playerScores[1] == 8){
		// setTimeout(stopGame, 1000);
		return true;
	}
	return false;
}

// function stopGame(){
// 	document.querySelector("img").removeEventListener('mouseover', flipCard())
// }

// End of Game Over Function

// Who Won Announcer

function whoWon(){
	if(gameOver() == true){
		if(currentPlayer == 0){
			alert("Player One wins!");
		} else {
			alert("Player Two wins!");
		}
		// alert("Game Over!");
	}
}

// End of Announcer

// Game Initialise

function restart(){

	log = [];
	cardsInPlay = [];
	currentPlayer = 0;
	playerScores = [0, 0];
 	trackedCards = [];
 	gameBoardSetup();
 	$(".playerScore").empty().append("0");
 	// $(".playerScore").append("0");
 	$(".playerDisplay").empty().append("Player One");
 	// $(".playerDisplay").append("Player One");
 	alert("Game Ready!");

}

$("#reset").click(function(){
	restart();
});

// End of Game Initialise

// For Testing of new functions
// function gameBoardSetupAlt = function(){
// 	var holder;
// 	this.$cards.each(function(cards, index){
// 		holder += "<div class='card' id='" + index.id + "'><div class='front'><img src='" + index.cardImage + "'></div><div class='back'><img src='" + 
// 	})
// }
// End of Testing
});