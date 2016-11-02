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
var playerResultElem = document.getElementById('js-playerResult');
var computerPickElem = document.getElementById('js-computerPick');
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
    		newGameElem.style.display = 'block';     
    		newGameBtn.innerText = 'Zagraj jeszcze raz';
            newGameBtn.className += ' btn-success';  
        	pickElem.style.display = 'none';         
        	resultsElem.style.display = 'block';     
        	gameWinner.style.display = 'block';      
        	break;
    	case 'notStarted':
    		default:
       			newGameElem.style.display = 'block';
        		pickElem.style.display = 'none';
        		resultsElem.style.display = 'none';
	}
}

setGameElements();    // wywołanie funkcji

// Nowa gra / Zagraj jeszcze raz --> rozpoczęcie każdej gry

function newGame() {
    reset();
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	if (player.name) {
    	player.score = computer.score = 0;
    	gameState = 'started';
    	setGameElements();   

    	playerNameElem.innerHTML = player.name;
    	setGamePoints(); 
    }
}

function reset() {
    gameWinner.innerHTML = '';
    computerResultElem.innerHTML = 'Wynik komputera';
    playerResultElem.innerHTML = 'Wynik gracza';
    computerPickElem.innerHTML = 'Wybór komputera';
    playerPickElem.innerHTML = 'Wybór gracza';
}

// Losowanie wyboru komputera

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

// Określenie wygranego pojedynczej rundy

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    if (computerPick === playerPick) { return; };
    
    if ((computerPick === 'rock' &&  playerPick === 'scissors') ||
        (computerPick === 'scissors' &&  playerPick === 'paper') ||
        (computerPick === 'paper' &&  playerPick === 'rock')) {

        setWinner(computerResultElem, computer);
        return;

    };

    setWinner(playerResultElem, player); 
    
}

function setWinner(element, winner) {
    element.innerHTML = 'Wygrana!';
    winner.score++;
    setGamePoints(); 
}

// Wyświetlenie wyborów gracza i komputera na stronie

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}


// Wyświetlenie bieżącej punktacji na stronie 

function setGamePoints() {
    playerPointsElem.innerHTML = player.score; 
    computerPointsElem.innerHTML = computer.score;

    if (checkGameEnded() === true) {
        announceWinnerGame();
    }
}

// Sprawdzenie końca gry

function checkGameEnded() {
    if (player.score === 3 || computer.score === 3) {
    return true;
    }
}


// Wyłonienie zwcięzcy

function announceWinnerGame() {
    if (player.score === 3) {
        gameWinner.innerHTML += '<h4 class="text-center">WYGRAŁ GRACZ : ' + player.name + ' !!!</h4>';
    } else {
        gameWinner.innerHTML += '<h4 class="text-center">WYGRAŁ GRACZ: computer !!!</h4>';
    }
    gameState = 'ended';
    setGameElements();
}



