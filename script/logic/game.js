import { Player } from "../models/player.js";
import { Enemy } from "../models/enemy.js";
import { keys } from "../app.js";

export class Game {
    playerNickname;

    constructor(canvas, nick) {
        
        this.canvas = canvas;
        this.nome = nick;
        this.ctx = canvas.getContext('2d');
        this.player = new Player("me", window.innerWidth/2, 800);

        this.enemies = []
        for(let i=1; i< 4 ; i++){

            let criminal = new Enemy(600*i, this.player.y )
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
        if(this.player.y < window.innerHeight-this.player.height){
            if(keys.DOWN){

                this.player.y += this.player.velocity*deltaTime
            } 
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

        for(let i = 0; i < this.enemies.length; i++){
            const e = this.enemies[i];
            if(!e.alive){
                this.enemies.splice(i,1)
            }
        }

        console.log(this.enemies.length);
        if(this.enemies.length < 3){
            let ds= Math.floor(Math.random()* 10 +1);
            console.log(ds);
            if(ds%2==0){

                this.enemies.push(new Enemy(window.innerWidth+300, 800))
            }else{

                this.enemies.push(new Enemy(0-100, 800))
            }

            
            console.log("in arrivo");
        }
             
            
        
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