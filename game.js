const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

window.addEventListener('load', startGame)
window.addEventListener('resize', setCanvasScale)

let canvasScale;
let elementsScale = canvasScale / 10;

const playerPosition = {
    x: undefined,
    y: undefined
}

function setCanvasScale() {

    if(window.innerHeight > window.innerWidth) {
        canvasScale = window.innerWidth * 0.80;
    } else {
        canvasScale = window.innerHeight * 0.80;
    }

    canvas.setAttribute('width', canvasScale);
    canvas.setAttribute('height', canvasScale);

    elementsScale = canvasScale / 10;

    startGame();
}

function startGame() {

    game.font = elementsScale + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapColsSinceRows = mapRows.map(row => row.trim().split(''));
    // console.log({map, mapRows, mapColsSinceRows});

    game.clearRect(0, 0, canvasScale, canvasScale)
    mapColsSinceRows.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsScale * (colI + 1);
            const posY = elementsScale * (rowI + 1);

            if(col == 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }
            game.fillText(emoji, posX, posY);
        });
    }); 

    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', e => {
    if(e.key == 'ArrowUp') moveUp();
    else if(e.key == 'ArrowLeft') moveLeft();
    else if(e.key == 'ArrowRight') moveRight();
    else if(e.key == 'ArrowDown') moveDown();
});

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveUp() {
    console.log('I want to go up');
    if ((playerPosition.y - elementsScale) < elementsScale) {
        console.log('Out');
    } else {
        playerPosition.y -= elementsScale; 
        startGame();
    }
}
function moveLeft() {
    console.log('I want to go to the left');
    
    if ((playerPosition.x - elementsScale) < elementsScale) {
        console.log('Out');
    } else {
        playerPosition.x -= elementsScale; 
         startGame();
    }
}
function moveRight() {
    console.log('I want to go to the right');
    
    if ((playerPosition.x + elementsScale) > canvasScale) {
        console.log('Out');
    } else {
        playerPosition.x += elementsScale; 
            startGame();
    }
}
function moveDown() {
    console.log('I want to go down');
    
    if ((playerPosition.y + elementsScale) > canvasScale) {
        console.log('Out');
    }  else {
       playerPosition.y += elementsScale; 
    startGame(); 
    }
}