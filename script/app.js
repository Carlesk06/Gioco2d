import { Game } from "./logic/game.js";

let canvas = document.getElementById('board');

let nick = window.prompt("Inserisci NOME: ");

let g = new Game(canvas, nick);

g.init();

let deltaTime
let lastTimeStamp
let isShoothing = false;

function runGame(timeStamp) {

    deltaTime = timeStamp-lastTimeStamp;

    lastTimeStamp = timeStamp
    g.draw();
    g.update(deltaTime, isShoothing);

    
    
    requestAnimationFrame(runGame);
}

export const keys = {

    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
    SPACE: false,
    RELOAD: false

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

    if(e.key === ' ' ){
        keys.SPACE = true;
        
    }

    if(e.key === 'r' ){
        keys.RELOAD = true;
        console.log("Ricarica");
        
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

    if(e.key === ' '){
        keys.SPACE = false;
        
        
    }
    if(e.key === 'r'){
        keys.RELOAD = false;
        
        
    }


});



