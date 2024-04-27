import { Player } from "../models/player.js";

import { keys } from "../app.js";

export class Game {
    playerNickname;

    constructor(canvas, nick) {
        
        this.canvas = canvas;
        this.nome = nick;
        this.ctx = canvas.getContext('2d');
        this.player = new Player("me", 200, 200);
        
        
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //this.canvas.style.backgroundImage = "url('" + this.config.BACKGROUND_IMG_SRC + "')";
        //this.canvas.style.backgroundSize = "contain";

       
    }

    move(deltaTime){

        if(keys.UP){
            this.player.y -= this.player.velocity*deltaTime  
        } 
        if(keys.DOWN){
            this.player.y += this.player.velocity*deltaTime
        } 
        if(keys.LEFT){
            this.player.x -= this.player.velocity*deltaTime
            this.player.lastDir = 'a'
        } 
        if(keys.RIGHT){
            this.player.x += this.player.velocity*deltaTime
            this.player.lastDir = 'd'
        }

        console.log(keys);


        


    }

    update(deltaTime) {
        

        this.move(deltaTime);
        this.player.update()
        
             
            
        
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(this.player.health > 0){
            this.player.draw(this.ctx);
        }
        
        
    }

}