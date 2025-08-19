let startTime;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById("display");
const lapsList = document.getElementById("lapsList");

function timeToString(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);
  return (
    (hrs < 10 ? "0" + hrs : hrs) + ":" +
    (mins < 10 ? "0" + mins : mins) + ":" +
    (secs < 10 ? "0" + secs : secs)
  );
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 1000);
}

function pause() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00";
  elapsedTime = 0;
  lapsList.innerHTML = "";
}

function lap() {
  if (elapsedTime > 0) {
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${timeToString(elapsedTime)}`;
    lapsList.appendChild(lapItem);
  }
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", pause);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);
