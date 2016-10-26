// Zmienne

var newGameBtn = document.getElementById('js-newGameButton');
var newGameElem = document.getElementById('js-newGameElement');

var pickElem = document.getElementById('js-playerPickElement');
var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

var resultsElem = document.getElementById('js-resultsTableElement');
var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

var gameWinner = document.getElementById('js-gameWinner');

newGameBtn.addEventListener('click', newGame);   
pickRock.addEventListener('click', function() { playerPick('rock') });  
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// Początkowy stan gry

var gameState = 'notStarted';  
var player = {                 
        name: '',
        score: 0
    };
var computer = {               
        score: 0
    };

// Aktualny stan gry

function setGameElements() {   
	switch(gameState) {
    	case 'started':
        	newGameElem.style.display = 'none';
        	pickElem.style.display = 'block';
        	resultsElem.style.display = 'block';
            gameWinner.style.display = 'none';  
    		break;
    	case 'ended':
    		newGameElem.style.display = 'block';     // dodałam
    		newGameBtn.innerText = 'Zagraj jeszcze raz';
            newGameBtn.className += ' btn-success';  // dodałam
        	pickElem.style.display = 'none';         // dodałam
        	resultsElem.style.display = 'block';     // dodałam
        	gameWinner.style.display = 'block';      // dodałam
        	break;
    	case 'notStarted':
    		default:
       			newGameElem.style.display = 'block';
        		pickElem.style.display = 'none';
        		resultsElem.style.display = 'none';
	}
};

setGameElements();    // wywołanie funkcji

// Nowa gra / Zagraj jeszcze raz --> rozpoczęcie każdej gry

function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	if (player.name) {
    	player.score = computer.score = 0;
    	gameState = 'started';
    	setGameElements(); 

    	playerNameElem.innerHTML = player.name;
    	setGamePoints(); 
    }
}

// Pobranie wyboru gracza

function playerPick(playerPick) {    
	console.log(playerPick);
}

// Losowanie wyboru komputera

var x = Math.random();
Math.floor(Math.random()*3);

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

// Określenie wygranego pojedynczej potyczki

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

   	if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
       	player.score++;
       	setGamePoints();  // dodałam

    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
        setGamePoints();  // dodałam
    }
}

// Wyświetlenie wyborów gracza i komputera na stronie

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}

// Wyświetlenie bieżącej punktacji na stronie i wyłonienie zwcięzcy

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;

// MONIKA -------- dodałam to co poniżej

    if (player.score == '3') {
    	gameWinner.innerHTML += '<h4 class="text-center">WYGRAŁ GRACZ : ' + player.name + ' !!!</h4>';
		gameState = 'ended';
    	setGameElements(); 
	} else if (computer.score == '3') {
		gameWinner.innerHTML += '<h4 class="text-center">WYGRAŁ GRACZ: computer !!!</h4>';
		gameState = 'ended';
    	setGameElements(); 
	}
}
    
