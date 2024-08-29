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


// function startGame() {
//     btnReset.parentNode.style.display = 'none';
//     addPhraseToDisplay(getRandomPhrase(phrases));
// }

function startGame() {
    overlay.style.display = 'none';
    addPhraseToDisplay(getRandomPhrase(phrases));
};

function resetGame() {
    resetPhrase();
    resetKeyrow();
    resetHearts();
    missed = 0;
};

function resetPhrase() {
    let li = phrase.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        li[i].remove();
    }
};

function resetKeyrow() {
    let keyBoard = qwerty.querySelectorAll('button');
    for (let i = 0; i < keyBoard.length; i++) {
        if (keyBoard[i].classList.contains('chosen')) {
            keyBoard[i].classList.remove('chosen');
        }    
    }
};

function resetHearts() {
    for (let i = 0; i < tries.length; i++) {
        tries[i].src = 'images/liveHeart.png';
    }
};

function getRandomPhrase(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomIndex].split('');
    return randomPhrase;
};


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

function checkLetter(btn) {
    const displayPhrase = document.querySelectorAll('.letter');
    const btnText = btn.innerText;
    btn.classList.add('chosen');
    let letterFound = null;
    for (let i = 0; i < displayPhrase.length; i++) { 
        if (btnText.toLowerCase() === displayPhrase[i].innerText.toLowerCase()) {
            displayPhrase[i].classList.add('show');
            letterFound = displayPhrase[i].innerText;
        }
    } 
    return letterFound;
};


function checkScore(score) {
    if (score === null) {
        tries[missed].src = 'images/lostHeart.png';
        missed++;
        return missed;
    }
};

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

function checkWin() {
    const letters = phrase.getElementsByClassName('letter');
    const lettersClass = phrase.getElementsByClassName('show');
    if (letters.length === lettersClass.length) {
        endGame('Well done. You WON!!', 'Play again', 'win')
    } else if (missed === 5) {
        endGame('Too bad. You LOST =(', 'Try again', 'lose')
    }
};



//All evetListerners

//Start game button
// btnReset.addEventListener('click', () => {
//     startGame();
// })

overlay.addEventListener('click', (evt) => {
    let e = evt.target;
    if (e.tagName === 'A') {
        resetGame()
        startGame();  
    }
});

//Keyrow events
qwerty.addEventListener('click', (evt) => {
    let e = evt.target;
    if (e.tagName === 'BUTTON') {
        checkLetter(e);
        checkScore(checkLetter(e))
        checkWin()
    } 
    console.log(missed);
});
