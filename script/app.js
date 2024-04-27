import { Game } from "./logic/game.js";

let canvas = document.getElementById('board');

let nick = window.prompt("Inserisci NOME: ");

let g = new Game(canvas, nick);

g.init();

let deltaTime
let lastTimeStamp

function runGame(timeStamp) {

    deltaTime = timeStamp-lastTimeStamp;

    lastTimeStamp = timeStamp
    g.draw();
    g.update(deltaTime);

    
    
    requestAnimationFrame(runGame);
}

export const keys = {

    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false

}




window.onload = runGame;

window.addEventListener("keydown", (e)=>{

    if(e.key === 'w'){
        keys.UP = true;

    }

    if(e.key === 's'){
        keys.DOWN = true;
    }

    if(e.key === 'a'){
        keys.LEFT = true;
    }

    if(e.key === 'd'){
        keys.RIGHT = true;
        
    }



});
window.addEventListener("keyup", (e)=>{

    if(e.key === 'w'){
        keys.UP = false;

    }

    if(e.key === 's'){
        keys.DOWN = false;
    }

    if(e.key === 'a'){
        keys.LEFT = false;
    }

    if(e.key === 'd'){
        keys.RIGHT = false;
    }


});


