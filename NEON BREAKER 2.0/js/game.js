const canvas =
document.getElementById("gameCanvas");

const stars = [];

for(let i = 0; i < 100; i++){

    stars.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        size: Math.random() * 2,

        speed:
        0.2 + Math.random() * 0.5

    });

}

const ctx =
canvas.getContext("2d");

const player = new Player();
const ball = new Ball();

let score = 0;

let highScore =
Number(
    localStorage.getItem(
        "highScore"
    )
) || 0;

let vidas = 3;

let gameState = "menu";

let countdown = 3;
let countdownStart = 0;

/*
menu
countdown
playing
victory
gameover
*/

const keys = {};

let bricks = [];

let particles = [];

const rows = 6;
const cols = 10;


function createBricks(){

    bricks = [];

    for(let r = 0; r < rows; r++){

        for(let c = 0; c < cols; c++){

            bricks.push(

                new Brick(

                    35 + c * 80,
                    60 + r * 35,

                    `hsl(${r * 50},80%,55%)`
                )

            );

        }

    }

}

createBricks();

document.addEventListener("keydown",(e)=>{

    keys[e.key] = true;

    if(e.key === "Enter"){
        

        if(gameState === "menu"){

        sounds.music.play();

        countdown = 3;

        countdownStart = Date.now();

        gameState = "countdown";

}

else if(
    gameState === "victory" ||
    gameState === "gameover"
){

    restartGame();

}

    }

});

document.addEventListener("keyup",(e)=>{

    keys[e.key] = false;

});

function drawBackground(){

    ctx.fillStyle = "#050505";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    stars.forEach(star=>{

        star.y += star.speed;

        if(star.y > canvas.height){

            star.y = 0;
            star.x =
            Math.random() * canvas.width;
        }

        ctx.fillStyle =
        "rgba(255,255,255,.8)";

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

}

function drawHUD(){

    ctx.fillStyle = "white";

    ctx.font = "12px 'Press Start 2P'";

    ctx.fillText(
        "Pontuação: " + score,
        20,
        35
    );

    ctx.fillText(
        "Vidas: " + vidas,
        650,
        35
    );

    ctx.fillText(
    "Recorde: " + highScore,
    300,
    35
    );

}

function drawMenu(){

    let pulse =
    Math.sin(Date.now() * 0.005);

    // TÍTULO

    ctx.fillStyle = "#FFD700";

    ctx.textAlign = "center";

     ctx.font = "20px 'Press Start 2P'";

    ctx.fillText(
        "🏆 Recorde: " + highScore,
        canvas.width / 2,
        500
    );

    ctx.textAlign = "center";

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#00ffff";

    ctx.fillStyle = "#00ffff";
    ctx.font = "50px 'Press Start 2P'";

    ctx.fillText(
        "NEON BREAKER"
        ,
        canvas.width/2,
        180
    );

    ctx.lineWidth = 4;

    ctx.strokeStyle = "#ffffff";

    ctx.strokeText(
        "NEON BREAKER",
        canvas.width/2,
        180
    );

    ctx.shadowBlur = 0;

    // SUBTÍTULO

    ctx.fillStyle = "#ffffff";

    ctx.font = "16px 'Press Start 2P'";

    ctx.fillText(
        "Destrua todos os blocos",
        canvas.width/2,
        240
    );

    // BOTÃO PISCANDO

    let alpha = 0.5 + pulse * 0.5;

    ctx.fillStyle =
    `rgba(255,255,255,${alpha})`;

    ctx.font = "22px 'Press Start 2P'";

    ctx.fillText(
        "▶ PRESSIONE ENTER",
        canvas.width/2,
        350
    );

    // CONTROLES

    ctx.fillStyle = "#aaaaaa";

    ctx.font = "20px Arial";

    ctx.fillText(
        "← → Mover barra",
        canvas.width/2,
        420
    );

    ctx.fillText(
        "Quebre todos os blocos",
        canvas.width/2,
        450
    );

    // VERSÃO

    ctx.fillStyle = "#666";

    ctx.font = "16px Arial";

    ctx.fillText(
        "v1.0",
        canvas.width/2,
        560
    );

    ctx.textAlign = "left";
}

function drawCountdown(){

    const elapsed =
    Math.floor(
        (Date.now() - countdownStart)
        / 1000
    );

    const value = 3 - elapsed;

    ctx.fillStyle = "#00ffff";

    ctx.textAlign = "center";

    ctx.font =
    "80px 'Press Start 2P'";

    if(value > 0){

        ctx.fillText(
            value,
            canvas.width / 2,
            canvas.height / 2
        );

    }
    else{

        ctx.fillText(
            "GO!",
            canvas.width / 2,
            canvas.height / 2
        );

    }

    if(elapsed >= 3){

        sounds.music.play();

        gameState = "playing";

    }

    ctx.textAlign = "left";
}

function drawGameOver(){

    ctx.fillStyle = "white";

    ctx.textAlign = "center";

    ctx.font = "50px 'Press Start 2P'";

    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        250
    );

    ctx.font = "20px 'Press Start 2P'";

    ctx.fillText(
        "Pontuação: " + score,
        canvas.width / 2,
        320
    );
    
    ctx.font = "20px 'Press Start 2P'";

        ctx.fillText(
            "🏆 Recorde: " + highScore,
            canvas.width / 2,
            360
        );

    ctx.font = "14px 'Press Start 2P'";

    ctx.fillText(
        "Pressione ENTER",
        canvas.width / 2,
        420
    );

    ctx.textAlign = "left";

}

function drawVictory(){

    ctx.fillStyle = "#FFD700";

    ctx.textAlign = "center";

    ctx.font = "40px 'Press Start 2P'";

    ctx.fillText(
        "PARABÉNS!",
        canvas.width / 2,
        220
    );

    ctx.fillStyle = "white";

    ctx.font = "18px 'Press Start 2P'";

    ctx.fillText(
        "Você venceu o jogo!",
        canvas.width / 2,
        300
    );

    ctx.font = "14px 'Press Start 2P'";

    ctx.fillText(
        "Pontuação: " + score,
        canvas.width / 2,
        360
    );

    ctx.fillText(
        "🏆 Recorde: " + highScore,
        canvas.width / 2,
        410
    );

    ctx.font = "12px 'Press Start 2P'";

    ctx.fillText(
        "Pressione ENTER para jogar novamente",
        canvas.width / 2,
        500
    );

    ctx.textAlign = "left";
}

function updateBall(){

    ball.update();

    if(

        ball.x + ball.radius > canvas.width ||
        ball.x - ball.radius < 0

    ){

        ball.dx *= -1;

    }

    if(

        ball.y - ball.radius < 0

    ){

        ball.dy *= -1;

    }

    if(

        ball.y + ball.radius >
        canvas.height

    ){

        vidas--;

        if(vidas <= 0){

            playSound(sounds.gameover);

            sounds.music.pause();

            gameState = "gameover";

        }
        else{

            ball.reset();

            player.x = 340;

        }

    }

    if(

        ball.x > player.x &&
        ball.x < player.x + player.width &&

        ball.y + ball.radius >
        player.y &&

        ball.y - ball.radius <
        player.y + player.height

    ){

        let collidePoint =

        ball.x -
        (player.x + player.width / 2);

        collidePoint /=

        player.width / 2;

        let angle =

        collidePoint *
        Math.PI / 3;

        ball.dx =
        ball.speed *
        Math.sin(angle);

        ball.dy =
        -ball.speed *
        Math.cos(angle);

        playSound(sounds.hit);

    }

    bricks.forEach(brick=>{

        if(brick.destroyed) return;

        if(

            ball.x + ball.radius >
            brick.x &&

            ball.x - ball.radius <
            brick.x + brick.width &&

            ball.y + ball.radius >
            brick.y &&

            ball.y - ball.radius <
            brick.y + brick.height

        ){

            brick.destroyed = true;

            playSound(sounds.brick);

            for(let i = 0; i < 15; i++){

            particles.push(

             new Particle(

            brick.x + brick.width/2,
            brick.y + brick.height/2,

            brick.color

                    )

                );

            }

            ball.dy *= -1;

            score += 10;
            if(score > highScore){

            highScore = score;

            localStorage.setItem(
                "highScore",
                highScore
            );

        }

        }

    });

    const alive = bricks.filter(
        brick => !brick.destroyed
    );

    if(alive.length === 0){

    playSound(sounds.win);

    sounds.music.pause();

    gameState = "victory";

}

}

function restartGame(){

    sounds.music.currentTime = 0;
    sounds.music.play();

    score = 0;

    vidas = 3;

    player.x = 340;

    ball.reset();

    createBricks();

    gameState = "playing";

}

function updateParticles(){

    particles.forEach(
        particle => particle.update()
    );

    particles =
    particles.filter(
        particle => particle.life > 0
    );

}

function drawParticles(){

    particles.forEach(
        particle => particle.draw(ctx)
    );

}

function update(){

    drawBackground();

    if(gameState === "menu"){
        

        drawMenu();

    }

    else if(
        gameState === "countdown"
    ){

        drawCountdown();

    }

    else if(gameState === "playing"){

        if(

            keys["ArrowLeft"] &&
            player.x > 0

        ){

            player.x -= player.speed;

        }

        if(

            keys["ArrowRight"] &&
            player.x <
            canvas.width -
            player.width

        ){

            player.x += player.speed;

        }

        updateBall();

        updateParticles();

        player.draw(ctx);

        ball.draw(ctx);

    drawParticles();

        bricks.forEach(
            brick => brick.draw(ctx)
        );

        drawHUD();

    }

    else if(gameState === "victory"){

    drawVictory();
    }

    else if(gameState === "gameover"){

    drawGameOver();

    }


    requestAnimationFrame(update);

}

update();