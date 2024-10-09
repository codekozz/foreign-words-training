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

const studyCards = document.querySelector('.study-cards');
const examCards = document.querySelector('#exam-cards');
const studyMode = document.querySelector('#study-mode');
const examMode = document.querySelector('#exam-mode');
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

        if (event.target.id === 'exam') {
            studyCards.classList.add('hidden');
            studyMode.classList.add('hidden');
            examMode.classList.remove('hidden');
            createElement();
        }

    })
});


function shuffle(array) { /*перемешивание элементов*/
    array.sort(() => Math.random() - 0.5);
    return array;
}

function createElement() {

    const wordsRus = [];
    const wordsEng = [];

    setOfWords.forEach((word) => {
        wordsRus.push(word.cardBack);
    })

    setOfWords.forEach((word) => {
        wordsEng.push(word.cardFront);
    })

    const mixWords = shuffle(wordsRus.concat(wordsEng));

    mixWords.forEach((word) => {
        const element = document.createElement("span");
        element.classList.add('card');
        element.textContent = word;
        examCards.append(element);
    });

    const cardChoice = document.querySelectorAll(".card");
    let clickCount = 0;
    let wordCount = 0;

    let firstChoise;
    let firstIndexOf;
    let secondChoise;
    let secondIndexOf;

    cardChoice.forEach(btn => {

        btn.addEventListener('click', () => {
            clickCount++;

            if (clickCount === 1) {
                btn.classList.add('correct');
                firstChoise = btn.textContent;
                firstIndexOf = wordsRus.indexOf(firstChoise);
                if (firstIndexOf < 0) {
                    firstIndexOf = wordsEng.indexOf(firstChoise);
                }
            }

            if (clickCount > 1) {
                secondChoise = btn.textContent;
                secondIndexOf = wordsEng.indexOf(secondChoise);
                if (secondIndexOf < 0) {
                    secondIndexOf = wordsRus.indexOf(secondChoise);
                }


                if (firstIndexOf === secondIndexOf) {
                    btn.classList.add('correct');
                    cardChoice.forEach(btnIn => {
                        if (btnIn.classList.contains('correct')) {
                            btnIn.classList.add('fade-out');
                            clickCount = 0;
                        }
                    })
                    wordCount++;
                } else {
                    btn.classList.add('wrong');
                    setTimeout(() => {
                        cardChoice.forEach(btnIn => {
                            if (btnIn.classList.contains('correct') || btnIn.classList.contains('wrong')) {
                                btnIn.classList.remove('correct');
                                btnIn.classList.remove('wrong');
                                clickCount = 0;
                            }
                        })
                    }, 1000);
                }
            }
            if (wordCount === 5) {
                alert('Поздравляю с успешным завершением задания!')
            }
        })

    })
}