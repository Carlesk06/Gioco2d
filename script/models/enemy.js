import { Bullet } from "./bullet.js";
export class Enemy{

    constructor(x,y){
        this.x = x;
        this.y=y;
        this.height = 80;
        this.width = 60;
        this.velocity= Math.random() * (0.3 - 0.1) + 0.1;
        this.HP = this.width
        this.health = this.HP;
        this.lastDir = 'a'
        this.fucileD = document.getElementById("fucilD");
        this.fucileA = document.getElementById("fucilA");
        this.vampaD = document.getElementById("vampD");
        this.vampaA = document.getElementById("vampA");
        this.bullets = []
        this.alive = true;
        this.isShothing = false;
        this.static = false;
        this.sparoSound = new Audio("assets/shoot.mp3")
        this.ammo = 6;
        this.alert=false
        this.delay = Math.floor(Math.random() * 10000) + 1000;
        this.r1 = (Math.random() * (100 - 20)) + 20;
        this.r2 = (Math.random() * (40 - 10)) + 10;
    }


    shoot(ctx, sparoSound) {
        console.log("Colpo");
        
        if(this.alive){
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


        }
            
        
    }

    update(player, deltaTime){

        let d= deltaTime
        //this.velocity = this.velocity*deltaTime;
        //console.log(d)
        

        if(this.static == false && this.alive){

            if(this.health == 0){
                this.alive = false;
                
            }
            if(player.x > this.x){
                this.lastDir = 'd'

                if(this.x < player.x - this.width*5 + this.r1){
                    this.x += this.velocity       
                }else{
                    this.x -= this.velocity 
                }
            }else if(player.x < this.x){
                this.lastDir = 'a'
                if(this.x > player.x + this.width*5 - this.r1){
                    this.x -= this.velocity 
                    
                }else{
                    this.x += this.velocity 
                }
            }
            
            if(this.y < player.y + this.r2){
                    
                this.y += this.velocity;
                

            }
            if(this.y > player.y - this.r2){

                this.y -= this.velocity ;

            }

        }
            


    }

    draw(ctx) {
        if(this.alive){
            //disegno personaggio
            ctx.fillStyle = "black"
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "gray"
            ctx.fillRect(this.x, this.y +this.height/2, this.width, this.height/4);
            ctx.fillStyle = "gray"
            ctx.fillRect(this.x, this.y+ this.height/3, this.width, this.height/3);
            ctx.fillStyle = "pink"
            ctx.fillRect(this.x, this.y+ (this.height * 10)/100 , this.width, this.height/3);
            

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

                ctx.fillStyle = "gray"
                ctx.fillRect(this.x + this.width, this.y+ this.height/2.3, this.width/4, this.height/6);
                ctx.drawImage(this.fucileD, this.x + this.width/3, this.y+ this.height/3.3)
                

            }else{

                ctx.fillStyle = "gray"
                ctx.fillRect(this.x-this.width/4, this.y+ this.height/2.3, this.width/4, this.height/6);
                ctx.drawImage(this.fucileA, this.x-this.width, this.y+ this.height/3.3)

            }

            for(let i =0; i < this.ammo*7; i+=7){

                ctx.fillStyle = "orange"
                ctx.fillRect(this.x + i, this.y - 30  , 4 , 10);
                ctx.fillStyle = "red"
                ctx.fillRect(this.x + i, this.y - 34  , 4 , 11);
                

            }

            //barra vita
            if(this.health <= 0){
                ctx.fillStyle = "trasparent"

            }else if(this.health < (this.HP*40)/100){
                
                ctx.fillStyle = "red"

            }else if(this.health < (this.HP*70)/100){
                
                
                ctx.fillStyle = "orange"
            }else{
                
                
                ctx.fillStyle = "green"
            }

            ctx.fillRect(this.x, this.y - this.height/5 , this.health, this.height/6);
            ctx.fillStyle = "white"
        }
    }


}