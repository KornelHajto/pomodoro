// script.js

const pomodoroDuration = 25 * 60; // 25 minutes
const shortBreakDuration = 5 * 60; // 5 minutes
const longBreakDuration = 15 * 60; // 15 minutes

let timerDuration = pomodoroDuration;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset");
const backgroundUpload = document.getElementById("background-upload");
const backgroundElement = document.getElementById("background");
const settingsButton = document.getElementById("settings-button");
const modeButtons = document.querySelectorAll(".mode-button");

backgroundElement.style.backgroundImage = 'url("image/back.gif")';



let currentMode = "pomodoro"; // Tracks the current mode

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateTimerDisplay() {
    timeDisplay.textContent = formatTime(timerDuration);
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timerDuration > 0) {
            timerDuration--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startButton.textContent = "Start";
            startButton.classList.remove("active");
            alert("Time's up!");
        }
    }, 1000); // Update every second
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;

    // Set the timer based on the current mode
    if (currentMode === "pomodoro") {
        timerDuration = pomodoroDuration;
    } else if (currentMode === "short-break") {
        timerDuration = shortBreakDuration;
    } else if (currentMode === "long-break") {
        timerDuration = longBreakDuration;
    }

    updateTimerDisplay();
    startButton.textContent = "Start";
    startButton.classList.remove("active");
}

function changeMode(mode, duration) {
    clearInterval(timerInterval);
    isRunning = false;
    currentMode = mode; // Update the current mode
    timerDuration = duration;
    updateTimerDisplay();
    startButton.textContent = "Start";
    startButton.classList.remove("active");
}

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modeButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        if (button.id === "pomodoro") changeMode("pomodoro", pomodoroDuration);
        if (button.id === "short-break") changeMode("short-break", shortBreakDuration);
        if (button.id === "long-break") changeMode("long-break", longBreakDuration);
    });
});

startButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = "Pause";
        startButton.classList.add("active");
        startTimer();
    } else {
        isRunning = false;
        startButton.textContent = "Start";
        startButton.classList.remove("active");
        clearInterval(timerInterval);
    }
});

resetButton.addEventListener("click", resetTimer);

settingsButton.addEventListener("click", () => {
    backgroundUpload.click();
});

backgroundUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            backgroundElement.style.backgroundImage = `url(${event.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('add-playlist-button').addEventListener('click', function () {
    const input = document.getElementById('spotify-input').value;
    const frame = document.getElementById('spotify-frame');
    if (input.startsWith('https://open.spotify.com/playlist/')) {
        const embedUrl = input.replace('open.spotify.com', 'open.spotify.com/embed');
        frame.src = embedUrl;
    } else {
        alert('Please enter a valid Spotify playlist URL.');
    }
});


// Initialize timer display
updateTimerDisplay();
