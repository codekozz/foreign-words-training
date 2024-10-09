const setOfWords = [{
        cardFront: "apple",
        cardBack: "яблоко",
        example: 'The children are picking apples in the orchard.'
    },
    {
        cardFront: "cat",
        cardBack: "кот",
        example: 'My cat walked over the wet cement and left an imprint.'
    },
    {
        cardFront: "sweet",
        cardBack: "сладкий",
        example: 'The cake was very sweet.'
    },
    {
        cardFront: "hello",
        cardBack: "привет",
        example: 'Hello, how are you doing?'
    },
    {
        cardFront: "sunny",
        cardBack: "солнечный",
        example: 'The weather promises to be sunny this afternoon.'
    }
]

const flipCard = document.querySelector('.flip-card');
const cardFront = document.querySelector('#card-front');
const wordCardFront = cardFront.querySelector('h1');
const cardBack = document.querySelector('#card-back');
const wordCardBack = cardBack.querySelector('h1');
const example = cardBack.querySelector('span');

const currentWord = document.querySelector('#current-word');

const buttons = document.querySelector('.slider-controls');
const buttonControl = buttons.querySelectorAll('button');
const buttonNext = document.querySelector('#next');
const buttonBack = document.querySelector('#back');

flipCard.addEventListener('click', () => {
    flipCard.classList.toggle('active');
})

wordCardFront.textContent = setOfWords[0].cardFront;
wordCardBack.textContent = setOfWords[0].cardBack;
example.textContent = setOfWords[0].example;

let i = 0;

buttonControl.forEach(btn => {
    btn.addEventListener('click', (event) => {

        if (event.target.id === 'next') {
            buttonBack.removeAttribute("disabled");

            i++;
            currentWord.textContent = i + 1;

            wordCardFront.textContent = setOfWords[i].cardFront;
            wordCardBack.textContent = setOfWords[i].cardBack;
            example.textContent = setOfWords[i].example;

            if (i === 4) {
                event.target.setAttribute("disabled", "true");
                i = 4;
            }
        }
        if (event.target.id === 'back') {

            i--;
            currentWord.textContent = i + 1;

            buttonNext.removeAttribute("disabled");
            wordCardFront.textContent = setOfWords[i].cardFront;
            wordCardBack.textContent = setOfWords[i].cardBack;
            example.textContent = setOfWords[i].example;

            if (i === 0) {
                event.target.setAttribute("disabled", "true");
                i = 0;
            }
        }

    })
});