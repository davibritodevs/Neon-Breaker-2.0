class Player{

    constructor(){

        this.width = 120;
        this.height = 15;

        this.x = 340;
        this.y = 560;

        this.speed = 8;
    }

    draw(ctx){

    const grad = ctx.createLinearGradient(
        this.x,
        0,
        this.x + this.width,
        0
    );

    grad.addColorStop(0,"#00ffff");
    grad.addColorStop(1,"#0088ff");

    ctx.save();

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";

    ctx.fillStyle = grad;

    ctx.fillRect(
        this.x,
        this.y,
        this.width,
        this.height
    );

    // brilho superior

    ctx.fillStyle =
    "rgba(255,255,255,0.3)";

    ctx.fillRect(
        this.x,
        this.y,
        this.width,
        3
    );

    ctx.restore();
}}