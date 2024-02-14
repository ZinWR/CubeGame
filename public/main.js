import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { enemyTexture, cohortsTexture, cs63, cs62 } from './utils/texture.js';
import * as timer from './utils/timer.js';

/*--------------------------------------- Scene Set Up ---------------------------------------*/
/* Class Box inherits Mesh Class from THREE js */
class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color = 0x00ff00,
    // initial velocity is 0
    velocity = {
      x: 0,
      y: 0,
      z: 0,
    },
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
    zAcceleration = false,
    texture = null,
  }) {
    // call constructor from parent class
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color, map: texture }) // {color: color}
    );
    // set properties
    this.height = height;
    this.width = width;
    this.depth = depth;
    // mesh has position so have to set
    this.position.set(position.x, position.y, position.z);
    // set position for collisions
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
    // set gravity
    this.velocity = velocity;
    this.gravity = -0.005;
    this.zAcceleration = zAcceleration;
  }
  updateSides() {
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
  }
  // update positions/velocities
  update(ground) {
    this.updateSides();
    // alleration for enemy box
    if (this.zAcceleration) {
      const level = Math.ceil(Math.random() * 2);
      this.velocity.z += 0.005;
      if (hardRate === 1 && level === 1) this.rotation.y += 0.05;
      if (hardRate === 1 && level === 2) this.rotation.x += 0.05;
      if (hardRate === 2 && level === 1) this.rotation.y += 0.5;
      if (hardRate === 2 && level === 2) this.rotation.x += 0.5;
      if (hardRate === 3) {
        this.rotation.y += 1;
        this.rotation.x += 1;
      }
    }
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
    this.applyGravity(ground);
  }
  applyGravity(ground) {
    // make box fall
    this.velocity.y += this.gravity;
    // if box hits ground --> BOUNCE
    if (
      boxCollision({
        box1: this,
        box2: ground,
      })
    ) {
      // mimic gravity fall
      const friction = 0.5;
      this.velocity.y *= friction;
      this.velocity.y = -this.velocity.y;
    } else this.position.y += this.velocity.y;
  }
}
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  // alpha true will set transparent background
  // alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
/* ----- Create Box & Ground ----- */
const cube = new Box({
  width: 1,
  height: 1,
  depth: 1,
  velocity: {
    x: 0,
    y: -0.01,
    z: 0,
  },
  color: null,
  texture: new THREE.TextureLoader().load('./assets/quan.png'),
});
const ground = new Box({
  width: 18,
  height: 0.5,
  depth: 50,
  color: '#F5F5F5',
  position: {
    x: 0,
    y: -2,
    z: 0,
  },
  texture: new THREE.TextureLoader().load('./assets/ground.png'),
});
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.y = 3;
light.position.z = 1;
renderer.shadowMap.enabled = true;
cube.castShadow = true;
light.castShadow = true;
ground.receiveShadow = true;
scene.add(cube, ground, light, new THREE.AmbientLight(0xffffff, 0.5));
/*--------------------------------------- Movement & Background ---------------------------------------*/
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
};
window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = true;
      start = true;
      break;
    case 'KeyD':
      keys.d.pressed = true;
      start = true;
      break;
    case 'KeyS':
      keys.s.pressed = true;
      start = true;
      break;
    case 'KeyW':
      keys.w.pressed = true;
      start = true;
      break;
    case 'Space':
      cube.velocity.y = 0.15;
      start = true;
      break;
    case 'KeyE':
      // Set toggle 0 -> 1 -> 2 -> 3 -> 0
      toggleSpin =
        toggleSpin === 0 ? 1 : toggleSpin === 1 ? 2 : toggleSpin === 2 ? 3 : 0;
      start = true;
      break;
  }
});
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyA':
      keys.a.pressed = false;
      break;
    case 'KeyD':
      keys.d.pressed = false;
      break;
    case 'KeyS':
      keys.s.pressed = false;
      break;
    case 'KeyW':
      keys.w.pressed = false;
      break;
  }
});
const video = document.getElementById('video');
const videoTexture = new THREE.VideoTexture(video);
scene.background = videoTexture;
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 4);
camera.position.z = 5; // pull camera back to see
const listener = new THREE.AudioListener();
camera.add(listener);
const loader = new THREE.AudioLoader();
const sound = new THREE.Audio(listener);
loader.load('assets/music.mp3', (buffer) => {
  sound.setBuffer(buffer);
  sound.setVolume(1);
  sound.setLoop(true);
});
/*--------------------------------------- Initilization ---------------------------------------*/
// declare to move the camera around for 3D
const controls = new OrbitControls(camera, renderer.domElement);
const enemyTextureLoad = new THREE.TextureLoader();
let enemies = [];
let frames = 0;
let hardRate = 0;
let toggleSpin = 0;
let spawnRate = 100;

let start = false;
let choice = 'default';

/*--------------------------------------- PLAY GAME! ---------------------------------------*/
video.play(); // play video background
animate();
/*--------------------------------------- Functions! ---------------------------------------*/
function animate() {
  /* Start Background Music */
  if (start) sound.play();
  start = false;
  // Recursively call animate to keep going
  const animationID = requestAnimationFrame(animate);
  renderer.render(scene, camera);
  move();
  cube.update(ground);
  checkCollision(animationID);
  enemySpawn(enemyTexture);
  // ToggleSpin
  if (toggleSpin === 1) cube.rotation.y += 0.05;
  if (toggleSpin === 2) cube.rotation.x += 0.05;
  if (toggleSpin === 3) {
    cube.rotation.y += 0.05;
    cube.rotation.x += 0.05;
  }
  frames += 3;
  setInterval(() => {
    frames = (frames % 360) + 4;
  }, 1000);
}
// Create new enemy per frames
function enemySpawn(enemyTexture) {
  let chosenTexture =
    choice === 'default'
      ? enemyTexture
      : choice === 'cohorts'
      ? cohortsTexture
      : choice === 'cs63'
      ? cs63
      : cs62;
  if (frames % spawnRate === 0) {
    // Medium level
    if (spawnRate > 20) spawnRate -= 20;
    // Enemy Texture Options
    const random = Math.floor(Math.random() * chosenTexture.length);
    let textureOption =
      choice === 'default'
        ? enemyTextureLoad.load(
            `./assets/languages/${enemyTexture[random]}.png`
          )
        : choice === 'cohorts'
        ? enemyTextureLoad.load(
            `./assets/cohorts/${cohortsTexture[random]}.png`
          )
        : choice === 'cs63'
        ? enemyTextureLoad.load(`./assets/cs63/${cs63[random]}.png`)
        : enemyTextureLoad.load(`./assets/cs62/${cs62[random]}.png`);
    const enemy = new Box({
      width: 1,
      height: 1,
      depth: 1,
      position: {
        // spawn enemy randomly
        x: (Math.random() - 0.5) * 18,
        y: 0,
        z: -20,
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0.005,
      },
      color: '#FFFFFF', // white by default
      zAcceleration: true,
      // Add texture to enemy cubes
      texture: textureOption,
    });
    enemy.castShadow = true; // cube cast shadow onto ground
    scene.add(enemy);
    enemies.push(enemy);
  }
}
// Movement Player
function move() {
  cube.velocity.x = 0;
  cube.velocity.z = 0;
  if (keys.a.pressed) cube.velocity.x = -0.1;
  else if (keys.d.pressed) cube.velocity.x = 0.1;
  if (keys.s.pressed) cube.velocity.z = 0.1;
  else if (keys.w.pressed) cube.velocity.z = -0.1;
}
// Collission & Enemy MOVING
function checkCollision(animationID) {
  enemies.forEach((enemy) => {
    /* update & move enemy */
    enemy.update(ground);
    if (
      boxCollision({
        box1: cube,
        box2: enemy,
      })
    ) {
      // Stop the recursive --> Stop game
      cancelAnimationFrame(animationID);
      start = false;
      timer.reset();
      timer.lockChange();
      // Stop Time END GAME!
      document.querySelector('#timer').style.cssText = `
      font-size: 69px;
     color: red;
      `;
      document.querySelector('.container-score').style.display = 'block';
    }
  });
}
function boxCollision({ box1, box2 }) {
  const xCollision = box1.right >= box2.left && box1.left <= box2.right;
  // predict when hit the ground
  const yCollision =
    box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
  const zCollision = box1.front >= box2.back && box1.back <= box2.front;
  return xCollision && yCollision && zCollision;
}
// TEXTURE change
document.getElementById('default').addEventListener('click', () => {
  choice = 'default';
});
document.getElementById('cohorts').addEventListener('click', () => {
  choice = 'cohorts';
});
document.getElementById('cs63').addEventListener('click', () => {
  choice = 'cs63';
});
document.getElementById('cs62').addEventListener('click', () => {
  choice = 'cs62';
});
// Change Texture with ArrowKeys
window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') choice = 'default';
  else if (event.code === 'ArrowLeft') choice = 'cohorts';
  else if (event.code === 'ArrowDown') choice = 'cs63';
  else if (event.code === 'ArrowRight') choice = 'cs62';
});
// Difficulty
document.querySelector('input').addEventListener('input', diffculty);
// AUTORUN
document.getElementById('icon').onclick = function () {
  setInterval(() => {
    document.getElementById('slidebar').value++;
    diffculty();
  }, 50);
};
function diffculty() {
  const icon = document.querySelector('#icon');
  const slideValue = document.querySelector('.slide-value');
  let rangeVal = document.querySelector('input').value;
  slideValue.innerText = rangeVal;
  // Easy
  if (rangeVal < 25) {
    hardRate = 0;
    slideValue.style.color = 'whitesmoke';
    icon.classList.replace(
      'svg-spinners--blocks-shuffle-3',
      'svg-spinners--blocks-shuffle-2'
    );
    spawnRate = 200;
  } else {
    icon.classList.replace(
      'svg-spinners--blocks-shuffle-2',
      'svg-spinners--blocks-shuffle-3'
    );
  }
  // Medium
  if (rangeVal >= 25) {
    hardRate = 0;
    slideValue.style.color = 'gold';
    icon.classList.replace(
      'svg-spinners--blocks-shuffle-2',
      'svg-spinners--blocks-scale'
    );
    spawnRate = 50;
  } else {
    icon.classList.replace(
      'svg-spinners--blocks-scale',
      'svg-spinners--blocks-shuffle-2'
    );
  }
  // Almost Hard
  if (rangeVal >= 50) {
    hardRate = 1;
    slideValue.style.color = 'orange';
    icon.classList.replace(
      'svg-spinners--blocks-shuffle-3',
      'svg-spinners--blocks-scale'
    );
    spawnRate = 25;
  } else {
    icon.classList.replace(
      'svg-spinners--blocks-scale',
      'svg-spinners--blocks-shuffle-3'
    );
  }
  // Hard
  if (rangeVal >= 75) {
    hardRate = 2;
    slideValue.style.color = 'red';
    icon.classList.replace(
      'svg-spinners--blocks-scale',
      'svg-spinners--blocks-wave'
    );
    spawnRate = 1;
  }
  // EXTREME HARD
  if (rangeVal >= 90) hardRate = 3;
  else {
    icon.classList.replace(
      'svg-spinners--blocks-wave',
      'svg-spinners--blocks-scale'
    );
  }
}
console.log('Cookie is ', document.cookie);
