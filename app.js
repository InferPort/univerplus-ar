const dotenv = require("dotenv").config();
const express = require("express");
const https = require("https");
const app = express();
const fs = require("fs");
const router = express.Router();

/* VARIABLES */
const port = process.env.PORT || 3000;
const scale = process.env.PLANE_SCALE || 3;
const debug_mode = process.env.DEBUG || 0;
const target_quantity = fs.readdirSync("./public/assets/targets").length;

const message = () => {
  console.log("  ___       __         ___         _   ");
  console.log(" |_ _|_ _  / _|___ _ _| _ \\___ _ _| |_ ");
  console.log("  | || ' \\|  _/ -_) '_|  _/ _ \\ '_|  _|");
  console.log(" |___|_||_|_| \\___|_| |_| \\___/_|  \\__|");
  console.log(`
  FOUND ${target_quantity} TARGETS

  Copyright (c) 2023 InferPort (@nikitacontreras / Nicolás Contreras)
  https://inferport.com | https://github.com/InferPort
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  `);

  console.log(`Running on port: ${port}`);
}

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/univerplus-ar", express.static("public"));

router.use(() => {});

router.get("/", (req, res) => {
  res.render("index.ejs", { scale, target_quantity, debug_mode });
});

app.use(
  "/scripts/aframe",
  express.static(__dirname + "/node_modules/aframe/dist/")
);
app.use(
  "/scripts/mindar",
  express.static(__dirname + "/node_modules/mind-ar/dist/")
);
app.use(
  "/scripts/threejs",
  express.static(__dirname + "/node_modules/three/build/")
);
app.use(
  "/scripts/dotenv",
  express.static(__dirname + "/node_modules/dotenv/lib/")
);
app.use(
  "/scripts/jquery",
  express.static(__dirname + "/node_modules/jquery/dist/")
);
app.use(
  "/scripts/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist/")
);
app.use("/render", express.static("public/assets/render"));

app.use(
  "/univerplus-ar/scripts/aframe",
  express.static(__dirname + "/node_modules/aframe/dist/")
);
app.use(
  "/univerplus-ar/scripts/mindar",
  express.static(__dirname + "/node_modules/mind-ar/dist/")
);
app.use(
  "/univerplus-ar/scripts/threejs",
  express.static(__dirname + "/node_modules/three/build/")
);
app.use(
  "/univerplus-ar/scripts/dotenv",
  express.static(__dirname + "/node_modules/dotenv/lib/")
);
app.use(
  "/univerplus-ar/scripts/jquery",
  express.static(__dirname + "/node_modules/jquery/dist/")
);
app.use(
  "/univerplus-ar/scripts/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist/")
);
app.use("/univerplus-ar/render", express.static("public/assets/render"));

app.get("/", (req, res) => {
  res.render("index.ejs", { scale, target_quantity, debug_mode });
});

app.get("/univerplus-ar", (req, res) => {
  res.render("index.ejs", { scale, target_quantity, debug_mode });
});

if (process.env.CUSTOM_SSL == 1) {
  var options = {
    key: fs.readFileSync("./ssl/ca-key.pem"),
    cert: fs.readFileSync("./ssl/ca-cert.pem"),
  };
  https.createServer(options,app).listen(port, () => {message()});
} else {
  app.listen(port, () => {
    message();
  });
}


