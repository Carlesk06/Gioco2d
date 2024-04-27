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
        this.bullets = []
        this.alive = true;
        this.isShothing = false;
        this.sparoSound = new Audio("assets/shoot.mp3")

    } 

    shoot(ctx, sparoSound) {
        console.log("Colpo");
        
        if(this.alive && this.isShothing == false){
            this.sparoSound.currentTime = 0;
            if(this.lastDir == 'd'){
                let proiettile = new Bullet(this.x + this.width+60, this.y+ this.height/3+2,this.lastDir)
                this.bullets.push(proiettile)
            }else{

                let proiettile = new Bullet(this.x - 70, this.y+ this.height/3+2,this.lastDir)
                this.bullets.push(proiettile)
            }
            this.sparoSound.play()
            this.isShothing = true;
        }
            
        
    }

    draw(ctx) {
        
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

        //barra vita
        if(this.health <= 0){
            ctx.fillStyle = "trasparent"

        }else if(this.health < (this.HP*40)/100){
            console.log("hp critici")
            ctx.fillStyle = "red"

        }else if(this.health < (this.HP*70)/100){
            
            console.log("hp ridotti")
            ctx.fillStyle = "orange"
        }else{
            
            console.log("hp ottimali")
            ctx.fillStyle = "green"
        }

        ctx.fillRect(this.x, this.y - this.height/5 , this.health, this.height/6);
        ctx.fillStyle = "white"



    }

    update(deltaTime) {

        if(keys.SPACE == false){
            this.isShothing=false
        }

        this.bullets.forEach((b)=>b.update(deltaTime))
        //this.health -= 0.08
    }

    setPosition(x,y){

        this.position.x=x;
        this.position.y=y;

    }


}

