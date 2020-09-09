const score = document.querySelector('.scores'),
  start = document.querySelector('#start'),
  gameArea = document.querySelector('#gameArea'),
  car = document.createElement('div');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

car.classList.add('car');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const settings = {
  start: false,
  score: 0,
  speed: 3,
}

function startGame(){
  start.classList.add('hide');
  settings.start = true;
  gameArea.appendChild(car);
  requestAnimationFrame(playGame);
}

function playGame(){
  console.log('Game has started!!!');
  requestAnimationFrame(playGame);
};

function startRun(e){
  e.preventDefault();
  keys[e.key] = true;
}

function stopRun(e){
  e.preventDefault();
  keys[e.key] = false;
}