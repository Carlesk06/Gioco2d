import { Player } from "../models/player.js";
import { Enemy } from "../models/enemy.js";
import { keys } from "../app.js";

export class Game {
    playerNickname;

    constructor(canvas, nick) {
        
        this.canvas = canvas;
        this.nome = nick;
        this.ctx = canvas.getContext('2d');
        this.player = new Player("me", 200, 800);

        this.enemies = []
        for(let i=1; i< 4 ; i++){

            let criminal = new Enemy(400*i, this.player.y )
            this.enemies.push(criminal)

        }
        
        
        
    }

    init() {
        this.canvas.style.position = 'absolute';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //this.canvas.style.backgroundImage = "url('" + this.config.BACKGROUND_IMG_SRC + "')";
        //this.canvas.style.backgroundSize = "contain";
        
        this.backgroundImage= document.getElementById("Sfondo");

       
    }
    
    move(deltaTime){

        if(this.player.y > window.innerHeight/2){
           

            if(keys.UP){
                this.player.y -= this.player.velocity*deltaTime  
            } 
        }
            if(keys.DOWN){

                this.player.y += this.player.velocity*deltaTime
            } 
            if(keys.LEFT){
                if(this.player.x < 0-this.player.width){
                    this.player.x = window.innerWidth
                }
                
                this.player.x -= this.player.velocity*deltaTime
                this.player.lastDir = 'a'
            } 
            if(keys.RIGHT){
                if(this.player.x > window.innerWidth ){
                    this.player.x = 0 -this.player.width
                }
                this.player.x += this.player.velocity*deltaTime
                this.player.lastDir = 'd'
            }
            if(keys.SPACE){
                
                this.player.shoot(this.ctx)
                
            
            }
            if(keys.RELOAD){
                
                this.player.reload()
                
            
            }
        

        //console.log(keys);


        

        }
    

    update(deltaTime, isShoothing) {
        

        this.move(deltaTime);
        
        this.player.update(deltaTime);
        this.enemies.forEach((e)=>{
            e.update(this.player, deltaTime)
        })

        this.enemies.forEach((e)=>{
            this.player.bullets.forEach((b)=>{
                
                b.checkCollision(e);
                
            })
        })
        
             
            
        
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        if(this.player.health > 0){
            this.player.draw(this.ctx);
        }
        this.enemies.forEach((e)=>{

            e.draw(this.ctx)
        })
        
    }

}