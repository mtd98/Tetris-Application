# Tetris Game
## How to Play
To play the game, follow these instructions:

1. Locate the code files.
2. Open `index.html` in your web browser.
3. Click play and use the arrow keys to move the falling shapes.
4. Press the "W" or the upwards arrow key to rotate the Tetrimino.
5. Try to complete full rows to score points.
6. The game ends when the shapes stack up to the top of the grid. 

## Structure
The structure follows a structured organization:
- `index.html`(153 Lines): The main HTML file for the game interface. There is a range of elemenet IDs and classes used in the app.js file.
- `styles.css`(282 Lines): CSS styles for the game interface. This uses classes and IDs from the HTML file to style the game.
- `app.js`(898 Lines): The main JavaScript file for game logic. This file contains all the logic for the game, including the game loop, the game grid, the shapes, and the configuration settings.
- `/Assets`: Any assets used in the game (e.g.audio file).

## Consistent Naming Convention
To maintain clarity and consistency in the codebase, I follow these naming conventions:

### Classes (JavaScript)

- Class names use CapitalCamelCase (e.g., `TetrisGame`, `StartupMenu`).

### Methods and Functions (JavaScript)

- Method and function names use lowerCamelCase (e.g., `startGame()`, `openConfiguration()`).

### Variables (JavaScript)

- Variable names use lowerCamelCase (e.g., `mainMenuStartGameBtn`, `configureGameModeSelect`).

### IDs (HTML/CSS)

- IDs names in HTML and CSS use lowerCamelCase (e.g., `gameType`, `currentScore`).

### Classes (HTML/CSS)

- IDs and class names in HTML and CSS use kebab-case (e.g., `game-container`, `start-button`).