mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hpdmFtLWpoYSIsImEiOiJja3hvdmRpdTQwM3I1MnNtdnloYnJ2NDlvIn0.7UEvsJJF7zN2F7vxAVS7bw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [78.44247, 17.56157],
  zoom: 13,
});

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  zoom: 25,
  bbox: [-74.390249, 40.414685, -73.51939, 40.976805],
  marker: {
    color: "orange",
  },
  mapboxgl: mapboxgl,
});

map.addControl(geocoder, "top-left");

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,

    showUserHeading: true,
  })
);

map.on("load", function () {
  map.on("click", function () {
    const marker = new mapboxgl.Marker({
      color: "red",
      // draggable: true,
    })
      .setLngLat([78.44247, 17.56157])
      .addTo(map);

    var coordinates = [78.44247, 17.56157];
    var ISSUE =
      "<p><a>ISSUE - </a><select><option><b>Select Issue<b></opotion><option>Clean Garbage</option><option>Sewage Issue</option><option>Road Damage</option></select><br>UPLOAD-Files-<br><a>File-1<input type='File'>File-2<input type='File'>File-3<input type='File'>ISSUE-DEATILS:<input><button onclick=' + { this.handlePop } + ' action='Submit' method='POST'> Submit </button></p>";
    new mapboxgl.Popup({
      draggable: true,
    })
      .setLngLat(coordinates)
      .setHTML(ISSUE)
      .addTo(map);
  });
});
