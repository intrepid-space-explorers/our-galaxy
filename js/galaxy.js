'use strict';

var temp_star = {
  type: 'a star',
  name: 'star 01',
  age: random_age(),
  x: randomize()[0],
  y: randomize()[1],
  z: randomize()[2],
  planets: []
};
var star_array = [temp_star];

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  console.log(star_array);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function draw() {
  ambientMaterial(250);
  directionalLight(255, 255, 255, 0, 1, -2);
  noStroke();

  for (var i in star_array) {
    push();
    translate(star_array[i].x, star_array[i].y, star_array[i].z);
    sphere(10);
    pop();
  }

}


function randomize() {
  var random_x = Math.floor(((Math.random() * (window.innerWidth - 20)) - (window.innerWidth / 2) + 10));
  var random_y = Math.floor(((Math.random() * (window.innerHeight - 20)) - (window.innerHeight / 2) + 10));
  var random_z = Math.floor(Math.random() * -500);

  var coordinates = [random_x, random_y, random_z];
  return coordinates;
}

function random_age() {
  var random_age = Math.floor(Math.random() * 100);
  return random_age;
}
