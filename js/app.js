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
    enemySpeed: 1,
    enemySpeedIncrement: 0.1,
    enemySpawnInterval: 5000,
}


/*---------- Variables (state) ---------*/

let gameInterval;
let moveEnemiesInterval;
let spawnEnemiesInterval;
let mouseX = 0;
let mouseY = 0;

var player = new Image();
player.src = './assets/player.png';

var enemy = new Image();
enemy.src = './assets/spaceship.png';

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
const gameoverUiEl = document.querySelector('#ui_game_over');

const canvas = document.querySelector('#game_canvas');

/*---------- Canvas Functions ---------*/

// initialize canvas
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// draw canvas
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

// draw player
function drawPlayer() {
    ctx.drawImage(player, playerObj.pos.x-15, playerObj.pos.y-15, 30, 30);
}

// draw enemies
function drawEnemies() {
    for (let enemyPos of gameObj.enemiesPos) {
        ctx.drawImage(enemy, enemyPos.x-50, enemyPos.y-50, 100, 100);
    }
}


/*-------------- Functions -------------*/

// initailize game
function init() {
    clearInterval(moveEnemiesInterval);
    clearInterval(spawnEnemiesInterval);
    updateStats();
    render();
    moveEnemiesInterval = setInterval(moveEnemies, 5);
    spawnEnemiesInterval = setInterval(spawnEnemies, gameObj.enemySpawnInterval);
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
        // Get enemy's position
        const enemyPos = gameObj.enemiesPos[i];

        // Calculate direction towards the mouse
        const dx = mouseX - enemyPos.x;
        const dy = mouseY - enemyPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector
        if (distance > 0) {
            const directionX = dx / distance;
            const directionY = dy / distance;

            // Move enemy based on speed and direction
            enemyPos.x += directionX * gameObj.enemySpeed;
            enemyPos.y += directionY * gameObj.enemySpeed;
        }
    }
}


// generate a random enemy position
function generateEnemyPosition() {
    let enemyX, enemyY;
    // randomize enemy position to spawn
    do {
        enemyX = Math.random() * (canvas.width - 150);
        enemyY = Math.random() * (canvas.height - 150);
    } while (Math.abs(enemyX - playerObj.pos.x) < 100 && Math.abs(enemyY - playerObj.pos.y) < 100);
    
    return { x: enemyX, y: enemyY };
}

// spawn enemies
function spawnEnemies() {
    const newEnemyPosition = generateEnemyPosition();
    gameObj.enemiesPos.push(newEnemyPosition);
    gameObj.numOfEnemies++;
}

// update stats
function updateStats() {
    livesStat.textContent = "Lives: " + playerObj.lives;
    if (playerObj.timeSurvived.minutes >0) {
        timeStat.textContent = "Time: " + playerObj.timeSurvived.minutes.toString() + "m " + playerObj.timeSurvived.seconds + "s";
    } else {
        timeStat.textContent = "Time: " + playerObj.timeSurvived.seconds.toString() + "s";
    }
    scoreStat.textContent = "Score: " + playerObj.score;

    upgradebtn();
    checkCollision();
    checkWinCondition();
}


// end game
function endGame() {
    clearInterval(gameInterval);
    // show game over ui
    ui.style.display = 'block';
    gameEl.style.display = 'none';
    gameoverEl.style.display = 'block';
    gameoverUiEl.innerHTML = "GAME OVER";

}

// check collision player with enemy
function checkCollision() {
    let collisonMargin = 100;
    // if player hits enemy ship
    for (let i = 0; i < gameObj.numOfEnemies; i++) {
        const enemyX = gameObj.enemiesPos[i].x;
        const enemyY = gameObj.enemiesPos[i].y;
        const enemyWidth = 100 + collisonMargin;
        const enemyHeight = 100 + collisonMargin; 
        const playerWidth = 30 + collisonMargin;  
        const playerHeight = 30 + collisonMargin; 

        // Check if the player's overlap with the eenemy spaceship
        if (playerObj.pos.x < enemyX + enemyWidth &&
            playerObj.pos.x + playerWidth > enemyX &&
            playerObj.pos.y < enemyY + enemyHeight &&
            playerObj.pos.y + playerHeight > enemyY) {
                if (playerObj.lives > 0) {
                    playerObj.lives -= 1;
                } else {
                    endGame();
                }
            }
    }
}

// check win condition
function checkWinCondition() {
    // if player survives for 10 minutes
    if (playerObj.timeSurvived.minutes >= 10) {
        winGame();
    }
}

// win game
function winGame() {
    clearInterval(gameInterval);
    ui.style.display = 'block';
    gameEl.style.display = 'none';
    gameoverEl.style.display = 'block';
    gameoverUiEl.innerHTML = "YOU WIN!";
}

// upgrade button
function upgradebtn (){
    if (playerObj.score >= 1) {
        upgradeLivesBtn.disabled = false;
        upgradeLivesBtn.style.backgroundColor = '#4CAF50';
    } else {
        upgradeLivesBtn.disabled = true;
        upgradeLivesBtn.style.backgroundColor = 'grey';
    }
}


/*----------- Event Listeners ----------*/

canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    
    // Update mouseX and mouseY
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Update player position
    playerObj.pos.x = mouseX;
    playerObj.pos.y = mouseY;

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
        playerObj.timeSurvived.seconds++;
        gameObj.enemySpeed += gameObj.enemySpeedIncrement;
        if (playerObj.timeSurvived.seconds === 30 || playerObj.timeSurvived.seconds === 60) {
            playerObj.score += 1;
        }
        if (playerObj.timeSurvived.seconds >= 60) {
            playerObj.timeSurvived.minutes += 1; 
            playerObj.timeSurvived.seconds = 0;
        }
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
    gameObj.enemySpeed = 1;
    gameObj.enemySpawnInterval = 5000;

    // restart the game
    clearInterval(gameInterval); 
    gameInterval = setInterval(function() {
        playerObj.timeSurvived.seconds++;
        gameObj.enemySpeed += gameObj.enemySpeedIncrement;
        if (playerObj.timeSurvived.seconds === 30 || playerObj.timeSurvived.seconds === 60) {
            playerObj.score += 1;
        }
        if (playerObj.timeSurvived.seconds >= 60) {
            playerObj.timeSurvived.minutes += 1; 
            playerObj.timeSurvived.seconds = 0; 
        }
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
    upgradebtn();
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();  
});
