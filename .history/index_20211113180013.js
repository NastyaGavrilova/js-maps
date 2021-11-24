let map;

function initMap() {
  const uluru = { lat: -34.397, lng: 150.644 };
  const mapElement = document.getElementById("map");
  const map = new google.maps.Map(mapElement, {
    zoom: 8,
    center: uluru,
  });
}
global.initMap = initMap;
