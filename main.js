const score = document.querySelector('.scores'),
  start = document.querySelector('#start'),
  gameArea = document.querySelector('#gameArea'),
  car = document.createElement('div');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
gameArea.style.height = document.documentElement.clientHeight;

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
  carSpeed: 3,
  roadSpeed: 4
}

function startGame(){
  start.classList.add('hide');
  for (let i = 0; i < 20; i += 1) {
    const roadLine = document.createElement('div');
    roadLine.classList.add('roadLine');
    roadLine.style.top = `${i * 85}px`;
    gameArea.appendChild(roadLine);
  }

  settings.start = true;
  gameArea.appendChild(car);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function moveRoad() {
  let roadLines = document.querySelectorAll('.roadLine');
  roadLines.forEach(line => {
    line.style.top = `${line.offsetTop + settings.roadSpeed}px`;

    if (line.offsetTop >= document.documentElement.clientHeight) {
      line.style.top = '-100px';
    }
  });
}

function playGame(){
  if(settings.start){
    moveRoad();
    if(keys.ArrowLeft && settings.x > 0){
      settings.x -= settings.carSpeed;
    }
    if(keys.ArrowRight && settings.x < 250){
      settings.x += settings.carSpeed;
    }
    if(keys.ArrowUp && settings.y > 0){
      settings.y -= settings.carSpeed;
    }
    if(keys.ArrowDown){
      settings.y += settings.carSpeed;
    }
  }
  car.style.left = `${settings.x}px`;
  car.style.top = `${settings.y}px`;
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