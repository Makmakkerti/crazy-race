const scores = document.querySelector('#scores'),
  start = document.querySelector('#start'),
  gameArea = document.querySelector('#gameArea'),
  car = document.createElement('div');
  car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', move);
document.addEventListener('keyup', stop);

const roadHeight = document.documentElement.clientHeight;
gameArea.style.height = roadHeight;

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const musicTracks = [
  'bone.mp3',
  'highway.mp3',
  'wild.mp3',
  'RadarLove.mp3'
];

const startWords = [
  'carnage.mp3',
  'greenFlags.mp3'
];

const crash = document.querySelector('#crash');
crash.volume = 0.4;

const carSpeed = 3;
const roadSpeed = 10;
const traffic = 4;

const settings = {
  start: false,
  scores: 0,
  carSpeed: carSpeed,
  roadSpeed: roadSpeed,
  traffic: traffic,
  highScore: 0
}

const dropSettings = () => {
  gameArea.innerHTML = '';
  
  settings.start = false;
  settings.scores = 0;
  settings.carSpeed = carSpeed;
  settings.roadSpeed = roadSpeed;
  settings.traffic = traffic;

  car.style.top = `${roadHeight - 130}px`;
  car.style.left = '125px';

  music.pause();
  music.setAttribute('src', `./audio/${musicTracks[randomInteger(0, musicTracks.length - 1)]}`); //change the source
  music.load();
};

const getElementsQuantity = (elementHeight) => roadHeight / elementHeight + 1;
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const music  = new Audio(`./audio/${musicTracks[randomInteger(0, musicTracks.length - 1)]}`);
const startAudio = new Audio();

function startGame(){
  if (settings.highScore) dropSettings();

  music.volume = 0.3;
  music.play();
  
  startAudio.setAttribute('src', `./audio/${startWords[randomInteger(0, startWords.length - 1)]}`);
  startAudio.volume = 0.3;
  startAudio.load();
  startAudio.play();

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
    enemy.style.background = `transparent url("./images/enemy${randomInteger(1,7)}.png") center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }

  settings.start = true;
  gameArea.appendChild(car);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

const stopGame = () => {
  settings.start = false;
  start.classList.remove('hide');
  if(settings.scores > settings.highScore) settings.highScore = settings.scores;
  cancelAnimationFrame(requestAnimationFrame(playGame));
}

const moveEnemy = () => {
  const enemies = document.querySelectorAll('.enemy');
  enemies.forEach(enemy => {
    const carRect = car.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    if (carRect.top <= enemyRect.bottom &&
        carRect.bottom >= enemyRect.top &&
        carRect.right >= enemyRect.left  &&
        carRect.left <= enemyRect.right) {
      crash.play();
      music.pause()
      stopGame();
    }
    enemy.style.top = `${enemy.offsetTop + settings.roadSpeed / 2}px`;

    if (enemy.offsetTop >= roadHeight) {
      enemy.style.top = '-100px';
      enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
      enemy.style.background = `transparent url("./images/enemy${randomInteger(1,7)}.png") center / cover no-repeat`;
    }
  })
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
    requestAnimationFrame(playGame);
    settings.scores += settings.roadSpeed;
    scores.textContent = `SCORES: ${settings.scores}`;

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
  } else {
    const isHighScore = settings.highScore < settings.scores;
    scores.textContent = isHighScore ? `NEW HIGH SCORE: ${settings.scores}!` : `SCORES:${settings.scores}`;
    cancelAnimationFrame(playGame);
  }
  car.style.left = `${settings.x}px`;
  car.style.top = `${settings.y}px`;
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