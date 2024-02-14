/**
 * ************************************
 *
 * @module  timer.js
 * @description Stopwatch script
 *
 * ************************************
 */

let [milsec, sec, min] = [0, 0, 0];
let timeRef = document.querySelector("#timer");
let int = null;
let lock = false;
window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "KeyA":
    case "KeyD":
    case "KeyS":
    case "KeyW":
    case "Space":
      if (int !== null) clearInterval(int);
      if (!lock) int = setInterval(displayTimer, 10);
      break;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(int);
  [milsec, sec, min] = [0, 0, 0];
  timeRef.innerText = "00 : 00 : 000";
  lock = false;
});

function displayTimer() {
  milsec += 10;
  if (milsec === 1000) {
    milsec = 0;
    sec++;
    if (sec === 60) {
      sec = 0;
      min++;
    }
  }
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let ms = milsec < 10 ? "00" + milsec : milsec < 100 ? "0" + milsec : milsec;
  timeRef.innerText = `${m} : ${s} : ${ms}`;
}

const reset = () => {
  clearInterval(int);
  lock = false;
};

const lockChange = () => (lock = true);

export { reset, lockChange };
