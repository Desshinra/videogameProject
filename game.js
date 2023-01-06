const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame)
window.addEventListener('resize', setCanvasScale)

let canvasScale;
let elementsScale = canvasScale / 10;

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
    
    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapColsSinceRows = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapColsSinceRows});

    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapColsSinceRows[row - 1][col -1]], elementsScale * col, elementsScale * row);
        }
    }

}