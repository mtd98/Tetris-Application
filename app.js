document.addEventListener('DOMContentLoaded', () =>{
    class TetrisGame {
        constructor()  {
            this.scoreDisplay = document.querySelector('#score');
            this.gridElement = document.querySelector('.grid');
            this.squares = Array.from(document.querySelectorAll('.grid div'));
            this.width = 10;
            this.timerId = null;
            this.currentPosition = 4;
            this.currentRotation = 0;
            this.nextRandom = 0;
            this.score = 0;

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
                //1st rotation 1-2-11-21
                [1, 2, this.width+1, this.width*2+1],
    
                //2nd rotation 10-11-12-22
                [this.width, this.width+1, this.width+2, this.width*2+2],
    
                //3rd rotation 1-11-20-21
                [1, this.width+1, this.width*2, this.width*2+1],
    
                //4th rotation 10-20-21-22
                [this.width, this.width*2, this.width*2+1, this.width*2+2]
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
    
            this.shapeTypes = [this.lShape, this.zShape, this.tShape, this.oShape, this.iShape]
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
                if (this.current.some(index => this.squares[this.currentPosition + index + this.width].classList.contains('taken'))) {
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

            // Assign functions to keyCodes
            document.addEventListener('keyup', (e) => {
                this.control(e);
            });

            this.displaySquares = document.querySelectorAll('.mini-grid div');
            this.displayWidth = 4;
            this.displayIndex = 0;

            this.upNextShapes = [
                [1, this.displayWidth + 1, this.displayWidth * 2 + 1, 2], // lShape
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
            if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
                current.forEach(index => squares[currentPosition + index].classList.add('taken'))
                //start a new shape falling
                random = nextRandom
                nextRandom = Math.floor(Math.random()*shapeTypes.length)
                current = shapeTypes[random][currentRotation]
                currentPosition = 4
                draw()
                displayShape()
                addScore()
                gameOver()
            }
        }

        control(e) {
            if (e.keyCode === 37) {
                this.moveLeft();
            } else if (e.keyCode === 38) {
                this.rotate();
            } else if (e.keyCode === 39) {
                this.moveRight();
            } else if (e.keyCode === 40) {
                this.moveDown();
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
          
        gameOver() {
            if (this.current.some((index) => this.squares[this.currentPosition + index].classList.contains('taken'))) {
                this.scoreDisplay.innerHTML = 'Game Over';
                clearInterval(this.timerId);
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


