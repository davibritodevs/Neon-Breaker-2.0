class Particle{

    constructor(x,y,color){

        this.x = x;
        this.y = y;

        this.color = color;

        this.size =
        2 + Math.random() * 4;

        this.dx =
        (Math.random() - 0.5) * 6;

        this.dy =
        (Math.random() - 0.5) * 6;

        this.life = 60;
    }

    update(){

        this.x += this.dx;
        this.y += this.dy;

        this.life--;

    }

    draw(ctx){

        ctx.globalAlpha =
        this.life / 60;

        ctx.fillStyle =
        this.color;

        ctx.fillRect(
            this.x,
            this.y,
            this.size,
            this.size
        );

        ctx.globalAlpha = 1;
    }

}