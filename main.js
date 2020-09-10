const score = document.querySelector('.scores'),
  start = document.querySelector('#start'),
  gameArea = document.querySelector('#gameArea'),
  car = document.createElement('div');

start.addEventListener('click', startGame);
document.addEventListener('keydown', move);
document.addEventListener('keyup', stop);

const roadHeight = document.documentElement.clientHeight;
gameArea.style.height = roadHeight;

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
  roadSpeed: 8,
  traffic: 3
}

const getElementsQuantity = (elementHeight) => roadHeight / elementHeight + 1;

function startGame(){
  const music = document.getElementById("music");
  const carnage = document.getElementById("carnage");
  music.play();
  carnage.play();

  start.classList.add('hide');
  for (let i = 0; i < getElementsQuantity(50); i += 1) {
    const roadLine = document.createElement('div');
    roadLine.classList.add('roadLine');
    roadLine.style.top = `${i * 85}px`;
    gameArea.appendChild(roadLine);
  }

  for (let k = 1; k < getElementsQuantity(100 * settings.traffic); k += 1) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.top = `${-100 * settings.traffic * k}px`;
    enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
    enemy.style.background = 'transparent url("./images/enemy.png") center / cover no-repeat';
    gameArea.appendChild(enemy);
  }

  settings.start = true;
  gameArea.appendChild(car);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

const moveEnemy = () => {
  const enemies = document.querySelectorAll('.enemy');
  enemies.forEach(enemy => {
    enemy.style.top = `${enemy.offsetTop + settings.roadSpeed / 2}px`;

    if (enemy.offsetTop >= roadHeight) {
      enemy.style.top = '-100px';
      enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
    }
  });
};

function moveRoad() {
  const roadLines = document.querySelectorAll('.roadLine');
  roadLines.forEach(line => {
    line.style.top = `${line.offsetTop + settings.roadSpeed}px`;

    if (line.offsetTop >= roadHeight) {
      line.style.top = '-100px';
    }
  });
}

function playGame(){
  if(settings.start){
    moveRoad();
    moveEnemy();
    if(keys.ArrowLeft && settings.x > 0){
      settings.x -= settings.carSpeed;
    }
    if(keys.ArrowRight && settings.x < 250){
      settings.x += settings.carSpeed;
    }
    if(keys.ArrowUp && settings.y > 0){
      settings.y -= settings.carSpeed;
    }
    if(keys.ArrowDown && settings.y < roadHeight - 110){
      settings.y += settings.carSpeed;
    }
  }
  car.style.left = `${settings.x}px`;
  car.style.top = `${settings.y}px`;
  requestAnimationFrame(playGame);
};

function move(event){
  event.preventDefault();
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = true;
  }
}

function stop(e){
  e.preventDefault();
  keys[e.key] = false;
}