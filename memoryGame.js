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
	value: "ace",
	cardImage: "images/ace.png"
},
{
	value: "ace",
	cardImage: "images/ace.png"
},
{
	value: "two",
	cardImage: "images/two.png"
},
{
	value: "two",
	cardImage: "images/two.png"
},
{
	value: "three",
	cardImage: "images/three.png"
},
{
	value: "three",
	cardImage: "images/three.png"
},
{
	value: "four",
	cardImage: "images/four.png"
},
{
	value: "four",
	cardImage: "images/four.png"
},
{
	value: "five",
	cardImage: "images/five.png"
},
{
	value: "five",
	cardImage: "images/five.png"
},
{
	value: "six",
	cardImage: "images/six.png"
},
{
	value: "six",
	cardImage: "images/six.png"
},
{
	value: "seven",
	cardImage: "images/seven.png"
},
{
	value: "seven",
	cardImage: "images/seven.png"
},
{
	value: "eight",
	cardImage: "images/eight.png"
},
{
	value: "eight",
	cardImage: "images/eight.png"
}
];

// Basic Card Flip Functionality - Tested with 5 sets

function flipCard(id){
	var flippedCardId = this.getAttribute("id");
	console.log(flippedCardId);

	if(flippedCardId != trackedCards[0]){

		trackedCards.push(flippedCardId);
		cardsInPlay.push(cards[flippedCardId].value);
		var selectedCard = this.setAttribute('src', cards[flippedCardId].cardImage)
		console.log(trackedCards);

		if(cardsInPlay.length == 2){
			var cardOne = cardsInPlay[0];
			var cardTwo = cardsInPlay[1];

			if(cardOne.includes(cardTwo)){

				playerScoreTracking();

				outOfPlay();

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
		setTimeout(function(){document.getElementById(card).removeEventListener('click', flipCard);}, 200);
		setTimeout(function(){trackedCards = [];}, 100);
		cardsInPlay = [];
	});

}

function playerSwitch(){

	if(gameOver() == false){

		seconds = 10;
		document.querySelector(".playerDisplay").innerHTML = seconds + "s";

		if(currentPlayer == 0){
				currentPlayer = 1;
				console.log("Current Player is " + currentPlayer);
				$(".playerOne").css('color', 'black');
				$(".playerTwo").css('color', 'red');
			} 
			
		else {
				currentPlayer = 0;
				console.log("Current Player is " + currentPlayer);
				$(".playerTwo").css('color', 'black');
				$(".playerOne").css('color', 'red');
			}

		setTimeout(revert, 400);	

		}

}

function playerScoreTracking(){

	playerScores[currentPlayer]++;
	log.push(parseInt(trackedCards[0]));
	log.push(parseInt(trackedCards[1]));
	console.log("Current Player is " + currentPlayer);

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
			document.getElementById(card).setAttribute('src', 'images/cardBack.png');
		});

	}

	setTimeout(function(){trackedCards = [];}, 400);
	cardsInPlay = [];
}

var timer;

function countDownTimer(){

	// seconds = 10;
	// document.querySelector(".playerDisplay").innerHTML = seconds + "s";

	timer = setInterval(function(){

		if(gameOver() == false){

			document.querySelector(".playerDisplay").innerHTML = seconds-- + "s";
			console.log(seconds);

		}

		if(seconds < -1){

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

function gameBoardSetup(){

	shuffle(cards);
	$("#mainBoard").empty();
	// console.log(cards);
	for (var i = 0; i < cards.length; i++){
		var card = document.createElement('img');
		card.setAttribute('src', 'images/cardBack.png');
		card.setAttribute('id', i);
		card.addEventListener('click', flipCard);
		document.getElementById("mainBoard").appendChild(card);
		}

};

// Test of new game board creation
	
	// function testSetup(){
	// 	shuffle(cards);
	// 	$(".testBoard").empty();
	// 	$.each(cards, function(i, card){
	// 		$(".testboard").append("<div class='front'><img src='"+cards.cardImage+"'></div><div class='back'><img src='images/cardBack.png'></div>");
	// 	});
	// }

// End of test
//End of Game Board Creation

// Game Over Function

function gameOver(){

	if(playerScores[0] + playerScores[1] == 8){

		document.querySelector(".playerDisplay").innerHTML = "Game ended!";
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
	console.log(gameOver());
	log = [];
	cardsInPlay = [];
	currentPlayer = 0;
	playerScores = [0, 0];
 	trackedCards = [];
 	seconds = 10;
 	gameBoardSetup();
 	$(".playerScore").empty().append("0");
 	$(".playerOne").css('color', 'red');
 	$(".playerTwo").css('color', 'black');
 	clearInterval(timer);
 	countDownTimer();

 	testSetup();

 	// console.log(gameOver());
 	// alert("Game Ready!");

}

$("#reset").click(function(){
	restart();
});



// End of Game Initialise

});