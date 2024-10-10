# Space Survive

Welcome to the **Spaceship Survival**! In this game, you control a spaceship trying to survive against enemies that chase you. The objective is to avoid collisions with enemies while collecting points to upgrade your ship.

## Features

- **Player Control:** Move your spaceship with the mouse.
- **Enemies:** Avoid enemy spaceships that track your position.
- **Lives:** Start with a limited number of lives.
- **Score System:** Earn points for survival time and upgrade your ship.
- **Win Condition:** Survive for 10 minutes to win the game.
- **Game Over:** Lose all lives to end the game.

## Game Controls

- **Start Game:** Click the "Start" button to begin.
- **Mouse Movement:** Move the mouse to control the spaceship's position.
- **Upgrade Lives:** Click the upgrade button when you have enough points.
- **Game Over:** Click the "Restart" button to play again after losing all lives.

## Game Mechanics

1. The player moves the spaceship using the mouse.
2. Enemies spawn and move towards the player.
3. The player loses a life if colliding with an enemy.
4. Points are gained for every 30 seconds survived.
5. Win by surviving for 10 minutes; lose if all lives are lost.

## Game Objectives

- **Survive:** The primary goal is to survive as long as possible while avoiding enemy spaceships.
- **Score Points:** Gain points by surviving time increments (every 30 seconds).
- **Upgrade Lives:** Use points to upgrade your lives for better chances of survival.

## And this is how the idea started...

## GAME SKETCH
### Start Page
![alt text](./plan/start.png)

### In-Game Page
![alt text](./plan/ingame.png)

### Game Over Page
![alt text](./plan/over.png)


## USER STORIES

1. **Game Star**t: As a player, I navigate to the game interface and click the "Start Game" button to begin playing.
2. **Character Movement**: As a player, I use the arrow keys to move the rectangular spaceship around the grid, avoiding enemy laser bullets.
3. **Enemy Spawning**: As a player, I notice enemy spaceships spawn at random locations on the grid every 5 seconds, requiring me to adjust my movement strategy.
4. **Laser Shooting**: As a player, I see enemy spaceships shoot laser bullets toward my position at regular intervals, making it crucial for me to stay alert and dodge the incoming shots.
5. **Survival Time Tracking**: As a player, I keep an eye on the timer displaying how long I have survived, knowing that I will earn points based on my survival time.
6. **Point System**: As a player, I receive 1 point for every 30 seconds of survival, which is reflected in the score displayed at the top of the screen.
7. **Health Management**: As a player, I start with 1 health point, which decreases when I get hit by enemy laser bullets.
8. **Game Over Experience**: As a player, when I lose all my health, I see a game-over screen displaying my total score and the option to restart or exit the game.
9. **Upgrades After Game Over**: As a player, after the game ends, I have the option to upgrade my speed or health (lives) using the points I earned during the game, with a maximum of 99 upgrades for each category.
10. **Game UI Display**: As a player, I see my total score, the survival time, and the number of lives prominently displayed at the top of the page throughout the game, allowing me to track my progress easily.


## Pseudocode Plan

### **HTML Structure**
* **Start Button**:
    * A start button that will initiate the game when clicked
    * Appears in the center of the screen at first and disappear once the game starts (clicked).
* **Canvas for the Game display**:
    * This is where the game (player, enemy spaceships, lasers) will be rendered.
* **Nav Bar for Stats**:
    * Displayed at the top of the screen that shows the player's stats:
        * Score (Points)
        * Time Survived
        * Player Health (Lives <3)
        * Speed level


### **CSS Styling**
* **Space Environment**:
    * A background of a space theme
* **Player and Shooter Styles**:
    * The player as a small rectangle
    * The enemy Spaceships as simple circlar and oval shape as a spaceship with different colors.
* **Laser Shots**:
    * The laser shooters will be in an oval shape, with animations to move in a direction.
* **Responsive Layout**:
    * The canvas should be centered and the nav bar is positioned above the game.


### **JavaScript Game Logic**

#### **Initialization**:

* **Defining Constants and Variables**:
    * Setting up the constants of maximum lives, max speed, and time intervals, (maybe: enemy spawn rate, shooting rate).
    * Define variables for the state:
        * lives (initailized 1)
        * speed (initailized 1)
        * score (initailized 0)
        * timeSurvived (initailized 0)
        * (maybe) isGameRunning (to track whether the game is running or paused)
    * Store the player's position (x,y) and speed

* **Cache DOM Elements**:
    * Cache the start button, canvas, nav barr, and stat elements (score, time, health, speed) for updates.


#### **Game Flow**:

* **Start Button Event Listener**:
    * When the Start Button is clicked:
        * Hide the Start Button.
        * Initialize/reset game stats
        * Begin the game loop

* **Player Movement**: 
    * Event listeners for arrow keys or WASD to move player within the canvas.
    * Adjusting the player's position according to the speed variable.
    * Ensure the player stays within the canvas boundaries.


#### **Enemy and Laser Logic**:

* **Enemy Spawning**:
    * Set a 5 sec interval to spawn enemy spaceships at random positions around the grid.
    * Store each spawned enemy in an array for tracking.

* **Laser Shooting**:
    * Each enemy should shoot a laser towards the player at regular intervals.
    * (maybe) Calculate the direction of the laser based on the player's current position.
    * Move the lasers toward the player in each frame and check for collisions.

#### **Collision Detection**:

* **Laser Hits**:
    * For each frame, check if any lasers intersect with the player's position (the rectangle x,y borders)
    * If the laser hits the player, reduce the lives variable by 1.
    * If lives reaches 0, trigger the Game Over sequence.


### **Scoring and Timing System**

* **Time Survived**:
    * Using JavaScript's setInterval to count the time for every second.
    * For every 30 seconds the player survives, increment the score by 1.
    * Update the time survived and score displayed in the nav bar.

* **Upgrades**:
    * After each game:
        * Allowing the player to spend points to increase their speed or add more lives.
        * Ensuring that there's a maximum of 5 upgrades for each attribute (speed or health) after each game.
        * Update the nav bar to reflect the upgraded stats.


### **Game Over**

* **Game Over Sequence**:
    * If lives == 0 :
        * Stop the game loop (enemy spaceships spawning and movement).
        * Display a "Game Over" message with the player's final score and time survived.
        * Show the "Play Again" button to allow the user to restart the game.

* **Restart Game**:
    * Reset all variables (lives, speed, score, time) to their initial values.
    * Clear the canvas of enemies and lasers.
    * When the player clicks "Play Again", restart the game loop from the beginning.

