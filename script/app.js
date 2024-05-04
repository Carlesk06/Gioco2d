import { Game } from "./logic/game.js";

let canvas = document.getElementById('board');

/*
Sparatutto, elimina i nemici per ottenere punti vita e punti
ogni range di eliminazioni conferisce un titolo che verrà mostrato una volta terminata la partita
il player viene eliminato allo svuotamento della barra della vita
ogni tot colpi, sarà necessario ricaricare con 'R'.

Il gioco è inoltre riavviabile.
*/

let g = new Game(canvas);

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
    RELOAD: false,
    RESTART: false

}

export function resetKeys() {
    for (let key in keys) {
        if (keys.hasOwnProperty(key)) {
            keys[key] = false;
        }
    }
}





window.onload = runGame;

window.addEventListener("keydown", (e)=>{

    if(e.key === 'w'|| e.key === 'W'){
        keys.UP = true;

    }

    if(e.key === 's'|| e.key === 'S'){
        keys.DOWN = true;
    }

    if(e.key === 'a'|| e.key === 'A'){
        keys.LEFT = true;
    }

    if(e.key === 'd' || e.key === 'D'){
        keys.RIGHT = true;
        
    }

    if(e.key === ' ' ){
        keys.SPACE = true;
        
    }

    if(e.key === 'r' || e.key === 'R'){
        keys.RELOAD = true;
        
        
    }

    if(e.key === 't' || e.key === 'T'){
        keys.RESTART= true;
        
        
    }



});

window.addEventListener("keyup", (e)=>{

    if(e.key === 'w' || e.key === 'W'){
        keys.UP = false;

    }

    if(e.key === 's' || e.key === 'S'){
        keys.DOWN = false;
    }

    if(e.key === 'a' || e.key === 'A'){
        keys.LEFT = false;
    }

    if(e.key === 'd' || e.key === 'D'){
        keys.RIGHT = false;
    }

    if(e.key === ' '){
        keys.SPACE = false;
        
        
    }
    if(e.key === 'r' || e.key === 'R'){
        keys.RELOAD = false;
        
        
    }
    if(e.key === 't' || e.key === 'T'){
        keys.RESTART= false;
        
        
    }


});



