import { keys } from "../app.js";
import { Bullet } from "./bullet.js";


export class Player{
    name;
    score;
    velocity; // e non speed, mi raccomando
    
    

    constructor(nick, x, y) {
        
        
        this.name = nick;
        this.x = x;
        this.y=y;
        this.height = 80;
        this.width = 60;
        this.velocity=0.5;
        this.HP = this.width
        this.health = this.HP;
        this.lastDir = 'd'
        this.pistolaD = document.getElementById("pistolD");
        this.pistolaA = document.getElementById("pistolA");
        this.vampaD = document.getElementById("vampD");
        this.vampaA = document.getElementById("vampA");
        this.bullets = []
        this.alive = true;
        this.isShothing = false;
        this.sparoSound = new Audio("assets/shoot.mp3")
        this.ricarica = new Audio("assets/reload.mp3")
        this.MAGAZINE = 12;
        this.ammo = 12;
        this.outOfAmmo= new Audio("assets/outOfAmmo.mp3");

    } 

    shoot(ctx, sparoSound) {
        console.log("Colpo");
        
        if(this.alive && this.isShothing == false && this.ammo > 0){
            this.sparoSound.currentTime = 0;
            if(this.lastDir == 'd'){
                let proiettile = new Bullet(this.x + this.width+60, this.y+ this.height/3+2,this.lastDir)
                
                this.bullets.push(proiettile)
            }else{

                let proiettile = new Bullet(this.x - 70, this.y+ this.height/3+2,this.lastDir)
                this.bullets.push(proiettile)
            }
            this.ammo -= 1;
            this.sparoSound.play()
            this.isShothing = true;
        }else{
            
            if(this.ammo==0){
                this.outOfAmmo.play()
                
            }
           
        }
            
        
    }

    reload(){
        this.ricarica.play()
        if(this.ammo < this.MAGAZINE){
            this.ammo++
            
        }
    }


    drawMuzzle(ctx){
        
        
    }

    draw(ctx) {
        if(this.alive){
            //disegno personaggio
            ctx.fillStyle = "black"
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "gray"
            ctx.fillRect(this.x, this.y +this.height/2, this.width, this.height/4);
            ctx.fillStyle = "blue"
            ctx.fillRect(this.x, this.y+ this.height/3, this.width, this.height/3);
            ctx.fillStyle = "pink"
            ctx.fillRect(this.x, this.y+ (this.height * 10)/100 , this.width, this.height/3);
            ctx.fillStyle = "white"
            ctx.font = this.width/4.5 +"px Verdana";
            ctx.fillText("POLIZIA", this.x, this.y + this.height/1.5 , this.width*2)

            this.bullets.forEach((b)=>b.draw(ctx))

            
            if(this.isShothing){

                if(this.lastDir == 'd'){

                    ctx.drawImage(this.vampaD,this.x + this.width+60 , this.y + this.height/3-26, 60, 60)
                }
                if(this.lastDir == 'a'){
                    
                    ctx.drawImage(this.vampaA,this.x -120 , this.y + this.height/3-26, 60, 60)
                }


            }
            

            //braccia
            if(this.lastDir == 'd'){

                ctx.fillStyle = "blue"
                ctx.fillRect(this.x + this.width, this.y+ this.height/2.3, this.width/4, this.height/6);
                ctx.drawImage(this.pistolaD, this.x + this.width+5, this.y+ this.height/3.3)
                

            }else{

                ctx.fillStyle = "blue"
                ctx.fillRect(this.x-this.width/4, this.y+ this.height/2.3, this.width/4, this.height/6);
                ctx.drawImage(this.pistolaA, this.x-this.width-5, this.y+ this.height/3.3)

            }

            if(this.ammo != 0){
                for(let i =0; i < this.ammo*7; i+=7){

                    ctx.fillStyle = "orange"
                    ctx.fillRect(this.x + i, this.y - 30  , 4 , 10);
                    ctx.fillStyle = "red"
                    ctx.fillRect(this.x + i, this.y - 34  , 4 , 3);
                    

                }
            }else{
                ctx.font = this.width/3 +"px AcmeFont";
                ctx.fillStyle = "white"
                ctx.fillText("R to Reload", this.x, this.y - 70 + this.height/1.5 , this.width*2)
            }
                

            //barra vita
            if(this.health <= 0){
                ctx.fillStyle = "trasparent"

            }else if(this.health < (this.HP*40)/100){
                //console.log("hp critici")
                ctx.fillStyle = "red"

            }else if(this.health < (this.HP*70)/100){
                
                //console.log("hp ridotti")
                ctx.fillStyle = "orange"
            }else{
                
                //console.log("hp ottimali")
                ctx.fillStyle = "green"
            }

            ctx.fillRect(this.x, this.y - this.height/5 , this.health, this.height/6);
            ctx.fillStyle = "white"
        }

        
        


    }

    update(deltaTime) {
        
        

       
        
        if(this.alive&&this.health>0){
            if(keys.SPACE == false){
                this.isShothing=false
            }
            for(let i = 0; i < this.bullets.length; i++){
                const b = this.bullets[i];
                if(b.impact){
                    this.bullets.splice(i,1)
                }
            }

            this.bullets.forEach((b)=>{
                
                b.update(deltaTime)
                
            })
        }
        
        //this.health -= 0.08
    }

    setPosition(x,y){

        this.position.x=x;
        this.position.y=y;

    }


}

