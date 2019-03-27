'use strict';

var data_window_open = false;
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
var planet_data_image_url = ['../assets/star_pictures/p0_hot_giant.jpg', '../assets/star_pictures/p1_hot_rocky.jpg', '../assets/star_pictures/p2_rocky_dwarf.jpg', '../assets/star_pictures/p3_sub_terra.jpg', '../assets/star_pictures/p4_terra.jpg', '../assets/star_pictures/p5_super_terra.jpg', '../assets/star_pictures/p6_water_world.jpg', '../assets/star_pictures/p7_gas_giant_moon.jpg', '../assets/star_pictures/p8_gas_giant.jpg', '../assets/star_pictures/p9_super_jovian.jpg', '../assets/star_pictures/p10_ice_giant.jpg', '../assets/star_pictures/p11_ice_dwarf.jpg', '../assets/star_pictures/p12_dyson_sphere.jpg'];
var planet_data_name = ['Hot Giant', 'Hot Rocky', 'Rocky Dwarf', 'Sub Terra', 'Terra', 'Super Terra', 'Water World', 'Gas Giant Moon', 'Gas Giant', 'Super Jovian', 'Ice Giant', 'Ice Dwarf', 'Dyson Sphere'];
var planet_data_chance_life = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1];
var total_life_count = 0;
var total_intel_count = 0;
var mark_life_count = 0;
var mark_intel_count = 0;

// ================================================
// get data from local storage
// ================================================

var stringy_number_of_stars = localStorage.getItem('number_of_stars');
var stringy_percent_of_life = localStorage.getItem('%of_pos_life_on_planet');
var stringy_percent_of_intelligent_life = localStorage.getItem('%of_intelligent_life');
var life_drake = (JSON.parse(stringy_percent_of_life) || 1);
var intel_drake = (JSON.parse(stringy_percent_of_intelligent_life) || 0.25);
var num_stars = (JSON.parse(stringy_number_of_stars) || 1000);

// ================================================
// Solar System Constructor
// ================================================

function Build_star() {
  this.has_planets = false;
  this.planets = [],
  star_array.push(this);
}

Build_star.prototype.if_clicked = function() {
  var click_difference = dist(this.x, this.y, mouseX, mouseY);
  if (!data_window_open) {
    if (click_difference <= (this.z / 2)) {
      console.log(this);
      var new_div = createDiv('');
      new_div.attribute('id', 'data_div');
      var new_y = mouseY;
      var new_x = mouseX;
      this.populate_with_data();

      if (mouseY > (window.innerHeight / 2)) {
        new_y = mouseY - (new_div.size().height);
      }
      if (mouseX > (window.innerWidth / 2)) {
        new_x = mouseX - (new_div.size().width);
      }
      new_div.position(new_x, new_y);

      data_window_open = true;
      var ctx = this;
      var handleScan = function() {
        ctx.scan_for_planets();
      };

      var scan = document.getElementById('scan');
      scan.addEventListener('click', handleScan);

      var close = document.getElementById('close_button');
      close.addEventListener('click', close_div);
    }
  }

  function close_div() {
    removeElements();
    data_window_open = false;
  }
};


Build_star.prototype.populate_with_data = function() {
  var data_div = document.getElementById('data_div');

  var image = document.createElement('img');
  image.setAttribute('src', this.image_url);
  data_div.appendChild(image);

  var data_list = document.createElement('ul');

  var name = document.createElement('li');
  // console.log(data);
  name.textContent = `Type: ${this.name}`;
  data_list.appendChild(name);

  var age = document.createElement('li');
  age.textContent = `Age: ${this.age} billion years old.`;
  data_list.appendChild(age);

  var planets = document.createElement('li');
  planets.textContent = `Planets: ${this.has_planets}`;
  data_list.appendChild(planets);

  data_div.appendChild(data_list);

  var button = document.createElement('button');
  button.setAttribute('id', 'scan');
  button.textContent = 'Scan For Planets';
  data_div.appendChild(button);

  var button = document.createElement('button');
  button.setAttribute('id', 'close_button');
  button.textContent = 'Close';
  data_div.appendChild(button);
};

Build_star.prototype.scan_for_planets = function() {
  var data_div = document.getElementById('data_div');

  var new_planets_div = document.createElement('div');
  new_planets_div.setAttribute('id', 'planet_div');

  data_div.append(new_planets_div);
  if (this.has_planets === true) {
    this.populate_planet_data();
  } else {
    new_planets_div.textContent = 'No planets found';
  }
};

Build_star.prototype.populate_planet_data = function() {
  for (var i = 0; i < this.planets.length; i++) {
    this.planets[i].populate_with_data();
    console.log('planet');
  }
};

function Build_planet(index) {
  star_array[index].planets.push(this);
}

Build_planet.prototype.populate_with_data = function() {
  var data_div = document.getElementById('planet_div');

  var image = document.createElement('img');
  image.setAttribute('src', star_data_image_url[this.image_url]);
  data_div.appendChild(image);

  var data_list = document.createElement('ul');

  var name = document.createElement('li');
  // console.log(data);
  name.textContent = `Type: ${this.name}`;
  data_list.appendChild(name);

  data_div.appendChild(data_list);

  var button = document.createElement('button');
  button.setAttribute('id', 'close_button');
  button.textContent = 'Close';
  data_div.appendChild(button);
};


// ================================================
// populate star_Array objects
// ================================================

for (var i = 0; i < num_stars; i++) {
  // 14 types of stars in database, pick random number 0 to 99, set s-type to star of that number
  var chance = Math.floor(Math.random() * 99);
  var chance2 = Math.floor(Math.random() * 99); // easter egg time!  add dyson sphere
  if (chance === 99 && chance2 === 99) {
    s_type = 100;
  }
  var s_type = star_types[chance];
  new Build_star();
  star_array[i].image_url = star_data_image_url[s_type];
  star_array[i].type = s_type;
  star_array[i].name = star_data_name[s_type];
  star_array[i].age = (Math.floor((star_data_maxage[s_type] - star_data_minage[s_type]) * Math.random() * 1000)) / 1000 + star_data_minage[s_type];
  star_array[i].x = randomized_coordinates()[0];
  star_array[i].y = randomized_coordinates()[1];
  star_array[i].z = randomized_coordinates()[2];
  var chance = Math.random(); // set random chance for if star has planets
  if (chance < star_data_chance_planets[s_type]) {
    star_array[i].has_planets = true;
    var num_planets = Math.floor(Math.random() * 8) + 2;
    // max number of possible planets in solar system is arbitrarily set to 2 to 10
    for (var j = 0; j < num_planets; j++) {
      var k = 0;
      while (k === 0) {
        var chance = Math.floor(Math.random() * 99);
        // 12 types of planets in database, random pick of 0 to 99, set p-type to planet of that number
        var p_type = planet_types[chance];
        // conditionals to put hot planets by star and cold planets away from it
        if (
          ((j === 0 && num_planets > 1) && (p_type === 10 || p_type === 11)) ||
                    ((j === num_planets || j === (num_planets - 1)) && (p_type === 0 || p_type === 1)) ||
                    (j > 2 && (p_type === 0 || p_type === 1)) ||
                    (j < num_planets - 3) && (p_type === 10 || p_type === 11)
        ) {
          k = 0;
        } else {
          k = 1;
        }
      }
      new Build_planet(i);
      star_array[i].planets[j].image_url = planet_data_image_url[p_type];
      star_array[i].planets[j].type = p_type;
      star_array[i].planets[j].name = planet_data_name[p_type];
      var chance_of_life = Math.random() / life_drake; // set random chance if planet has life
      if (chance_of_life < planet_data_chance_life[p_type]) {
        star_array[i].life = 1;
        total_life_count++;
        var chance_of_intel = Math.random() / intel_drake; // set random chance if life is intelligent
        if (star_array[i].age > 4 && chance_of_intel > 1) {
          star_array[i].intel = 1;
          total_intel_count++;
        }
      }
      //  dyson sphere logic
      if (star_array[i].type === 100) {
        star_array[i].planets[j].image_url = planet_data_image_url[12];
        star_array[i].planets[j].type = 12;
        star_array[i].planets[j].name = planet_data_name[12];
        star_array[i].planets[j].age = star_array[i].age;
        star_array[i].life = 1;
        star_array[i].intel = 1;
        j = num_planets;
      }
    }
  }
}

// ================================================
// p5 Canvas area
// ================================================

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
    // texture(images[star_array[i].type]);
    // textureMode(NORMAL);
    // plane(30);
    // sphere(7);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

// function draw() {
// }

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
