export class Bullet{


    constructor(x,y,dir){

        this.x = x;
        this.y = y;
        this.dir=dir;
        this.width = 10;
        this.height = 5;
        this.damage = 15;
        this.impact = false;

    }

    update(deltaTime){
        if(this.dir == 'd'){
            this.x +=1*deltaTime;

            


        }else if(this.dir == 'a'){
            this.x -=1*deltaTime



        }
        

    }

    checkCollision(enemy) {
        // Calcola i bordi della pallottola
        const bulletLeft = this.x;
        const bulletRight = this.x + this.width;
        const bulletTop = this.y;
        const bulletBottom = this.y + this.height;

        // Calcola i bordi del nemico
        const enemyLeft = enemy.x;
        const enemyRight = enemy.x + enemy.width;
        const enemyTop = enemy.y;
        const enemyBottom = enemy.y + enemy.height;

        // Verifica la collisione
        if (enemy.alive &&
            bulletRight > enemyLeft &&
            bulletLeft < enemyRight &&
            bulletBottom > enemyTop &&
            bulletTop < enemyBottom
        ) {
            console.log("Colpito");
            this.impact = true;
            enemy.health -= this.damage;
            
            return true; // Collisione avvenuta
        }

        return false; // Nessuna collisione
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