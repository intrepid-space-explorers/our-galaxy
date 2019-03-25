'use strict'

var num_stars;
var star_array = [];
var star_types = [
     0,  1,  1,  2,  2,  2,  3,  3,  4,  4, 
     5,  5,  5,  6,  6,  6,  6,  6,  6,  6,
     7,  7,  7,  7,  7,  7,  7,  7,  8,  8,
     8,  8,  8,  8,  8,  8,  9,  9,  9,  9,
     9,  9,  9,  9,  9,  9,  9,  9,  9,  9,
     9,  9,  9,  9,  9,  9,  9, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 11, 11,
    11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
    11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 13
];
var planet_types = [
     0,  0,  0,  0,  0,  1,  1,  1,  1,  1,
     1,  1,  1,  1,  1,  2,  2,  2,  2,  2, 
     3,  3,  3,  3,  3,  3,  3,  3,  3,  3, 
     4,  4,  4,  4,  4,  4,  4,  4,  4,  4, 
     5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 
     6,  6,  7,  7,  7,  8,  8,  8,  8,  8,
     8,  8,  8,  8,  8,  8,  8,  8,  8,  8,
     8,  8,  8,  8,  8,  9,  9,  9, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 11, 11
]
var star_data_image_url = [''];
var star_data_name = ['Black Hole', 'Neutron Star', 'White Dwarf', 'Supernova-I', 'Supernova-II', 'Red Giant', 'Main Sequence I', 'Main Sequence II', 'Main Sequence III', 'Red Dwarf I', 'Red Dwarf II', 'Red Dwarf III', 'Blue Giant', 'Dyson Sphere'];
var star_data_minage = [.1, 5, 7, .1, .1, .1, 2, 3, 4, 2, 2, 2, .1];
var star_data_maxage = [13, 12, 13, .1, .1, .1, 6, 7, 8, 8, 10, 12, .5];
var star_data_chance_planets = [0, .01, .05, 0, 0, .4, .9, .9, .9, .9, .9, .9, .05];
var planet_data_image_url = [''];
var planet_data_name = ['Hot Giant', 'Rocky Dwarf', 'Hot Rock', 'Sub Terra', 'Terra', 'Super Terra', 'Water World', 'Gas Giant Moon', 'Gas Giant', 'Super Jovian', 'Ice Giant', 'Ice Dwarf'];
var planet_data_chance_life = [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0];

// ================================================
// Constructor
// ================================================

var Build_star = function(image_url, type, name, age, x, y, z, planets) {
    this.image_url = image_url;
    this.type = 0;
    this.name = name;
    this.age = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.planets = [{}];
    this.life = 0;
    this.intel = 0;
star_array.push(this);
};

var Build_planet = function(image_url, type, name) {
    this.image_url = image_url;
    this.type = type;
    this.name = name;
    this.age = age;
star_array.planets.push(this);
}

// get num_stars from local storage
// get life_drake from local storage
// get intel_drake from local storage

// populate star_Array objects

for (i = 0; i < num_stars; i++) {
    var s_type = Math.floor(Math.random() * 13);
    new Build_star(); //image_url, type, name, age, x, y, z, planets
    star_array[i].image_url = star_data_image_url[s_type];
    star_array[i].type = s_type;
    star_array[i].name = star_data_name[s_type];
    star_array[i].age = ((star_data_maxage[s_type] - star_data_minage[s_type]) * Math.random()) + star_data_minage[s_type];
    randomized_coordinates(x, y, z);
    star_array[i].x = x;
    star_array[i].y = y;
    star_array[i].z = z;
    var chance = Math.random();
    if (chance < star_data_chance_planets[s_type]) {
        var num_planets = Math.floor(Math.random() * 10);
        for (j = 0; j < num_planets; j++) {
            var p_type = Math.floor(Math.random() * 12);
            new Build_planet(); // image_url, type, name
            star_array[i].planets[j].image_url = planet_data_image_url[p_type];
            star_array[i].planets[j].type = p_type;
            star_array[i].planets[j].name = planet_data_name[p_type];
            star_array[i].planets[j].age = star_array[i].age;
            var chance_of_life = Math.random() / life_drake;
            if (chance_of_life < planet_data_chance_life[p_type]) {
                star_array[i].life = 1;
            } 
            var chance_of_intel = Math.random() / intel_drake;
            if star_array[i].age > 4 {
                if (chance_of_intel > 1) {
                    star_array[i].intel =1;
                }
            }
        }
    } 
}

// function handle_click_on_item1(event){
//     console.log('clicked on #1: ' + item1);
//     console.log('clicked on item: ' + market_items[item1].name);
//     like_counter++;
//     market_items[item1].clicks++;
//     more_items();
// localStorage.setItem('market_items_array_in_ls', stringy_object);
// localStorage.setItem('clicked_list_in_ls', clicked_list);
