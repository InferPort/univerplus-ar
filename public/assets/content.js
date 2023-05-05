
document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const arSystem = scene.systems["mindar-image-system"];

  arSystem.stop();
});
