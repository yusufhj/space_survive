/*-------------- Constants -------------*/
const MAX_LIVES = 99
const MAX_SPEED = 10

const player = {
    lives: 1,
    speed: 1,
    score: 0,
    timeSurvived: 0,
    pos: {
        x: 0,
        y: 0
    }
}

const game = {
    numOfEnemies: 1,
    enemiesPos: {
        x: [],
        y: []
    },
    shootingInterval: 1000,
    enemySpeed: 1,
    enemySpawnInterval: 5000,
    enemySpawnRate: 1
}


/*---------- Variables (state) ---------*/

// let lives = 1
// let speed = 1
// let score = 0
// let timeSurvived = 0
// let playerPos = {
//     x: 0,
//     y: 0
// }

/*----- Cached Element References  -----*/

// buttons
const startbtn = document.querySelector('#startbtn');
const restartbtn = document.querySelector('#restartbtn');

// upgrades
const upgradeLivesBtn = document.querySelector('#upgrade_lives_btn');
const upgradeSpeedBtn = document.querySelector('#upgrade_speed_btn');

// nav bar stats 
const livesStat = document.querySelector('#stat_lives');
const speedStat = document.querySelector('#stat_speed');
const timeStat = document.querySelector('#stat_time');
const scoreStat = document.querySelector('#stat_score');

// game over stats
const gameoverScoreStat = document.querySelector('#ui_game_over_score');
const gameoverTimeStat = document.querySelector('#ui_game_over_time');
const gameoverLivesStat = document.querySelector('#ui_game_over_lives');
const gameoverSpeedStat = document.querySelector('#ui_game_over_speed');

// elements
const startEl = document.querySelector('#start_ui');
const gameoverEl = document.querySelector('#gameover_ui');
const gameEl = document.querySelector('#game');
const ui = document.querySelector('.ui');
const canvas = document.querySelector('#game_canvas');

/*-------------- Functions -------------*/

// initailize game
function init() {
    // set player stats
    player.lives = lives
    player.speed = speed
    player.score = score
    player.timeSurvived = timeSurvived
    player.pos = playerPos

    // set game stats
    game.numOfEnemies = 1
    game.enemiesPos.x = []
    game.enemiesPos.y = []
    game.shootingInterval = 1000
    game.enemySpeed = 1
    game.enemySpawnInterval = 5000
    game.enemySpawnRate = 1
    render();
}

// render

// start game

// end game

// update time

// update score

// player movement

// player speed

// upgrades

// enemy movement

// enemy laser shooting

// laser hits: collision detection

// game loop


// play again

// 

/*----------- Event Listeners ----------*/

// start game
startbtn.addEventListener('click', function() {
    // hide start ui
    ui.style.display = 'none';
    startEl.style.display = 'none';
    gameEl.style.display = 'block';

    // initailize game

    // begin game loop
});


// play again
restartbtn.addEventListener('click', function() {
    // hide gameover ui

    // check if any upgrades were made

    // begin game loop again with new stats
});


// player movement: move up, down, left, right
const handleMove= document.addEventListener('keydown', function(e) {
    // move player
    if (e.key === 'ArrowUp') {
        // move up
    }
    if (e.key === 'ArrowDown') {
        // move down
    }
    if (e.key === 'ArrowLeft') {
        // move left
    }
    if (e.key === 'ArrowRight') {
        // move right
    }
    // check if player is within bounds
    // update player position
});


// upgrades: increase lives, speed
upgradeLivesBtn.addEventListener('click', function() {
    // check if player has enough score

    // increase lives
});

upgradeSpeedBtn.addEventListener('click', function() {
    // check if player has enough score

    // increase speed
});