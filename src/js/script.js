// Array with all cards
let cards = document.querySelectorAll('.card');

// Adds click event to all cards
function addClickEvent() {
    cards.forEach(card => {
        // Adds click event from all cards
        card.addEventListener('click', gameSession);
    });
}

function startGame() {

    let cardIds = [];

    // Generates parring id's
    for (let i = 0; i < 8; i++) {
        cardIds.push(i + 1);
        cardIds.push(i + 1);
    }

    // Shuffles array
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    shuffle(cardIds);

    let cardImages = document.querySelectorAll('.card-front img');

    cards.forEach((card, index) => {
        // Gives each card an id
        card.dataset.id = cardIds[index];

        //  Sets an image on each card with the same id
        cardImages[index].src = `/assets/images/${cardIds[index]}.jpg`
    });

    addClickEvent();
}

startGame();

// Array with id's of active cards
let activeCardIds = [];

function gameSession() {

    // Removes click event from all cards
    this.removeEventListener('click', gameSession);

    // Turns clicked card
    this.firstElementChild.classList.add('card--active');

    activeCardIds.push(this.dataset.id);
    console.log(activeCardIds);

    if (activeCardIds.length == 2) {
        // Array with cards that are active
        let activeCards = document.querySelectorAll('.card--active');

        // Array with cards that havent been pairred yet
        let notpairredCards = document.querySelectorAll('.card--notpairred');

        cards.forEach(card => {
            // Removes click event from all cards
            card.removeEventListener('click', gameSession);
        });

        if (activeCardIds[0] == activeCardIds[1]) {
            activeCardIds = [];
            activeCards.forEach(activeCard => {
                activeCard.classList.replace('card--notpairred', 'card--pairred');
            });
            addClickEvent();
            console.log('A pair!');
        }

        if (activeCardIds[0] != activeCardIds[1]) {
            activeCardIds = [];
            setTimeout(() => {
                notpairredCards.forEach(notpairredCard => {
                    notpairredCard.classList.remove('card--active');
                });
                addClickEvent();
            }, 1200);
            console.log('Wrong!');
        }
    }

    // Array with cards that havent been pairred yet
    let pairredCards = document.querySelectorAll('.card--pairred');

    if (pairredCards.length == cards.length) {
        setTimeout(() => {
            restartGame();
        }, 1000);
    }
}

function restartGame() {

    let modal = document.querySelector('.modal');
    modal.style.display = 'flex';

    let restartBtn = document.querySelector('.modal__restart-btn');

    restartBtn.addEventListener('click', () => {
        modal.style.display = 'none';

        // Array with all cards
        let cardsInner = document.querySelectorAll('.card-inner');

        cardsInner.forEach(cardInner => {
            cardInner.classList.remove('card--active');
            cardInner.classList.replace('card--pairred', 'card--notpairred');
        });

        startGame();
    });
}