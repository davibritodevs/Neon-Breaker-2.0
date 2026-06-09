class Ball{

    constructor(){

        this.radius = 8;

        this.reset();
    }

    reset(){

        this.x = 400;
        this.y = 500;

        this.speed = 3;

        this.dx = this.speed;
        this.dy = -this.speed;
    }

    update(){

        this.x += this.dx;
        this.y += this.dy;
    }

    draw(ctx){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";

        const gradient =
        ctx.createRadialGradient(
            this.x,
            this.y,
            2,
            this.x,
            this.y,
            this.radius
        );

        gradient.addColorStop(0,"white");
        gradient.addColorStop(1,"#00ffff");

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.closePath();
    }

}