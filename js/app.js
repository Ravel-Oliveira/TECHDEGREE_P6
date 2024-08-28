let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let missed = 0;
let phrases = ['Casablanca', 'The Godfather', 'Citizen Kane', 'Seven Samurai', 
                'Pinocchio', 'Parasite', 'Spirited Away', 'Pulp Fiction', 'Woodstock', 'The Social Network'];
const overlay = document.getElementById('overlay');
const btnReset = document.querySelector('.btn__reset');


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
        console.log(displayPhrase[i]);
        if (btnText.toLowerCase() === displayPhrase[i].innerText.toLowerCase()) {
            displayPhrase[i].classList.add('show');
            letterFound = displayPhrase[i].innerText;
        }
    } 
    return letterFound;
};


let btn = document.querySelectorAll('button');

//Start game button
btnReset.addEventListener('click', () => {
    btnReset.parentNode.style.display = 'none';
})