const state = {
 view:{
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeleft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
 },
 value:{
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
 },
 actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000), 
 }
};

function countDown() {
    state.value.curretTime--;
    state.view.timeleft.textContent = state.value.curretTime;

    if(state.value.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! o seu resultado foi: " + state.value.result)
    }
}

function playSound() {
    let audio = new Audio("./audios/hit.m4a");
    audio.volume = 0.2;
    audio.play(); 
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if (square.id === state.value.hitPosition){
                state.value.result++
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null
                playSound();
            }
        })
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();
