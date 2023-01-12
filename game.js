const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')

let canvasScale;
let elementsScale;
let level = 0;
let lives = 3;

const playerPosition = {
x: undefined,
y: undefined,
};
const giftPosition = {
x: undefined,
y: undefined,
};
let enemiesPosition = []

window.addEventListener('load', setCanvasScale);
window.addEventListener('resize', setCanvasScale);

function setCanvasScale() {
    if (window.innerHeight > window.innerWidth) {
    canvasScale = window.innerWidth * 0.8;
    } else {
    canvasScale = window.innerHeight * 0.8;
    }

canvas.setAttribute('width', canvasScale);
canvas.setAttribute('height', canvasScale);

elementsScale = canvasScale / 10;

startGame();
}

function startGame() {
//   console.log({ canvasScale, elementsScale });

    game.font = elementsScale + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameComplete();
        return;
    }

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    //   console.log({map, mapRows, mapRowCols});

    showLives();

    enemiesPosition = [];
    game.clearRect(0,0,canvasScale, canvasScale);

    mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
    const emoji = emojis[col];
    const posX = elementsScale * (colI + 1);
    const posY = elementsScale * (rowI + 1);

    if (col == 'O') {
    if (!playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX;
        playerPosition.y = posY;
    console.log({playerPosition});
    }
    } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
    } else if (col == "X") {
        enemiesPosition.push({
            x: posX,
            y: posY
        });
    }

    game.fillText(emoji, posX, posY);
    });
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) levelComplete();   

    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3) 
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3) 
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}


function levelFail() {
    console.log('beep');
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}
function levelComplete() {
    console.log('You have complete te level');
    level++
    startGame();
}
function gameComplete() {
    console.log('terminaste el juego');
}
function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']); // [1,2,3]

    spanLives.innerHTML = ''
    heartsArray.forEach(heart => spanLives.append(heart))
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
    console.log('I want to go up');

    if ((playerPosition.y - elementsScale) < elementsScale) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementsScale;
    startGame();
    }
}
function moveLeft() {
    console.log('I want to go to the left');

    if ((playerPosition.x - elementsScale) < elementsScale) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsScale;
        startGame();
    }
}
function moveRight() {
    console.log('I want to go to the right');

    if ((playerPosition.x + elementsScale) > canvasScale) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsScale;
        startGame();
}
}
function moveDown() {
    console.log('I want to go down');

    if ((playerPosition.y + elementsScale) > canvasScale) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsScale;
        startGame();
    }
}