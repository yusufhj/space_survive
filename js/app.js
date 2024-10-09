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
    enemiesPos: {
        x: [Math.random() * window.innerWidth - 150],
        y: [Math.random() * window.innerHeight - 150]
    },
    shootingInterval: 1000,
    enemySpeed: 1,
    enemySpawnInterval: 5000,
    enemySpawnRate: 1,
    enemyLaserSpeed: 5,
    lasers: []
}


/*---------- Variables (state) ---------*/

let gameInterval;

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
    var player = new Image();
    player.src = '/assets/player.png';
    player.onload = function() {
        ctx.drawImage(player, playerObj.pos.x, playerObj.pos.y, 50, 50);
    }
}

// draw enemies
function drawEnemies() {
    var enemy = new Image();
    enemy.src = '/assets/spaceship.png';
    enemy.onload = function() {
        for (let i = 0; i < gameObj.numOfEnemies; i++) {
            ctx.drawImage(enemy, gameObj.enemiesPos.x[i], gameObj.enemiesPos.y[i], 150, 150);
        }
    }
}

// move enemies
function moveEnemies() {
    for (let i = 0; i < gameObj.numOfEnemies; i++) {
        const enemySpeed = gameObj.enemySpeed;
        const dx = playerObj.pos.x - gameObj.enemiesPos.x[i];
        const dy = playerObj.pos.y - gameObj.enemiesPos.y[i];
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            gameObj.enemiesPos.x[i] += (dx / distance) * enemySpeed;
            gameObj.enemiesPos.y[i] += (dy / distance) * enemySpeed;
        }
    }
}



/*-------------- Functions -------------*/

// initailize game
function init() {
    updateStats();
    render();
}

// render
function render() {
    drawCanvas();
    // render player
    drawEnemies();
    // render enemies
    drawPlayer();
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
        if (playerObj.pos.x < gameObj.enemiesPos.x[i] + 150 && 
            playerObj.pos.x + 50 > gameObj.enemiesPos.x[i] && 
            playerObj.pos.y < gameObj.enemiesPos.y[i] + 150 && 
            playerObj.pos.y + 50 > gameObj.enemiesPos.y[i]) {
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

    playerObj.pos.x = e.clientX - rect.left - 25;
    playerObj.pos.y = e.clientY - rect.top - 25;

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
    gameObj.enemiesPos.x = [Math.random() * window.innerWidth];
    gameObj.enemiesPos.y = [Math.random() * window.innerHeight];

    // restart the game
    clearInterval(gameInterval);  // Ensure old intervals are cleared
    gameInterval = setInterval(function() {
        playerObj.timeSurvived.seconds += 1;
        updateStats();
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
