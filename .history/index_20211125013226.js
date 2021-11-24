const calculateAndDisplayRoute = function (
  directionsService,
  directionsRenderer
) {
  const start = document.querySelector("input.content__start").value;
  const end = document.querySelector("input.content__end").value;
  directionsService.route(
    {
      origin: start,
      destination: end,
      travelMode: "WALKING",
    },
    function (response, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to" + status);
      }
    }
  );
};

initMap = function () {
  var myLatLng = { lat: 50.4080243, lng: 30.629657 };
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng,
    disableDefaultUI: true,
    mapTypeControl: true,
  });

  directionsRenderer.setMap(map);

  const btn = document.querySelector("input.content__calc");

  const onClickHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  btn.addEventListener("click", onClickHandler);
};

// function initMap() {
//   const uluru = { lat: -34.397, lng: 150.644 };
//   const mapElement = document.getElementById("map");
//   const map = new google.maps.Map(mapElement, {
//     zoom: 4,
//     center: uluru,
//   });

//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// }
