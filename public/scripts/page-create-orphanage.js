// create map
const map = L.map('mapid').setView([-27.222633, -49.6455874], 15);

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// add photo field
function addPhotoField() {
  // photo container #images
  const photoContainer = document.querySelector('#images');

  // photo uploads .new-upload
  const fieldsContainer = document.querySelectorAll('.new-upload');

  // clone images
  const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

  // if field is empty
  const input = newFieldContainer.children[0];

  if (input.value == '') {
    return;
  }

  // clean input
  input.value = '';

  // add clone to photo container
  photoContainer.appendChild(newFieldContainer);
}

// remove photo field
function deletePhotoField(event) {
  const span = event.currentTarget;
  const fieldsContainer = document.querySelectorAll('.new-upload');

  if (fieldsContainer.length <= 1) {
    /// clean field
    span.parentNode.children[0].value = '';
    return;
  }

  // delete field
  span.parentNode.remove();
}

// switch yes / no
function toggleSelect(event) {
  event.preventDefault();
  // remove .active
  document.querySelectorAll('.button-select button').forEach((button) => {
    button.classList.remove('active');
  });

  // get clicked button and add .active
  const button = event.currentTarget;
  button.classList.add('active');

  // update hidden input with selected value
  const input = document.querySelector("[name='open_on_weekends']");

  input.value = button.dataset.value;
}

// validate lat & lng
// function validate(event) {
//   const needsLatAndLng = true;
//   if (needsLatAndLng) {
//     event.preventDefault();
//   }
// }
