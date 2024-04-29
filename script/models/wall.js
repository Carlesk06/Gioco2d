export class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = "gray"; // Colore del muro
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(entity) {
        // Calcola i bordi del muro
        const wallLeft = this.x;
        const wallRight = this.x + this.width;
        const wallTop = this.y;
        const wallBottom = this.y + this.height;

        // Calcola i bordi dell'entità
        const entityLeft = entity.x;
        const entityRight = entity.x + entity.width;
        const entityTop = entity.y;
        const entityBottom = entity.y + entity.height;

        // Verifica la collisione
        if (
            entityRight > wallLeft &&
            entityLeft < wallRight &&
            entityBottom > wallTop &&
            entityTop < wallBottom
        ) {
            // Se c'è una collisione, sposta l'entità in modo che non si sovrapponga al muro
            if (entity instanceof Player) {
                // Se l'entità è il giocatore, reimposta la sua posizione precedente
                entity.x = entity.previousX;
                entity.y = entity.previousY;
            } else if (entity instanceof Enemy || entity instanceof Bullet) {
                // Se l'entità è un nemico o un proiettile, distruggila
                entity.destroy();
            }
        }
    }
}
