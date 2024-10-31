class HangmanGame {
    constructor() {
        this.words = ['ELECTRON', 'JAVASCRIPT', 'PROGRAMMATION', 'ORDINATEUR', 'DEVELOPPEUR'];
        this.MAX_TRIES = 7;
        this.reset();
    }

    reset() {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessedLetters = new Set();
        this.mistakes = 0;
    }

    guessLetter(letter) {
        letter = letter.toUpperCase();
        if (!letter || this.guessedLetters.has(letter)) {
            return false;
        }

        this.guessedLetters.add(letter);
        if (!this.currentWord.includes(letter)) {
            this.mistakes++;
        }

        return true;
    }

    getWordStatus() {
        return [...this.currentWord].map(letter => 
            this.guessedLetters.has(letter) ? letter : '_'
        );
    }

    getRemainingTries() {
        return this.MAX_TRIES - this.mistakes;
    }

    isGameWon() {
        return [...this.currentWord].every(letter => this.guessedLetters.has(letter));
    }

    isGameLost() {
        return this.mistakes >= this.MAX_TRIES;
    }

    getGameState() {
        return {
            currentWord: this.currentWord,
            guessedLetters: Array.from(this.guessedLetters),
            mistakes: this.mistakes
        };
    }

    loadGameState(gameState) {
        if (gameState) {
            this.currentWord = gameState.currentWord;
            this.guessedLetters = new Set(gameState.guessedLetters);
            this.mistakes = gameState.mistakes;
        }
    }
}