/*
AUDIO CONSTRUCTOR
*/
const audioObj = new Audio();

const playAudio = (audio) => {
  if (audioObj.paused) {
    audioObj.src = audio;
    audioObj.play();
  } else {
    console.log("playing");
  }
};

const audioAPIpath = (filename) => {
  return `https://api.inferport.com/univerplus/audio/${filename}.mp3`;
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
      //playAudio(audioAPIpath(target.id));
      alert("hola");
    });
  });

  arSystem.stop();
});
