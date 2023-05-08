const playAudio = (audio) => {
  var audioData = new Audio(audio);
  audioData.play();
};

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const arSystem = scene.systems["mindar-image-system"];

  const [target_1] = [document.querySelector("#plane_1")];

  target_1.addEventListener("targetFound", (event) => {
    playAudio("https://api.inferport.com/univerplus/audio/plane_1.mp3");
  });

  arSystem.stop();
});
