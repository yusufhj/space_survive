/*-------------- Constants -------------*/
const MAX_LIVES = 99

const playerObj = {
    lives: 1,
    score: 0,
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
        x: [Math.random() * window.innerWidth],
        y: [Math.random() * window.innerHeight]
    },
    shootingInterval: 1000,
    enemySpeed: 1,
    enemySpawnInterval: 5000,
    enemySpawnRate: 1
}


/*---------- Variables (state) ---------*/



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
    if (playerObj.lives === 0) {
        endGame();
    }
}

function spawnEnemies() {
    // for every 5 seconds, spawn an enemy
    setInterval(function() {
        gameObj.numOfEnemies += 1;
        gameObj.enemiesPos.x.push(Math.random() * window.innerWidth);
        gameObj.enemiesPos.y.push(Math.random() * window.innerHeight);
    }, gameObj.enemySpawnInterval);
}


// end game
function endGame() {
    // show game over ui
    ui.style.display = 'block';
    gameEl.style.display = 'none';
    gameoverEl.style.display = 'block';

    // update game over stats
    gameoverScoreStat.textContent = "Score: " + playerObj.score;
    gameoverTimeStat.textContent = "Time: " + playerObj.timeSurvived.minutes.toString() + "m " + playerObj.timeSurvived.seconds + "s";
    gameoverLivesStat.textContent = "Lives: " + playerObj.lives;
}

// player speed

// enemy movement

// enemy laser shooting

// laser hits: collision detection
function checkCollision() {
    // if player is hit by enemy laser
    // if player comes near the enemy ship

    // if player hits enemy ship
    for (let i = 0; i < gameObj.numOfEnemies; i++) {
        if (playerObj.pos.x < gameObj.enemiesPos.x[i] + 150 && 
            playerObj.pos.x + 50 > gameObj.enemiesPos.x[i] && 
            playerObj.pos.y < gameObj.enemiesPos.y[i] + 150 && 
            playerObj.pos.y + 50 > gameObj.enemiesPos.y[i]) {
            playerObj.lives -= 1;
            }
    }
}
// game loop

// play again


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
    setInterval(function() {
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

    init();
    gammeLoop();
});


// player movement: move up, down, left, right
// const handleMove= document.addEventListener('keydown', function(e) {
//     // move player
//     if (e.key === 'ArrowUp') {
//         playerObj.pos.y -= 1
//     }
//     if (e.key === 'ArrowDown') {
//         playerObj.pos.y += 1
//     }
//     if (e.key === 'ArrowLeft') {
//         playerObj.pos.x -= 1
//     }
//     if (e.key === 'ArrowRight') {
//         playerObj.pos.x += 1
//     }
//     // check if player is within bounds
//     // update player position
// });

// // when key pressed
// document.addEventListener('keydown', function(e) {
//     if (e.key === 'ArrowUp') {
//         playerObj.pos.y -= 1
//     }
//     if (e.key === 'ArrowDown') {
//         playerObj.pos.y += 1
//     }
//     if (e.key === 'ArrowLeft') {
//         playerObj.pos.x -= 1
//     }
//     if (e.key === 'ArrowRight') {
//         playerObj.pos.x += 1
//     }
    
//     // check if player is within bounds
//     // update player position
//     render();
// });

// // when key released
// document.addEventListener('keyup', function(e) {
//     switch(e.key) {
//         case 'ArrowLeft':
//             keys.left = false;
//             break;
//         case 'ArrowRight':
//             keys.right = false;
//             break;
//         case 'ArrowUp':
//             keys.up = false;
//             break;
//         case 'ArrowDown':
//             keys.down = false;
//             break;
//     }
// });


// upgrades
upgradeLivesBtn.addEventListener('click', function() {
    if (playerObj.score >= 10 && playerObj.lives < MAX_LIVES) {
        playerObj.lives += 1;
        playerObj.score -= 10;
        updateStats();
    }
});
