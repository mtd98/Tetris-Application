document.addEventListener('DOMContentLoaded', () =>{
    class TetrisGame {
        constructor()  {
            // Initialize the game
            // Initialize the variables
            this.scoreDisplay = document.querySelector('#score');
            this.gridElement = document.querySelector('.grid');
            this.squares = Array.from(document.querySelectorAll('.grid div'));
            //set the width of the grid
            this.width = 10;

            this.timerId = null;
            //console.log(this.timerId);

            this.currentPosition = 4;
            this.currentRotation = 0;
            this.nextRandom = 0;
            this.score = 0;
            this.isPaused = false;
            this.gameOverCheck = false;

            // Create the grid and initialize the squares array
            for (let i = 0; i < 200; i++) {
                const divElement = document.createElement('div');
                this.gridElement.appendChild(divElement);
            }

            for (let i = 190; i < 200; i++) {
                const divElement = document.createElement('div');
                divElement.className = 'taken bottom-grid';
                this.gridElement.appendChild(divElement);
            }

            this.squares = Array.from(document.querySelectorAll('.grid div'));



            //console.log('Random:', this.random);
            //console.log('Current Rotation:', this.currentRotation);

            this.colours = [
                'orange',
                'red',
                'purple',
                'green',
                'blue'
            ]
    
            this.lShape = [
                //1st rotation 1-11-21-22 L
                [1, this.width+1, this.width*2+1, this.width*2+2],
    
                //2nd rotation 0-1-2-10 
                [0, 1, 2, this.width],
    
                //3rd rotation 0-1-11-21 ⅂
                [0, 1, this.width+1, this.width*2+1],
    
                //4th rotation 10-11-12-20
                [0, 1, 2, this.width]
            ]

            this.backwardslShape = [
                //1st rotation 1-11-20-21
                [1, this.width+1, this.width*2, this.width*2+1],
    
                //2nd rotation 0-10-11-12
                [0, this.width, this.width*1+1, this.width*1+2],
    
                //3rd rotation 0-1-10-20
                [0, 1, this.width, this.width*2],
    
                //4th rotation 0-1-2-12
                [0, 1, 2, this.width+2]
            ]
    
            this.zShape = [
                //1st rotation 11-12-20-21
                [this.width+1, this.width+2, this.width*2, this.width*2+1],
    
                //2nd rotation 0-10-11-21
                [0, this.width, this.width+1, this.width*2+1],
    
                //3rd rotation 11-12-20-21
                [this.width+1, this.width+2, this.width*2, this.width*2+1],
    
                //4th rotation 0-10-11-21
                [0, this.width, this.width+1, this.width*2+1]
            ]
    
            this.tShape = [
                //1st rotation 1-10-11-12
                [1, this.width, this.width+1, this.width+2],
    
                //2nd rotation 1-11-12-21
                [1, this.width+1, this.width+2, this.width*2+1],
    
                //3rd rotation 10-11-12-21
                [this.width, this.width+1, this.width+2, this.width*2+1],
    
                //4th rotation 10-1-11-21
                [this.width, 1, this.width+1, this.width*2+1],
            ]
    
            this.oShape = [
                //All rotations are the same
                [0, 1, this.width, this.width+1],
                [0, 1, this.width, this.width+1],
                [0, 1, this.width, this.width+1],
                [0, 1, this.width, this.width+1]
            ]
    
            this.iShape = [
                //1st rotation 1-11-21-31
                [1, this.width+1, this.width*2+1, this.width*3+1],
                //2nd rotation 10-11-12-13
                [this.width, this.width+1, this.width+2, this.width+3],
                //3rd rotation 1-11-21-31
                [1, this.width+1, this.width*2+1, this.width*3+1],
                //4th rotation 10-11-12-13
                [this.width, this.width+1, this.width+2, this.width+3]
            ]
    
            this.shapeTypes = [this.lShape, this.backwardslShape, this.zShape, this.tShape, this.oShape, this.iShape]
            //console.log(shapeTypes)

            this.undraw = () => {
                this.current.forEach((index) => {
                    this.squares[this.currentPosition + index].classList.remove('block');
                    this.squares[this.currentPosition + index].style.backgroundColor = '';
                });
            };
    
            this.draw = () => {
                this.current.forEach((index) => {
                    this.squares[this.currentPosition + index].classList.add('block');
                    this.squares[this.currentPosition + index].style.backgroundColor = this.colours[this.random];
                }); 
            };
    
            this.moveDown = () => {
                this.undraw();
                this.currentPosition += this.width;
                this.draw();
                this.freeze();
            };
    
            this.freeze = () => {
                // If the current shape is at the bottom of the grid or on top of a taken square, freeze the shape
                if (this.current.some(index => this.squares[this.currentPosition + index + this.width].classList.contains('taken'))) {
                    // Make the current shape taken
                    this.current.forEach(index => this.squares[this.currentPosition + index].classList.add('taken'));
                    // start a new shape falling
                    this.random = this.nextRandom;
                    this.nextRandom = Math.floor(Math.random() * this.shapeTypes.length);
                    this.current = this.shapeTypes[this.random][this.currentRotation];
                    this.currentPosition = 4;
                    this.draw();
                    this.displayShape();
                    this.addScore();
                    this.gameOver();
                }
            };
    
            this.moveLeft = () => {
                this.undraw();
                const isAtLeftEdge = this.current.some(index => (this.currentPosition + index) % this.width === 0);
    
                if (!isAtLeftEdge) this.currentPosition -= 1;
    
                if (this.current.some(index => this.squares[this.currentPosition + index].classList.contains('taken'))) {
                    this.currentPosition += 1;
                }
                this.draw();
            };
    
            this.moveRight = () => {
                this.undraw();
                const isAtRightEdge = this.current.some(index => (this.currentPosition + index) % this.width === this.width - 1);
                if (!isAtRightEdge) this.currentPosition += 1;
    
                if (this.current.some(index => this.squares[this.currentPosition + index].classList.contains('taken'))) {
                    this.currentPosition -= 1;
                }
                this.draw();
            };
    
            this.rotate = () => {
                this.undraw();
                this.currentRotation++;
                if (this.currentRotation === this.current.length) {
                    this.currentRotation = 0;
                }
                this.current = this.shapeTypes[this.random][this.currentRotation];
                this.draw();
            };

            // Start the game loop
            this.timerId = setInterval(() => {
                this.moveDown();
            }, 500);

            this.pauseGame = () => {
                console.log('Game Paused from pausegame');
                
                clearInterval(this.timerId);
                this.timerId = null;

                this.isPaused = true;
                console.log(this.isPaused);

                const pauseOverlay = document.getElementById('pauseOverlay');
                pauseOverlay.style.display = ''; // Show the settings overlay

                const confirmExitBtn = document.getElementById('exitPauseBtn');
                confirmExitBtn.addEventListener('click', () => {
                    console.log('Open Confirm Exit Menu');
                    pauseOverlay.style.display = 'none'; // Hide the settings overlay
                    const confirmExitMenu = document.getElementById('exitConfirmOverlay');
                    confirmExitMenu.style.display = ''; // Show the startup menu

                    const confirmExitYesBtn = document.getElementById('exitYesBtn');
                    confirmExitYesBtn.addEventListener('click', () => {
                        console.log('Exiting the game...');
                        const startupMenu = document.getElementById('startupMenu');
                        startupMenu.style.display = ''; // Show the startup menu
                        confirmExitMenu.style.display = 'none'; // Hide the settings overlay

                        // Add code to restart the game background and score


                    });
                    const confirmExitNoBtn = document.getElementById('exitNoBtn');
                    confirmExitNoBtn.addEventListener('click', () => {
                        console.log('Resuming the game...');
                        confirmExitMenu.style.display = 'none'; // Hide the settings overlay
                        if (this.isPaused === true) {
                            console.log('Game Resumed from no confirm exit');
                            this.timerId = null
                            this.resumeGame();
                        } else if (this.isPaused === false) {
                            this.pauseGame();
                        }
                    });

                });
            }
    
            this.resumeGame= () => {
                console.log('Game Resumed from resumegame');
                this.timerId = null;
                this.timerId = setInterval(() => {
                    this.moveDown();
                }, 500);
                pauseOverlay.style.display = 'none'; // Hide the settings overlay
                this.isPaused = false;
                console.log(this.isPaused);
            }

            // Assign functions to keyCodes
            document.addEventListener('keyup', (e) => {
                this.control(e);
            });

            this.displaySquares = document.querySelectorAll('.mini-grid div');
            this.displayWidth = 4;
            this.displayIndex = 0;

            this.upNextShapes = [
                [1, this.displayWidth + 1, this.displayWidth * 2 + 1, 2], // lShape
                [1, this.width+1, this.width*2, this.width*2+1], //backwards lshape
                [0, this.displayWidth, this.displayWidth + 1, this.displayWidth * 2 + 1], // zShape
                [1, this.displayWidth, this.displayWidth + 1, this.displayWidth + 2], // tShape
                [0, 1, this.displayWidth, this.displayWidth + 1], // oShape
                [1, this.displayWidth + 1, this.displayWidth * 2 + 1, this.displayWidth * 3 + 1], // iShape
            ];
            
            this.random = Math.floor(Math.random() * this.shapeTypes.length); // Ensure this.random is set correctly
            this.current = this.shapeTypes[this.random][this.currentRotation]; // Initialize this.current
            // Show the initial shape and next shape in the preview area
            this.draw();
            this.displayShape();
        }

        freeze(){
            //if block has settled
            if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
                //make it block
                current.forEach(index => squares[currentPosition + index].classList.add('taken'))
                //start a new shape falling
                random = nextRandom
                nextRandom = Math.floor(Math.random()*shapeTypes.length)
                current = shapeTypes[random][currentRotation]
                currentPosition = 4
                //draw the new shape
                draw()
                //display the next shape
                displayShape()
                //add score
                addScore()
                //check for game over
                gameOver()
            }
        }

        control(e) {
            if (this.gameOverCheck === true) {
                return;
            } else if (this.gameOverCheck === false) {
                if (e.keyCode === 37) {
                    this.moveLeft();
                } 
                else if (e.keyCode === 65) {
                    this.moveLeft();
                }

                else if (e.keyCode === 38) {
                    this.rotate();
                } 
                else if (e.keyCode === 87) {
                    this.rotate();
                }
                
                else if (e.keyCode === 39) {
                    this.moveRight();
                } 
                else if (e.keyCode === 68) {
                    this.moveRight();
                }
                
                else if (e.keyCode === 40) {
                    this.moveDown();
                } 
                else if (e.keyCode === 83) {
                    this.moveDown();
                }


                else if (e.keyCode === 27) {
                    if (this.isPaused === false) {
                        this.pauseGame();
                        this.isPaused = true;
                        console.log(this.isPaused);
                    } else {
                        this.resumeGame();
                        this.isPaused = false;
                        console.log(this.isPaused);
                    }
                }
                else if (e.keyCode === 80) {
                    if (this.isPaused === false) {
                        this.pauseGame();
                        this.isPaused = true;
                        console.log(this.isPaused);
                    } else {
                        this.resumeGame();
                        this.isPaused = false;
                        console.log(this.isPaused);
                    }
                }
            }
        }

        displayShape() {
            // Display the next shape in the preview area
            this.displaySquares.forEach((square) => {
                square.classList.remove('block');
                square.style.backgroundColor = '';
            });
            this.upNextShapes[this.nextRandom].forEach((index) => {
                this.displaySquares[this.displayIndex + index].classList.add('block');
                this.displaySquares[this.displayIndex + index].style.backgroundColor = this.colours[this.nextRandom];
            });
        }

        displayScore() {
            this.scoreDisplay.innerHTML = this.score;
        }    
        
        
        addScore() {
            for (let i = 0; i < 199; i += this.width) {
                const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
                
                // If every square in the row is taken, increment the score by 10 and remove the row
                if (row.every((index) => this.squares[index].classList.contains('taken'))) {
                this.score += 10;
                this.displayScore();
                row.forEach((index) => {
                    this.squares[index].classList.remove('taken');
                    this.squares[index].classList.remove('block');
                    this.squares[index].style.backgroundColor = '';
                });
        
                const squaresRemoved = this.squares.splice(i, this.width);
                this.squares = squaresRemoved.concat(this.squares);
                this.squares.forEach((cell) => this.gridElement.appendChild(cell));
                }
            }
        }

        /*restartGame() {
            this.score = 0;
            //reset all grid
            if 
            this.squares[index].classList.remove('taken');
            this.squares[index].classList.remove('block');
            this.squares[index].style.backgroundColor = '';
            


        }*/

        gameOver() {
            if (this.current.some((index) => this.squares[this.currentPosition + index].classList.contains('taken'))) {
                this.scoreDisplay.innerHTML = 'Game Over';
                this.gameOverCheck = true;
                clearInterval(this.timerId);                
                const gameOverOverlay = document.getElementById('gameOverOverlay');
                gameOverOverlay.style.display = ''; // Show the settings overlay

            }
        } 
    }

    class StartupMenu {
        constructor() {
            const startGameBtn = document.getElementById('startGameBtn');
            const topScoreBtn = document.getElementById('topScoreBtn');
            const settingsBtn = document.getElementById('settingsBtn');
            const exitBtn = document.getElementById('exitBtn');
        
            startGameBtn.addEventListener('click', this.startGame.bind(this));
            topScoreBtn.addEventListener('click', this.openTopScore.bind(this));
            settingsBtn.addEventListener('click', this.openSettings.bind(this));
            exitBtn.addEventListener('click', this.exit.bind(this));
        }
        
        startGame() {
            // Add code to start the game, e.g., navigate to the game page.
            console.log('Starting the game...');
            const overlay = document.querySelector('.overlay');
            overlay.style.display = 'none';
            const tetrisGame = new TetrisGame();
            tetrisGame; //start the game
        }
    
        openSettings() {
            // Add code to open the settings, e.g., display a settings overlay.
            console.log('Opening settings...');

            const settingsOverlay = document.getElementById('settingsOverlay');
            settingsOverlay.style.display = ''; // Show the settings overlay

            const settingsGoBackBtn = document.getElementById('settingsGoBackBtn');
            settingsGoBackBtn.addEventListener('click', () => {
              settingsOverlay.style.display = 'none'; // Hide the settings overlay
              const startupMenu = document.getElementById('startupMenu');
              startupMenu.style.display = ''; // Show the startup menu
            });
        }
    
        openTopScore() {
            // Add code to open the settings, e.g., display a settings overlay.
            console.log('Opening Top Score...');
            const scoreOverlay = document.getElementById('scoreOverlay');
            scoreOverlay.style.display = ''; // Show the score overlay

            const topScoreGoBackBtn = document.getElementById('topScoreGoBackBtn');
            topScoreGoBackBtn.addEventListener('click', () => {
              scoreOverlay.style.display = 'none'; // Hide the settings overlay
              const startupMenu = document.getElementById('startupMenu');
              startupMenu.style.display = ''; // Show the startup menu
            });
        }
        

        exit() {
        // Add code to exit the game, e.g., close the window or redirect to another page.
        console.log('Exiting the game...');
        if (window.close()) {
            // The window was closed successfully.
            console.log("Window closed successfully.");
          } else {
            window.location.href = "https://www.google.com"; // Replace with the URL you want to navigate to.
            console.log("Window close failed.");
          }
        }
    }

    const startupMenu = new StartupMenu();
});
