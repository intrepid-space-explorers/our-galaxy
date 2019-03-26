'use strict';

var stringy_number_of_stars = localStorage.getItem('number_of_stars');
var stringy_percent_of_life = localStorage.getItem('%of_pos_life_on_planet');
var stringy_percent_of_inteligent_life = localStorage.getItem('%of_intelegent_life');

var num_stars = JSON.parse(stringy_number_of_stars);
var star_array = [];
var star_types = [
  0, 1, 1, 2, 2, 2, 3, 3, 4, 4,
  5, 5, 5, 6, 6, 6, 6, 6, 6, 6,
  7, 7, 7, 7, 7, 7, 7, 7, 8, 8,
  8, 8, 8, 8, 8, 8, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11,
  11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
  11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 13
];
var planet_types = [
  0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 2, 2, 2, 2, 2,
  3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  6, 6, 7, 7, 7, 8, 8, 8, 8, 8,
  8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
  8, 8, 8, 8, 8, 9, 9, 9, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
  10, 10, 10, 10, 10, 10, 10, 10, 11, 11
];
var star_data_image_url = ['../assets/star_pictures/s0_blackhole.png', '../assets/star_pictures/s1_neutron.png', '../assets/star_pictures/s2_white_dwarf.png', '../assets/star_pictures/s3_supernova_i.png', '../assets/star_pictures/s4_supernova_ii.png', '../assets/star_pictures/s5_red_giant.png', '../assets/star_pictures/s6_main_i.png', '../assets/star_pictures/s7_main_ii.png', '../assets/star_pictures/s8_main_iii.png', '../assets/star_pictures/s9_red_dwarf_1.png', '../assets/star_pictures/s10_red_dwarf_2.png', '../assets/star_pictures/s11_red_dwarf_3.png', '../assets/star_pictures/s12_blue_giant.png', '../assets/star_pictures/s13_dyson_sphere.png'];
var star_data_name = ['Black Hole', 'Neutron Star', 'White Dwarf', 'Supernova-I', 'Supernova-II', 'Red Giant', 'Main Sequence I', 'Main Sequence II', 'Main Sequence III', 'Red Dwarf I', 'Red Dwarf II', 'Red Dwarf III', 'Blue Giant', 'Dyson Sphere'];
var star_data_minage = [.1, 5, 7, .1, .1, .1, 2, 3, 4, 2, 2, 2, .1];
var star_data_maxage = [13, 12, 13, .1, .1, .1, 6, 7, 8, 8, 10, 12, .5];
var star_data_chance_planets = [0, .01, .05, 0, 0, .4, .9, .9, .9, .9, .9, .9, .05];
var planet_data_image_url = ['', '', '', '', '', '', '', '', '', '', '', ''];
var planet_data_name = ['Hot Giant', 'Rocky Dwarf', 'Hot Rock', 'Sub Terra', 'Terra', 'Super Terra', 'Water World', 'Gas Giant Moon', 'Gas Giant', 'Super Jovian', 'Ice Giant', 'Ice Dwarf'];
var planet_data_chance_life = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0];

// ================================================
// Constructor
// ================================================

function Build_star() {
  this.planets = [],
  star_array.push(this);
}

Build_star.prototype.if_clicked = function() {
  var click_difference = dist(this.x, this.y, mouseX, mouseY);
  if (click_difference <= (this.z / 2)) {
    console.log(this);
  }
};

function Build_planet(index) {
  star_array[index].planets.push(this);
}

var life_drake = JSON.parse(stringy_percent_of_life);
var intel_drake = JSON.parse(stringy_percent_of_inteligent_life);
// get num_stars from local storage
// get life_drake from local storage
// get intel_drake from local storage

// populate star_Array objects

for (var i = 0; i < num_stars; i++) {
  var s_type = Math.floor(Math.random() * 13);
  new Build_star();
  star_array[i].image_url = s_type;
  star_array[i].type = s_type;
  star_array[i].name = star_data_name[s_type];
  star_array[i].age = ((star_data_maxage[s_type] - star_data_minage[s_type]) * Math.random()) + star_data_minage[s_type];
  star_array[i].x = randomized_coordinates()[0];
  star_array[i].y = randomized_coordinates()[1];
  star_array[i].z = randomized_coordinates()[2];

  var chance = Math.random();
  if (chance < star_data_chance_planets[s_type]) {
    var num_planets = Math.floor(Math.random() * 10);
    for (var j = 0; j < num_planets; j++) {
      var p_type = Math.floor(Math.random() * 12);
      new Build_planet(i); // image_url, type, name
      star_array[i].planets[j].image_url = planet_data_image_url[p_type];
      star_array[i].planets[j].type = p_type;
      star_array[i].planets[j].name = planet_data_name[p_type];
      star_array[i].planets[j].age = star_array[i].age;
      var chance_of_life = Math.random() / life_drake;
      if (chance_of_life < planet_data_chance_life[p_type]) {
        star_array[i].life = 1;
      }
      var chance_of_intel = Math.random() / intel_drake;
      if (star_array[i].age > 4) {
        if (chance_of_intel > 1) {
          star_array[i].intel = 1;
        }
      }
    }
  }
}

console.log(star_array);

// function handle_click_on_item1(event){
//     console.log('clicked on #1: ' + item1);
//     console.log('clicked on item: ' + market_items[item1].name);
//     like_counter++;
//     market_items[item1].clicks++;
//     more_items();
// localStorage.setItem('market_items_array_in_ls', stringy_object);
// localStorage.setItem('clicked_list_in_ls', clicked_list);

//===============================
// p5 Canvas
//===============================
var img;
var background_img;
var images = [];

function preload() {
  for (var i = 0; i < star_data_image_url.length; i++) {
    img = loadImage(star_data_image_url[i]);
    images.push(img);
  }
  background_img = loadImage('../assets/star_pictures/Milky_Way-view3.jpg');

}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  background(0);

  // push();
  // texture(background_img);
  // textureMode(NORMAL);
  // translate(0, 0, -1100);
  // plane(5000);
  // pop();

  // ambientMaterial(250);
  // directionalLight(255, 255, 255, 0, 1, -2);
  noStroke();

  for (var i in star_array) {

    fill(255);
    ellipse(star_array[i].x, star_array[i].y, star_array[i].z, star_array[i].z);
    // texture(images[star_array[i].image_url]);
    // textureMode(NORMAL);
    // plane(30);
    // sphere(7);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function draw() {

}

function mousePressed() {
  for (var i in star_array) {
    star_array[i].if_clicked();
  }
}

function randomized_coordinates() {
  var random_x = Math.floor(((Math.random() * (window.innerWidth - 20)) + 10));
  var random_y = Math.floor(((Math.random() * (window.innerHeight - 20)) + 10));
  var random_psuedo_z = Math.floor(Math.random() * 7) + 3;

  var coordinates = [random_x, random_y, random_psuedo_z];
  return coordinates;
}
