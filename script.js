// Particle explosion effect
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

function createParticles(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 60
        });
    }
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = `rgba(255, 0, 110, ${p.life / 60})`;
        ctx.fillRect(p.x, p.y, 5, 5);
        return p.life > 0;
    });
    requestAnimationFrame(updateParticles);
}
updateParticles();

// Synth sounds
function playSynth(frequency, type, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

// Rizz questions with effects
document.getElementById('next1').addEventListener('click', () => {
    const answer1 = document.getElementById('answer1').value;
    if (answer1) {
        playSynth(440, 'sawtooth', 0.5);
        createParticles(300, 200);
        document.getElementById('questions').style.display = 'none';
        document.getElementById('question2').style.display = 'block';
    } else {
        alert("Don't play hard to get! 😘");
    }
});

document.getElementById('start-game').addEventListener('click', () => {
    const answer2 = document.getElementById('answer2').value;
    if (answer2) {
        playSynth(660, 'square', 0.7);
        createParticles(400, 300);
        document.getElementById('intro-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        startGame();
    } else {
        alert("Your story is too good to miss! 💖");
    }
});

// Mini-game: Rizz Dodge
let score = 0, combo = 1, playerX = 50;
const gameArea = document.getElementById('game-area');
const player = document.getElementById('player');
const objectsContainer = document.getElementById('objects-container');
const scoreDisplay = document.getElementById('score');

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerX > 0) playerX -= 5;
    if (e.key === 'ArrowRight' && playerX < 90) playerX += 5;
    player.style.left = playerX + '%';
});

function createObject() {
    const obj = document.createElement('div');
    obj.className = Math.random() > 0.7 ? 'object skull' : 'object heart';
    obj.textContent = obj.classList.contains('skull') ? '💀' : '💖';
    obj.style.left = Math.random() * 90 + '%';
    objectsContainer.appendChild(obj);
    
    obj.addEventListener('animationend', () => obj.remove());
}

function checkCollisions() {
    const playerRect = player.getBoundingClientRect();
    document.querySelectorAll('.object').forEach(obj => {
        const objRect = obj.getBoundingClientRect();
        if (playerRect.left < objRect.right && playerRect.right > objRect.left &&
            playerRect.top < objRect.bottom && playerRect.bottom > objRect.top) {
            if (obj.classList.contains('heart')) {
                score += 10 * combo;
                combo++;
                playSynth(880, 'triangle', 0.2);
                createParticles(objRect.left, objRect.top);
            } else {
                combo = 1;
                playSynth(220, 'sawtooth', 0.3);
            }
            scoreDisplay.textContent = `Score: ${score} | Combo: x${combo}`;
            obj.remove();
            if (score >= 500) {
                alert("Rizz Legend! 💋 Confetti incoming!");
                // Add confetti effect here if you want (extra code)
            }
        }
    });
}

function startGame() {
    score = 0; combo = 1;
    scoreDisplay.textContent = 'Score: 0 | Combo: x1';
    setInterval(createObject, 800);
    setInterval(checkCollisions, 50);
}

document.getElementById('reset-game').addEventListener('click', () => {
    location.reload();
});
