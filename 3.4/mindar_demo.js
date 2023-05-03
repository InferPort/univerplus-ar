import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

document.addEventListener("DOMContentLoaded", () => {
  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: "./assets/point1.mind",
    });

    const { renderer, scene, camera } = mindarThree;
    const geometry = new THREE.PlaneGeometry(2, 1);

    const map = new THREE.TextureLoader().load("./assets/bg0.png");

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      map: map,
    });

    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    await mindarThree.start();

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  };
  start();
});
