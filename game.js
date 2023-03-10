const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btns = document.querySelector('.btns')
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result')
const finalText = document.querySelector('.messages')


let canvasScale;
let elementsScale;
let level = 0;
let lives = 3;
let timeStart;
let timeInterval;
let enemiesPosition = []

const playerPosition = {
x: undefined,
y: undefined,
};
const giftPosition = {
x: undefined,
y: undefined,
};


window.addEventListener('load', setCanvasScale);
window.addEventListener('resize', setCanvasScale);


function setCanvasScale() {

    if (window.innerHeight > window.innerWidth) {
    canvasScale = window.innerWidth * 0.8;
    } else {
    canvasScale = window.innerHeight * 0.8;
    }

canvasScale = Number(canvasScale.toFixed(0));

canvas.setAttribute('width', canvasScale);
canvas.setAttribute('height', canvasScale);

elementsScale = Number((canvasScale / 10).toFixed(0));

playerPosition.x = undefined;
playerPosition.y = undefined;

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

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
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
    const posX = Number(elementsScale * (colI + 1).toFixed(0));
    const posY = Number(elementsScale * (rowI + 1).toFixed(0));

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
    const giftCollisionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
    const giftCollisionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) levelComplete();   

    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = Number(enemy.x.toFixed(1)) == Number(playerPosition.x.toFixed(1)) 
        const enemyCollisionY = Number(enemy.y.toFixed(1)) == Number(playerPosition.y.toFixed(1))
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
        timeStart = undefined; 
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
    clearInterval(timeInterval);
    hideMapAndBtns();
    

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Number(((Date.now() - timeStart) / 1000).toFixed(1));

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = 'superaste el record';
    } else {
            pResult.innerHTML = 'No superaste el record';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        spanRecord.innerHTML = playerTime
    }

    console.log({recordTime, playerTime});
}
function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(lives)
}
function showTime() {
    spanTime.innerHTML = Number(((Date.now() - timeStart) / 1000).toFixed(1));
}
function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time')
}
function hideMapAndBtns() {
    canvas.classList.add('toggle')
    btns.classList.add('toggle')
    finalText.classList.add('final')
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
    // console.log('I want to go up');

    if ((playerPosition.y - elementsScale) < elementsScale) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementsScale;
    startGame();
    }
}
function moveLeft() {
    // console.log('I want to go to the left');

    if ((playerPosition.x - elementsScale) < elementsScale) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsScale;
        startGame();
    }
}
function moveRight() {
    // console.log('I want to go to the right');

    if ((playerPosition.x + elementsScale) > canvasScale) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsScale;
        startGame();
}
}
function moveDown() {
    // console.log('I want to go down');

    if ((playerPosition.y + elementsScale) > canvasScale) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsScale;
        startGame();
    }
}

