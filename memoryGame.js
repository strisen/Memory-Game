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
var seconds = 10;
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

// Basic Card Flip Functionality - Tested with 5 sets

function flipCard(id){
	var flippedCardId = this.getAttribute("id");
	console.log(flippedCardId);

	if(flippedCardId != trackedCards[0]){
		trackedCards.push(flippedCardId);
		cardsInPlay.push(cards[flippedCardId].rank);
		var cardId = this.setAttribute('src', cards[flippedCardId].cardImage)

		if(cardsInPlay.length == 2){
			var cardOne = cardsInPlay[0];
			var cardTwo = cardsInPlay[1];

			if(cardOne.includes(cardTwo)){
				playerScores[currentPlayer]++;
				log.push(parseInt(trackedCards[0]));
				log.push(parseInt(trackedCards[1]));
				console.log("Current Player is " + currentPlayer);

				playerScoreTracking();

				outOfPlay();

				// setTimeout(function(){document.getElementById(flippedCardId).removeEventListener('click', flipCard);}, 600);
				
				setTimeout(function(){
				cardsInPlay = [];
				trackedCards = [];	
				}, 600);

				console.log(log);
				console.log(log.length);
		
			} 	

			else { 

				playerSwitch();

			}
		}
	}
	whoWon();
}

function outOfPlay(){

	$.each(trackedCards,function(i, card){
		setTimeout(function(){document.getElementById(card).removeEventListener('click', flipCard);}, 600);
	});

}

function playerSwitch(){

	if(gameOver() == false){

		if(currentPlayer == 0){
				currentPlayer = 1;
				console.log("Current Player is " + currentPlayer);
				$(".playerOne").css('color', 'black');
				$(".playerTwo").css('color', 'red');
				seconds = 10;
				setTimeout(revert, 400);
			} 
			
		else {
				currentPlayer = 0;
				console.log("Current Player is " + currentPlayer);
				$(".playerTwo").css('color', 'black');
				$(".playerOne").css('color', 'red');
				seconds = 10;
				setTimeout(revert, 400);
			}
		}

}

function playerScoreTracking(){

	if(currentPlayer == 0){
		document.getElementById("p1").innerHTML = playerScores[currentPlayer];
	} 

	else {
		document.getElementById("p2").innerHTML = playerScores[currentPlayer];
	}
}

function revert(){

	if(trackedCards.length != 0){

		$.each(trackedCards, function(i, card){
			document.getElementById(card).setAttribute('src', 'images/back.png');
		});

	}

	setTimeout(function(){trackedCards = [];}, 200)
	cardsInPlay = [];
}

function countDownTimer(){

	seconds = 10;
	document.querySelector(".playerDisplay").innerHTML = seconds + "s";
	
	var timer = setInterval(function(){

		document.querySelector(".playerDisplay").innerHTML = seconds-- + "s";
		// console.log(seconds);

		if(seconds < 0){
			playerSwitch();
			console.log(currentPlayer);

		}
	}, 1000);
}

// End of Basic Flip Card Functionality

// Cards Shuffler

function shuffle(array) {
	
  var cardsArrayLength = array.length, cardHolder, index;

  while (cardsArrayLength) {

    index = Math.floor(Math.random() * cardsArrayLength--);

    cardHolder = array[cardsArrayLength];
    array[cardsArrayLength] = array[index];
    array[index] = cardHolder;
  }

  return array;

};

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

// End of Game Over Function

// Who Won Announcer

function whoWon(){
	if(gameOver() == true){
		if(currentPlayer == 0){
			alert("Player One wins!");
		} else {
			alert("Player Two wins!");
		}
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
 	$(".playerOne").css('color', 'red');
 	// $(".playerScore").append("0");
 	// $(".playerDisplay").empty().append("Player One");
 	countDownTimer();
 	// $(".playerDisplay").append("Player One");
 	alert("Game Ready!");

}

$("#reset").click(function(){
	restart();
});



// End of Game Initialise

});