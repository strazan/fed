'use strict';

var input = document.getElementById('input--form');
var autocomplete = new google.maps.places.Autocomplete(input);
var outputOpenHours = document.getElementById('output--open-hours');
var outputIsOpen = document.getElementById('output--isOpen');
autocomplete.setTypes(['establishment']);

document.addEventListener('DOMContentLoaded', function () {
  // var button = document.getElementById('check--open-hours');
  autocomplete.addListener('place_changed', function () {
    checkOpenHours();
  });
});

input.addEventListener('input', function () {
  outputOpenHours.innerHTML = '';
  outputIsOpen.innerHTML = '';
  document.body.style.height = '270px';
});

function checkOpenHours() {
  var place = autocomplete.getPlace();

  if (!place.opening_hours) {
    outputOpenHours.innerHTML = "sorry, no info avalible";
  } else {
    outputIsOpen.innerHTML = place.opening_hours.open_now ? 'Yes' : 'No';
  }

  place.opening_hours.weekday_text.forEach(openHour => {
    var para = document.createElement("P"); 
    var text = document.createTextNode(openHour); 
    para.appendChild(text); 
    outputOpenHours.appendChild(para);
  });
}