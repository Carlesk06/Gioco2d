import { Player } from "../models/player.js";
import { Enemy } from "../models/enemy.js";
import { keys } from "../app.js";



let startTime = new Date().getTime();

        function updateTimer() {
            let currentTime = new Date().getTime();
            let elapsedTime = currentTime - startTime;

            let minutes = Math.floor(elapsedTime / (1000 * 60));
            let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

            return ""+(minutes + " minuti " + seconds + " secondi");
        }

        setInterval(updateTimer, 1000);


export class Game {
    playerNickname;

    constructor(canvas, nick) {
        
        this.canvas = canvas;
        this.nome = nick;
        this.ctx = canvas.getContext('2d');
        this.player = new Player("me", window.innerWidth/2, 800);
        this.gameStart=true
        this.gameOver=false;
        this.startTime = new Date().getTime();
        this.eliminations = 0
        this.gmX= -200
        this.enemies = []
        for(let i=1; i< 0 ; i++){

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
        if(this.player.alive){
            if(this.player.y > window.innerHeight/2){

                //movimento con il mouse
                //this.player.x = vector.x
                //this.player.y = vector.y
            
                
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
            }
        

        //console.log(keys);


        

        }
    

    update(deltaTime, isShoothing) {



        if(this.player.health <= 0){
            this.player.alive = false
            this.gameOver=true
            
        }

        if(this.gameOver){
            this.gmX += 1.5
            if(this.gmX >  window.innerWidth +100){
                this.gmX = -200
            }
        }

        
        if( this.gameStart && this.gameOver == false){
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

            this.enemies.forEach((e)=>{
                e.bullets.forEach((b)=>{
                    
                    b.checkCollision(this.player);
                    
                    
                    
                })
            })

            

            for(let i = 0; i < this.enemies.length; i++){
                const e = this.enemies[i];
                if(!e.alive){
                    this.enemies.splice(i,1)
                    this.eliminations +=1;
                    
                    
                    this.player.health += 5;
                    if(this.player.health > this.player.HP){
                        this.player.health=this.player.HP
                    }
                }
            }

            console.log(this.enemies.length);
            if(this.enemies.length < 3){
                let ds= Math.floor(Math.random()* 10 +1);
                console.log(ds);
                if(ds%2==1){

                    this.enemies.push(new Enemy(window.innerWidth+300, Math.random()* (window.innerHeight - window.innerHeight/2) +window.innerHeight/2))
                }else{

                    this.enemies.push(new Enemy(0-100, Math.random()* (window.innerHeight - window.innerHeight/2) +window.innerHeight/2 ))
                }

                
                console.log("in arrivo");
            }
                
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
        
        this.ctx.fillStyle = "white"
        this.ctx.font = 30 +"px AcmeFont";
        this.ctx.fillText("Time: "+updateTimer() + "  " , window.innerWidth/8 , 100) 
        
        this.ctx.fillText("Nome: "+this.nome +"  ", window.innerWidth/3 , 100)
        this.ctx.fillText("Kills: "+ this.eliminations, window.innerWidth-300, 100)  

        if(this.gameOver){
            
            this.ctx.fillStyle = "red"
            this.ctx.font = 50 +"px AcmeFont";
            let tag = "sei un 'piedipiatti'"

            if(this.eliminations > 5){
                tag = "sei il 'Vigilante'"

            }else if(this.eliminations > 15){
                tag = "sei  uno 'sbirro'"

            }else if(this.eliminations > 20){
                tag = "sei lo 'SPAZZACADAVERI'"

            }else if(this.eliminations > 30){
                tag = " QUESTA STRADA E' TUA !"

            }



            this.ctx.fillText("Game Over ,  "+tag  ,this.gmX , 800)
        }
        
    }

}

