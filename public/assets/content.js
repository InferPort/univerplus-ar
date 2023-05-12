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

/*
PLANE SIZE
*/
const plane_height = 0.552;
const plane_width = 1;
const plane_size = (plane, scale) => {
  $(plane).attr("height", plane_height * scale);
  $(plane).attr("width", plane_width * scaleF);
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

/*
UI CHECKER
*/

const is_landscape = () => {
  return window.innerHeight < window.innerWidth ? true : false;
};

const ui_instructions = () => {
  is_landscape() ? $("#instructions").hide() : $("#instructions").show();
};

const landscape_message = () => {
  $("#messages").hide();
};

document.addEventListener("DOMContentLoaded", () => {
  ui_instructions();

  const scene = document.querySelector("a-scene");
  const arSystem = scene.systems["mindar-image-system"];

  const targets = [];

  for (let i = 1; i <= targetQuantity; i++) {
    targets[i] = document.querySelector(`#plane_${i}`);
  }

  targets.forEach((target) => {
    target.addEventListener("targetFound", (event) => {
      playAudio(audioAPIpath(target.id));
    });

    if (debugMode) {
      target.addEventListener("targetFound", (event) => {
        console.log(`Target ${target.id} found`);
      });
      // detect target lost
      target.addEventListener("targetLost", (event) => {
        console.log(`Target ${target.id} lost`);
      });
    }
  });

  scene.addEventListener("arReady", (event) => {
    $("#landscape-message img").bind("click", () => {
      toggleFullScreen();
      landscape_message();
    });
  });
});

window.addEventListener("resize", () => {
  ui_instructions();
});
