import * as THREE from "three";
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';



console.log(THREE);

document.addEventListener("DOMContentLoaded", () => {
  // crear escena
  const scene = new THREE.Scene();

  // agregar geometría para generar el cubo
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00f10f });
  const cube = new THREE.Mesh(geometry, material);

  // agregar el cubo a la escena
  scene.add(cube);
  // asignarle una posición al cubo dentro de la escena
  cube.position.set(0, 0, -2);
  cube.rotation.set(0, Math.PI / 4, 0);

  // agregar cámara
  const camera = new THREE.PerspectiveCamera();
  camera.position.set(1, 1, 5);

  // agregar el renderer a la pantalla, definirle alpha para transparencia
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(500, 500);
  renderer.render(scene, camera);

  const video = document.createElement("video");
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });

  video.style.position = "absolute";
  video.style.width = renderer.domElement.width;
  video.style.height = renderer.domElement.height;
  renderer.domElement.style.position = "absolute";

  document.body.appendChild(video);
  document.body.appendChild(renderer.domElement);

  

});