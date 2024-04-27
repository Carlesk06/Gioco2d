export class Bullet{


    constructor(x,y,dir){

        this.x = x;
        this.y = y;
        this.dir=dir;
        this.width = 10;
        this.height = 5;

    }

    update(deltaTime){
        if(this.dir == 'd'){
            this.x +=1*deltaTime;

        }else if(this.dir == 'a'){
            this.x -=1*deltaTime
        }
        

    }

    draw(ctx){
        
        if(this.dir == 'd'){
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "orange"
            ctx.fillRect(this.x +5, this.y, this.width, this.height);

        }else if(this.dir == 'a'){
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "orange"
            ctx.fillRect(this.x -5, this.y, this.width, this.height);
        }
        
    }


}