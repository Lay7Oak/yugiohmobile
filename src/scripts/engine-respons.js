const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },

    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },

    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },

    playerSides: {
        player1: "player-cards",
        computer: "computer-cards",
        player1Box: document.querySelector("#player-cards"),
        computerBox: document.querySelector("#computer-cards"),
    },

    actions: {
        button: document.getElementById("next-duel"),
    }
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};

const pathImages = "./src/assets/icons/";
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LoseOf: [1],
    },
];

let lastClickedCard = null;
let lastClickTime = 0;

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "70px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("click", () => handleCardClick(cardImage, IdCard));
    }

    return cardImage;
}

// Função para gerenciar o clique nas cartas
function handleCardClick(cardImage, IdCard) {
    const currentTime = new Date().getTime();

    if (lastClickedCard === cardImage && currentTime - lastClickTime < 500) {
        // Segundo clique dentro do tempo limite: lançar a carta
        setCardsfield(IdCard);
        resetClickState();
    } else {
        // Primeiro clique: apenas exibir a carta
        drawSelectCard(IdCard);
        lastClickedCard = cardImage;
        lastClickTime = currentTime;
    }
}

// Reseta o estado dos cliques
function resetClickState() {
    lastClickedCard = null;
    lastClickTime = 0;
}

// Função para configurar as cartas no campo
async function setCardsfield(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await drawCardsInField(cardId, computerCardId);

    await showHiddenCardFieldsImages(true);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value) {
    state.fieldCards.player.style.display = value ? "block" : "none";
    state.fieldCards.computer.style.display = value ? "block" : "none";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Win";
        state.score.playerScore++;
    }

    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "Lose";
        state.score.computerScore++;
    }

    await playAudio(duelResults);

    return duelResults;
}

async function removeAllCardsImages() {
    let { computerBox, player1Box } = state.playerSides;

    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}

// Função para exibir o botão de resultado e resgatar o jogo
async function drawButton(text) {
    state.actions.button.innerText = `${text.toUpperCase()}`;
    state.actions.button.style.display = "block";
    state.actions.button.onclick = resetGame;
}

// Função para resetar o jogo
function resetGame() {
    removeAllCardsImages();
    showHiddenCardFieldsImages(false);
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
    resetClickState();
    state.actions.button.style.display = "none";
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        audio.play();
    } catch { }
}

function init() {
    showHiddenCardFieldsImages(false);
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
    toggleSound();
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

document.getElementById('toggle-sound').addEventListener('click', function toggleSound() {
    const bgm = document.getElementById('bgm');
    if (bgm.paused) {
        bgm.play();
    } else {
        bgm.pause();
    }
});


 function checkScreenSize() {
     if (window.innerWidth >= 919) {
         window.location.href = "https://lay7oak.github.io/yu_gi_oh_JS/";
     }
 }

  //Chama a função quando a página é carregada
 checkScreenSize();

 //Também pode ser útil verificar ao redimensionar a tela
 window.addEventListener('resize', checkScreenSize);



const closeBtn = document.querySelector('.close-btn');
    const modal = document.getElementById('instruction-box');

    // Função para exibir o modal sempre que a página carregar
    function showInstructions() {
        modal.style.display = 'block';
    }
    
    // Evento para fechar o modal ao clicar no botão "X"
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Exibir o modal ao carregar a página
    window.onload = showInstructions;


init();
