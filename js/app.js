let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let missed = 0;
let phrases = ['Casablanca', 'The Godfather', 'Citizen Kane', 'Seven Samurai', 
                'Pinocchio', 'Parasite', 'Spirited Away', 'Pulp Fiction', 'Woodstock', 'The Social Network'];
const overlay = document.getElementById('overlay');
let btnReset = document.querySelector('.btn__reset');

btnReset.addEventListener('click', () => {
    btnReset.parentNode.style.display = 'none';
})