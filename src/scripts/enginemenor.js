// Função para detectar se a tela é pequena (dispositivo móvel)
function isSmallScreen() {
    return window.innerWidth <= 768; // ajuste o valor conforme o tamanho desejado
}

// Variável para controlar o estado de clique na carta
let cardClicked = false;

cardImage.addEventListener("mouseover", () => {
    // Apenas aplica o efeito de mouseover em telas maiores
    if (!isSmallScreen()) {
        drawSelectCard(IdCard);
    }
});

cardImage.addEventListener("click", () => {
    if (isSmallScreen()) {
        if (!cardClicked) {
            // Primeiro clique simula o "mouseover"
            drawSelectCard(IdCard);
            cardClicked = true; // Marca que a carta foi clicada
        } else {
            // Segundo clique lança a carta
            launchCard(IdCard); // Função para lançar a carta
            cardClicked = false; // Reseta o estado para permitir novo ciclo
        }
    }
});
