const gameBoard = []
let canvas = document.getElementById("game")
let ctx = canvas.getContext('2d')
let gameState = true

const Game = () => {
    ctx.font = '20px serif'
    ctx.textAlign = 'center'
    ctx.fillRect(0, 0, 410, 410)
    document.addEventListener('keyup', updateGameBoard)
    
    for (i = 0; i < 4; i ++) {
        gameBoard.push([])
        for (j = 0; j < 4; j++) {
            const tile = {}
            tile.score = 0
            tile.x = 2 * (j + 1) + 100 * j
            tile.y = 2 * (i + 1) + 100 * i
            gameBoard[i].push(tile)
        }
    }
    drawGame()
    generate()
    drawGame()
    if (!gameState) {
        return
    }
    return
}
function drawGame() {
    for (i = 0; i < 4; i ++) {
        for (j = 0; j < 4; j++) {
            setColor(gameBoard[i][j].score)
            ctx.fillRect(gameBoard[i][j].x, gameBoard[i][j].y, 100 , 100)
            ctx.fillStyle = '#000'
            ctx.fillText(gameBoard[i][j].score, gameBoard[i][j].x + 50, gameBoard[i][j].y + 50, 100)
        }
    }
}
function generate() {
    while (true) {
        let row = Math.floor(Math.random() * 4)
        let column = Math.floor(Math.random() * 4)
        if (gameBoard[row][column].score === 0) {
            gameBoard[row][column].score = 2
            break
        }
    }
}
function updateGameBoard(e) {
    console.log(gameState)
    if (!gameState) {
        return
    }
    if (gameState) {
        if (e.keyCode === 37) {
                moveLeft()
            } else if (e.keyCode === 38) {
                moveUp()
            } else if (e.keyCode === 39) {
                moveRight()
            } else if (e.keyCode === 40) {
                moveDown()
            }
        updateGameState()
        if (gameState) {
            generate()
            drawGame()
        }
    }  
}

function moveLeft() {
    for (i = 0; i < 4; i ++) {
        for (j = 0; j < 4; j++) {
            if (gameBoard[i][j].score === 0) {
                for (k = j + 1; k < 4; k++) {
                    if (gameBoard[i][k].score !== 0) {
                        gameBoard[i][j].score = gameBoard[i][k].score
                        gameBoard[i][k].score = 0
                        break
                    }
                }
            }
        }
        for (j = 0; j < 3; j++) {
            if (gameBoard[i][j].score === gameBoard[i][j + 1].score) {
                gameBoard[i][j].score = 2 * gameBoard[i][j].score  
                gameBoard[i][j + 1].score = 0
            }
        }
        for (j = 0; j < 4; j++) {
            if (gameBoard[i][j].score === 0) {
                for (k = j + 1; k < 4; k++) {
                    if (gameBoard[i][k].score !== 0) {
                        gameBoard[i][j].score = gameBoard[i][k].score
                        gameBoard[i][k].score = 0
                        break
                    }
                }
            }
        }
    }
}
function moveRight() {
    for (i = 0; i < 4; i ++) {
        for (j = 3; j >= 0; j--) {
            if (gameBoard[i][j].score === 0) {
                for (k = j - 1; k >= 0; k--) {
                    if (gameBoard[i][k].score !== 0) {
                        gameBoard[i][j].score = gameBoard[i][k].score
                        gameBoard[i][k].score = 0
                        break
                    }
                }
            }
        }
        for (j = 3; j > 0; j--) {
            if (gameBoard[i][j].score === gameBoard[i][j - 1].score) {
                gameBoard[i][j].score = 2 * gameBoard[i][j].score  
                gameBoard[i][j - 1].score = 0
            }
        }
        for (j = 3; j >= 0; j--) {
            if (gameBoard[i][j].score === 0) {
                for (k = j - 1; k >= 0; k--) {
                    if (gameBoard[i][k].score !== 0) {
                        gameBoard[i][j].score = gameBoard[i][k].score
                        gameBoard[i][k].score = 0
                        break
                    }
                }
            }
        }
    }
}
function moveUp() {
    for (i = 0; i < 4; i ++) {
        for (j = 0; j < 4; j++) {
            if (gameBoard[j][i].score === 0) {
                for (k = j + 1; k < 4; k++) {
                    if (gameBoard[k][i].score !== 0) {
                        gameBoard[j][i].score = gameBoard[k][i].score
                        gameBoard[k][i].score = 0
                        break
                    }
                }
            }
        }
        for (j = 0; j < 3; j++) {
            if (gameBoard[j][i].score === gameBoard[j + 1][i].score) {
                gameBoard[j][i].score = 2 * gameBoard[j][i].score  
                gameBoard[j + 1][i].score = 0
            }
        }
        for (j = 0; j < 4; j++) {
            if (gameBoard[j][i].score === 0) {
                for (k = j + 1; k < 4; k++) {
                    if (gameBoard[k][i].score !== 0) {
                        gameBoard[j][i].score = gameBoard[k][i].score
                        gameBoard[k][i].score = 0
                        break
                    }
                }
            }
        }
    }
}
function moveDown() {
    for (i = 0; i < 4; i ++) {
        for (j = 3; j >= 0; j--) {
            if (gameBoard[j][i].score === 0) {
                for (k = j - 1; k >= 0; k--) {
                    if (gameBoard[k][i].score !== 0) {
                        gameBoard[j][i].score = gameBoard[k][i].score
                        gameBoard[k][i].score = 0
                        break
                    }
                }
            }
        }
        for (j = 3; j > 0; j--) {
            if (gameBoard[j][i].score === gameBoard[j - 1][i].score) {
                gameBoard[j][i].score = 2 * gameBoard[j][i].score  
                gameBoard[j - 1][i].score = 0
            }
        }
        for (j = 3; j >= 0; j--) {
            if (gameBoard[j][i].score === 0) {
                for (k = j - 1; k >= 0; k--) {
                    if (gameBoard[k][i].score !== 0) {
                        gameBoard[j][i].score = gameBoard[k][i].score
                        gameBoard[k][i].score = 0
                        break
                    }
                }
            }
        }
    }    
}
function updateGameState() {
    let nonzeros = 0;
    for (i = 0; i < 4; i ++) {
        for (j = 0; j < 4; j++) {
            if (gameBoard[i][j].score !== 0) {
                nonzeros++;
            }
        }
    }
    if (nonzeros === 16) {
        gameState = false;
    }
}
function setColor(num) {
    if (num === 0) {
        ctx.fillStyle ='#CC0066'
    } else if (num % 64 === 0) {
        ctx.fillStyle = '#FFFFCC'
    } else if (num % 32 === 0) {
        ctx.fillStyle = '#00CCCC'
    } else if (num % 16 === 0) {
        ctx.fillStyle= '#99FFFF'
    } else if (num % 8 === 0) {
        ctx.fillStyle = '#00FF00'
    } else if (num % 4 === 0) {
        ctx.fillStyle = '#CCFF99'
    } else if (num % 2 === 0) {
        ctx.fillStyle = '#FFFF33'
    }
}
export default Game

