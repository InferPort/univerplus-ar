/*
AUDIO CONSTRUCTOR
*/
const audioObj = new Audio();

const playAudio = (audio) => {
  if (audioObj.paused) {
    audioObj.src = audio;
    audioObj.play();
  }
};

const audioAPIpath = (filename) => {
  return `https://api.inferport.com/univerplus/audio/${filename}.mp3`;
};

const toggleFullScreen = () => {
  var docElm = document.documentElement;
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen();
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen();
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const arSystem = scene.systems["mindar-image-system"];

  const targets = [];

  for (let i = 1; i <= 15; i++) {
    targets[i] = document.querySelector(`#plane_${i}`);
  }

  targets.forEach((target) => {
    target.addEventListener("targetFound", (event) => {
      playAudio(audioAPIpath(target.id));
    });
  });

  scene.addEventListener("arReady", (event) => {
    toggleFullScreen();
  });
});
