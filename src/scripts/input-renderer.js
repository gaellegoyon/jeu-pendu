document.addEventListener('DOMContentLoaded', () => {
    window.inputAPI.windowLoaded();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('letter-input').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendLetter();
        }
    });
}

function sendLetter() {
    const input = document.getElementById('letter-input');
    const letter = input.value.toUpperCase();
    
    if (letter) {
        window.inputAPI.sendLetter(letter);
        input.value = '';
    } else {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 500);
    }
}
