let game;

document.addEventListener("DOMContentLoaded", () => {
  game = new HangmanGame();
  updateDisplay();
  setupEventListeners();

  window.gameAPI.onLetterReceived((letter) => {
    console.log("Lettre reçue:", letter);
    if (game.guessLetter(letter)) {
      updateDisplay();
      checkGameEnd();
    }
  });

  window.gameAPI.windowLoaded();
});

function updateDisplay() {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  game.getWordStatus().forEach((letter, index) => {
    const span = document.createElement("span");
    span.className = "letter-span";
    if (letter !== "_") {
      span.classList.add("revealed");
    }
    span.textContent = letter;
    span.style.animationDelay = `${index * 0.1}s`;
    wordContainer.appendChild(span);
  });

  const triesCount = document.getElementById("tries-count");
  triesCount.textContent = game.getRemainingTries();

  triesCount.className = game.getRemainingTries() < 3 ? "error" : "";
}

function setupEventListeners() {
  document.getElementById("save-button").addEventListener("click", saveGame);
  document.getElementById("load-button").addEventListener("click", loadGame);
}

function guessLetter() {
  window.gameAPI.onLetterReceived((letter) => {
    if (game.guessLetter(letter)) {
      updateDisplay();
      checkGameEnd();
    }
  });
}

function checkGameEnd() {
  if (game.isGameWon()) {
    window.gameAPI.win();
    setTimeout(() => {
      alert("Félicitations ! Vous avez gagné !");
      game.reset();
      updateDisplay();
    }, 100);
  } else if (game.isGameLost()) {
    window.gameAPI.lose();
    setTimeout(() => {
      alert(`Perdu ! Le mot était : ${game.currentWord}`);
      game.reset();
      updateDisplay();
    }, 100);
  }
}

async function saveGame() {
  await window.gameAPI.save(game.getGameState());
  alert("Partie sauvegardée !");
}

async function loadGame() {
  const gameState = await window.gameAPI.load();
  if (gameState) {
    game.loadGameState(gameState);
    updateDisplay();
    alert("Partie chargée !");
  } else {
    alert("Aucune sauvegarde trouvée !");
  }
}
