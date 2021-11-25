function initMap() {
  const markerArray = [];
  // Instantiate a directions service.
  const directionsService = new google.maps.DirectionsService();
  // Create a map and center it on Poznyaki.
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 50.4080243, lng: 30.629657 },
  });
  // Create a renderer for directions and bind it to the map.
  const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
  // Instantiate an info window to hold step text.
  const stepDisplay = new google.maps.InfoWindow();

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(
    directionsRenderer,
    directionsService,
    markerArray,
    stepDisplay,
    map
  );

  // Listen to change events from the start and end lists.
  const onChangeHandler = function () {
    calculateAndDisplayRoute(
      directionsRenderer,
      directionsService,
      markerArray,
      stepDisplay,
      map
    );
  };

  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(
  directionsRenderer,
  directionsService,
  markerArray,
  stepDisplay,
  map
) {
  // First, remove any existing markers from the map.
  for (let i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService
    .route({
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((result) => {
      // Route the directions and pass the response to a function to create
      // markers for each step.
      document.getElementById("warnings-panel").innerHTML =
        "<b>" + result.routes[0].warnings + "</b>";
      directionsRenderer.setDirections(result);
      showSteps(result, markerArray, stepDisplay, map);
    })
    .catch((e) => {
      window.alert("Directions request failed due to " + e);
    });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  const myRoute = directionResult.routes[0].legs[0];

  for (let i = 0; i < myRoute.steps.length; i++) {
    const marker = (markerArray[i] =
      markerArray[i] || new google.maps.Marker());

    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
      stepDisplay,
      marker,
      myRoute.steps[i].instructions,
      map
    );
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, "click", () => {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

// const calculateAndDisplayRoute = function (
//   directionsService,
//   directionsRenderer
// ) {
//   const start = document.querySelector("input.content__start").value;
//   const end = document.querySelector("input.content__end").value;
//   directionsService.route(
//     {
//       origin: start,
//       destination: end,
//       travelMode: "WALKING",
//     },
//     function (response, status) {
//       if (status === "OK") {
//         directionsRenderer.setDirections(response);
//       } else {
//         window.alert("Directions request failed due to" + status);
//       }
//     }
//   );
// };

// initMap = function () {
//   var myLatLng = { lat: 50.4080243, lng: 30.629657 };
//   var directionsService = new google.maps.DirectionsService();
//   var directionsRenderer = new google.maps.DirectionsRenderer();
//   var map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 15,
//     center: myLatLng,
//     disableDefaultUI: true,
//     mapTypeControl: true,
//   });

//   directionsRenderer.setMap(map);

//   const btn = document.querySelector("input.content__calc");

//   const onClickHandler = function () {
//     calculateAndDisplayRoute(directionsService, directionsRenderer);
//     console.log(
//       calculateAndDisplayRoute(directionsService, directionsRenderer)
//     );
//   };
//   btn.addEventListener("click", onClickHandler);
// };

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
