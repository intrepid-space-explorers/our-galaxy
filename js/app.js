'use strict';

var input_form = document.getElementById('star_data_form');
var submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', submit_handler);

function submit_handler(event){
  event.preventDefault();
  console.log(event);
}
