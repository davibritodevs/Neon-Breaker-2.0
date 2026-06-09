class Brick{

    constructor(x,y,color){

        this.x = x;
        this.y = y;

        this.width = 70;
        this.height = 25;

        this.color = color;

        this.destroyed = false;
    }

draw(ctx){

    if(this.destroyed) return;

    // brilho externo

    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;

    // gradiente

    const grad = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x,
        this.y + this.height
    );

    grad.addColorStop(0,"white");
    grad.addColorStop(0.2,this.color);
    grad.addColorStop(1,this.color);

    ctx.fillStyle = grad;

    ctx.fillRect(
        this.x,
        this.y,
        this.width,
        this.height
    );

    ctx.shadowBlur = 0;

    // brilho superior

    ctx.fillStyle =
    "rgba(255,255,255,0.25)";

    ctx.fillRect(
        this.x + 2,
        this.y + 2,
        this.width - 4,
        4
    );

    // borda

    ctx.strokeStyle =
    "rgba(255,255,255,0.4)";

    ctx.strokeRect(
        this.x,
        this.y,
        this.width,
        this.height
    );
}

}