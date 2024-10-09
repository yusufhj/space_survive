/*-------------- Constants -------------*/

let LIVES = 1; 
let SCORE = 0;

const playerObj = {
    lives: LIVES,
    score: SCORE,
    timeSurvived: {
        seconds: 0,
        minutes: 0
    },
    pos: {
        x: window.innerWidth/2,
        y: window.innerHeight/2
    }
}

const gameObj = {
    numOfEnemies: 1,
    enemiesPos: [{ x: 0, y: 0 }],
    shootingInterval: 1000,
    enemySpeed: 1,
    enemySpawnInterval: 5000,
    lasers: []
}


/*---------- Variables (state) ---------*/

let gameInterval;
let mouseX = 0;
let mouseY = 0;
var player = new Image();
player.src = '/assets/player.png';
var enemy = new Image();
enemy.src = '/assets/spaceship.png';

/*----- Cached Element References  -----*/

// buttons
const startbtn = document.querySelector('#startbtn');
const restartbtn = document.querySelector('#restartbtn');

// upgrades
const upgradeLivesBtn = document.querySelector('#upgrade_lives_btn');

// nav bar stats 
const livesStat = document.querySelector('#stat_lives');
const timeStat = document.querySelector('#stat_time');
const scoreStat = document.querySelector('#stat_score');

// game over stats
const gameoverScoreStat = document.querySelector('#ui_game_over_score');
const gameoverTimeStat = document.querySelector('#ui_game_over_time');
const gameoverLivesStat = document.querySelector('#ui_game_over_lives');

// elements
const startEl = document.querySelector('#start_ui');
const gameoverEl = document.querySelector('#gameover_ui');
const gameEl = document.querySelector('#game');
const ui = document.querySelector('.ui');

const canvas = document.querySelector('#game_canvas');

/*---------- Canvas Functions ---------*/

var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// draw canvas
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

// draw player
function drawPlayer() {
    ctx.drawImage(player, playerObj.pos.x, playerObj.pos.y, 20, 20);
}

// draw enemies
function drawEnemies() {
    for (let enemyPos of gameObj.enemiesPos) {
        ctx.drawImage(enemy, enemyPos.x, enemyPos.y, 50, 50);
    }
}

/*-------------- Functions -------------*/

// initailize game
function init() {
    updateStats();
    render();

    setInterval(moveEnemies, 50);
    setInterval(spawnEnemies, gameObj.enemySpawnInterval);
}

// render
function render() {
    drawCanvas();
    // render player
    drawEnemies();
    // render enemies
    drawPlayer();
}

// move enemies
function moveEnemies() {
    for (let i = 0; i < gameObj.numOfEnemies; i++) {
        const enemySpeed = gameObj.enemySpeed;
        const dx = playerObj.pos.x - gameObj.enemiesPos[i].x;
        const dy = playerObj.pos.y - gameObj.enemiesPos[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            gameObj.enemiesPos[i].x += (dx / distance) * enemySpeed;
            gameObj.enemiesPos[i].y += (dy / distance) * enemySpeed;
        }
    }
}

// spawn enemies
function generateEnemyPosition() {
    let enemyX, enemyY;
    do {
        enemyX = Math.random() * (canvas.width - 150);
        enemyY = Math.random() * (canvas.height - 150);
    } while (Math.abs(enemyX - playerObj.pos.x) < 100 && Math.abs(enemyY - playerObj.pos.y) < 100);
    
    return { x: enemyX, y: enemyY };
}

function spawnEnemies() {
    const newEnemyPosition = generateEnemyPosition();
    gameObj.enemiesPos.push(newEnemyPosition);
    gameObj.numOfEnemies++;
}

// update stats
function updateStats() {
    livesStat.textContent = "Lives: " + playerObj.lives;
    
    // for every 30 seconds, increase score by one
    if (playerObj.timeSurvived.seconds === 30) {
        playerObj.score += 1;
    }
    if (playerObj.timeSurvived.seconds === 60) {
        playerObj.score += 1;
        playerObj.timeSurvived.minutes += 1;
        playerObj.timeSurvived.seconds = 0;
    }
    if (playerObj.timeSurvived.minutes >0) {
        timeStat.textContent = "Time: " + playerObj.timeSurvived.minutes.toString() + "m " + playerObj.timeSurvived.seconds + "s";
    } else {
        timeStat.textContent = "Time: " + playerObj.timeSurvived.seconds.toString() + "s";
    }
    scoreStat.textContent = "Score: " + playerObj.score;

    checkCollision();

    if (playerObj.score >= 1) {
        upgradeLivesBtn.style.disabled = false; // Enable the button
        upgradeLivesBtn.style.backgroundColor = '#4CAF5';
    } else {
        upgradeLivesBtn.style.disabled = true; // Disable the button
        upgradeLivesBtn.style.backgroundColor = 'grey';
        upgradeLivesBtn.style.curser = 'not-allowed';
    }
}


// end game
function endGame() {
    clearInterval(gameInterval);
    // show game over ui
    ui.style.display = 'block';
    gameEl.style.display = 'none';
    gameoverEl.style.display = 'block';
}

function checkCollision() {
    // if player hits enemy ship
    for (let i = 0; i < gameObj.numOfEnemies; i++) {
        if (playerObj.pos.x < gameObj.enemiesPos[i].x + 150 && 
            playerObj.pos.x + 40 > gameObj.enemiesPos[i].x && 
            playerObj.pos.y < gameObj.enemiesPos[i].y + 150 && 
            playerObj.pos.y + 40 > gameObj.enemiesPos[i].y) {
                if (playerObj.lives > 0) {
                    playerObj.lives -= 1;
                } else {
                    endGame();
                }
            }
    }
}


/*----------- Event Listeners ----------*/

canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    
    // Calculate new player position
    let newX = e.clientX - rect.left - 25;
    let newY = e.clientY - rect.top - 25;
    
    // Constrain player within canvas
    const shipWidth = 50;  
    const shipHeight = 50; 
    
    if (newX < 0) newX = 0;
    if (newX + shipWidth > canvas.width) newX = canvas.width - shipWidth;
    if (newY < 0) newY = 0;
    if (newY + shipHeight > canvas.height) newY = canvas.height - shipHeight;

    // Update player position
    playerObj.pos.x = newX;
    playerObj.pos.y = newY;

    render();
});

// start game
startbtn.addEventListener('click', function() {
    // hide start ui
    ui.style.display = 'none';
    startEl.style.display = 'none';
    gameEl.style.display = 'block';

    // start the timer
    gameInterval = setInterval(function() {
        playerObj.timeSurvived.seconds += 1;
        updateStats();
        moveEnemies();
    }, 1000);

    // initailize game
    init();
});


// play again
restartbtn.addEventListener('click', function() {
    // hide gameover ui
    ui.style.display = 'none';
    gameoverEl.style.display = 'none';
    gameEl.style.display = 'block';

    // Reset game state
    playerObj.lives = LIVES;
    playerObj.score = SCORE = 0;
    playerObj.timeSurvived.seconds = 0;
    playerObj.timeSurvived.minutes = 0;

    gameObj.numOfEnemies = 1;
    gameObj.enemiesPos = [{x: 0, y: 0}];
    spawnEnemies();

    // restart the game
    clearInterval(gameInterval); 
    gameInterval = setInterval(function() {
        playerObj.timeSurvived.seconds += 1;
        updateStats();
        moveEnemies();
    }, 1000);

    init();
});


// upgrades
upgradeLivesBtn.addEventListener('click', function() {
    if (playerObj.score >= 1) {
        LIVES += 1;
        playerObj.lives = LIVES;
        playerObj.score -= 1;
        updateStats();
    }
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();  
});
