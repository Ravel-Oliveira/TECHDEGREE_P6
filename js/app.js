let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let gameResult = document.querySelector('.gameResult');
let tries = document.getElementById('scoreboard').querySelectorAll('img');
let newBtn = document.querySelector('.new-btn');
let missed = 0;
let phrases = ['Casablanca', 'The Godfather', 'Citizen Kane', 'Seven Samurai', 
                'Pinocchio', 'Parasite', 'Spirited Away', 'Pulp Fiction', 'Woodstock', 'The Social Network'];
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector('.btn__reset');

//Start game function
function startGame() {
    overlay.style.display = 'none';
    addPhraseToDisplay(getRandomPhrase(phrases));
};

//remove the previous phrase from the document
function resetPhrase() {
    let li = phrase.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        li[i].remove();
    }
};

//remove the 'chosen' class from the chosen keyrows`s buttons
function resetKeyrow() {
    let keyBoard = qwerty.querySelectorAll('button');
    for (let i = 0; i < keyBoard.length; i++) {
        if (keyBoard[i].classList.contains('chosen')) {
            keyBoard[i].classList.remove('chosen');
            keyBoard[i].disabled = false;
        }    
    }
};

//Reset the hearts src to liveHearts again, for 5 chances
function resetHearts() {
    for (let i = 0; i < tries.length; i++) {
        tries[i].src = 'images/liveHeart.png';
    }
};

//Function that resets the game
function resetGame() {
    resetPhrase();
    resetKeyrow();
    resetHearts();
    missed = 0;
};

//Select one phrase from an array
function getRandomPhrase(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomIndex].split('');
    return randomPhrase;
};

//Split the selected phrase array and put each index in a li
function addPhraseToDisplay(arr) {
    let ul = phrase.querySelector('ul');
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.innerText = arr[i];
        if (arr[i] === ' ') {
            li.classList.add('space');
        } else {
            li.classList.add('letter');
        };
        ul.appendChild(li);
    }
};

//Check if the letter from the selected keyrow button matchs with any letter from the phrase on the ul section
function checkLetter(btn) {
    const displayPhrase = document.querySelectorAll('.letter');
    const btnText = btn.innerText;
    btn.classList.add('chosen');
    btn.disabled = true;
    let letterFound = null;
    for (let i = 0; i < displayPhrase.length; i++) { 
        if (btnText.toLowerCase() === displayPhrase[i].innerText.toLowerCase()) {
            displayPhrase[i].classList.add('show');
            letterFound = displayPhrase[i].innerText;
        }
    } 
    return letterFound;
};

//check if the chosen letter was correct or not, if it was wrong remove a heart and add a missed chance
function checkScore(score) {
    if (score === null) {
        tries[missed].src = 'images/lostHeart.png';
        missed++;
        return missed;
    }
};

//Removes the start game button from the overlay, puts a new one to start a new game, put a text to inform if the palyer lost or won
//changes the bg color of the overlay to match the game result and put the overlay on display again
function endGame(text, button, result) {
    gameResult.innerText = text;
    gameResult.style.display = '';
    newBtn.innerText = button;
    newBtn.classList.add('new-btn');
    newBtn.style.display = '';
    btnReset.remove();
    overlay.classList.remove('lose', 'win');
    overlay.classList.add(result)
    overlay.style.display = '';
};

//check if the player lost all chances or got all letters right, than pass the correspondent parameters to the endGame function with a delay
function checkWin() {
    const letters = phrase.getElementsByClassName('letter');
    const lettersClass = phrase.getElementsByClassName('show');
    if (letters.length === lettersClass.length) {
        setTimeout(() => {  endGame('Well done. You WON!!', 'Play again', 'win'); }, 700);
    } else if (missed === 5) {
        setTimeout(() => {  endGame('Too bad. You LOST =(', 'Try again', 'lose'); }, 700);
    }
};


//All evetListerners
//EventListener to start the game and a new game
overlay.addEventListener('click', (evt) => {
    let e = evt.target;
    if (e.tagName === 'A') {
        resetGame()
        startGame();  
    }
});

//Keyrow events that check the letters match, the score and if the player won or lost
qwerty.addEventListener('click', (evt) => {
    let e = evt.target;
    if (e.tagName === 'BUTTON') {
        checkLetter(e);
        checkScore(checkLetter(e))
        checkWin()
    } 
});
