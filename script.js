// Sound effects using Web Audio API (simple beeps and pops)
function playSound(frequency, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Intro screen logic
document.getElementById('next1').addEventListener('click', () => {
    const answer1 = document.getElementById('answer1').value;
    if (answer1) {
        playSound(440, 0.2); // Fun beep
        document.getElementById('questions').style.display = 'none';
        document.getElementById('question2').style.display = 'block';
    } else {
        alert("Come on, don't leave me hanging! 😘");
    }
});

document.getElementById('start-game').addEventListener('click', () => {
    const answer2 = document.getElementById('answer2').value;
    if (answer2) {
        playSound(660, 0.3); // Excited tone
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        startGame();
    } else {
        alert("Aww, share your superpower with me! 💖");
    }
});

// Mini-game logic
let score = 0;
const heartsContainer = document.getElementById('hearts-container');
const scoreDisplay = document.getElementById('score');

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '💖';
    heart.style.left = Math.random() * 90 + '%';
    heart.style.top = Math.random() * 80 + '%';
    heartsContainer.appendChild(heart);
    
    heart.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        playSound(880, 0.1); // Pop sound
        heart.remove();
        if (score >= 100) {
            alert("You're a RizzMaster! 🏆 Let's go on a virtual date sometime? 😉");
        }
    });
    
    setTimeout(() => {
        if (heart.parentNode) heart.remove();
    }, 3000);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    setInterval(createHeart, 1000); // Spawn hearts every second
}

document.getElementById('reset-game').addEventListener('click', () => {
    location.reload(); // Simple reset
});