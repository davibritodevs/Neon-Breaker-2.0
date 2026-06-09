const sounds = {

    brick: new Audio(
        "assets/sounds/brick.mp3"
    ),

    hit: new Audio(
        "assets/sounds/hit.mp3"
    ),

    gameover: new Audio(
        "assets/sounds/gameover.mp3"
    ),

    win: new Audio(
        "assets/sounds/win.mp3"
    ),

    music: new Audio(
        "assets/sounds/music.mp3"
    )

};

sounds.music.loop = true;

Object.values(sounds).forEach(sound => {

    sound.volume = 0.3;

});

function playSound(sound){

    sound.currentTime = 0;

    sound.play();

}