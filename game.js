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

    console.log({canvasScale, elementsScale});
    game.font = elementsScale + 'px Verdana';
    game.textAlign = 'end';
    // game.fillText(emojis['PLAYER'], elementsScale * 2, elementsScale * 2.5);
    
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsScale, elementsScale * i);
    }

    // window.innerWidth
    // window.innerHeight
    // game.
    // game.fillRect(0,0,100,100);
    // game.clearRect(0,0,50,50);
    // game.font = "25px Verdana";
    // game.fillStyle = 'purple';
    // game.textAlign = '';
    // game.fillText('Platzi');
}