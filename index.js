mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hpdmFtLWpoYSIsImEiOiJja3hvdmRpdTQwM3I1MnNtdnloYnJ2NDlvIn0.7UEvsJJF7zN2F7vxAVS7bw";
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  setupmap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupmap([]);
}

function setupmap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15,
  });
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({ accessToken: mapboxgl.accessToken });
  map.addControl(directions, "top-left");

  map.on("load", function () {
    map.on("click", function () {
      const marker2 = new mapboxgl.Marker({ color: "red" })
        .setLngLat([78.44454, 17.56371])
        .addTo(map);
      // let point=navigator.geolocation.getCurrentPosition(positon => { console.log(positon) })
      // var lat =GeolocationCoordinates.latitude;
      // var lng =GeolocationCoordinates.longitude;
      var coordinates = [78.44454, 17.56371];
      var ISSUE =
        "<p><a>ISSUE - </a><select><option><b>Select Issue<b></opotion><option>Clean Garbage</option><option>Sewage Issue</option><option>Road Damage</option></select><br>UPLOAD-Files-<br><a>File-1<input type='File'>File-2<input type='File'>File-3<input type='File'>ISSUE-DEATILS:<input><button onclick=' + { this.handlePop } + ' action='Submit' method='POST'> Submit </button></p>";
      new mapboxgl.Popup().setLngLat(coordinates).setHTML(ISSUE).addTo(map);
    });

    L.mapbox
      .featureLayer()
      .loadURL("/mapbox.js/assets/data/stations.geojson")
      .on("ready", function (e) {
        // create a new MarkerClusterGroup that will show special-colored
        // numbers to indicate the type of rail stations it contains
        function makeGroup(color) {
          return new L.MarkerClusterGroup({
            iconCreateFunction: function (cluster) {
              return new L.DivIcon({
                iconSize: [20, 20],
                html:
                  '<div style="text-align:center;color:#fff;background:' +
                  color +
                  '">' +
                  cluster.getChildCount() +
                  "</div>",
              });
            },
          }).addTo(map);
        }
        // create a marker cluster group for each type of rail station
        var groups = {
          red: makeGroup("red"),
          green: makeGroup("green"),
          orange: makeGroup("orange"),
          blue: makeGroup("blue"),
          yellow: makeGroup("yellow"),
        };
        e.target.eachLayer(function (layer) {
          // add each rail station to its specific group.
          groups[layer.feature.properties.line].addLayer(layer);
        });
      });

    // // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'places', function() {
    //     map.getCanvas().style.cursor = 'pointer';
    // });

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'places', function() {
    //     map.getCanvas().style.cursor = '';
    // });
  });

  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );
}

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  let center = [lng, lat];
});

//attaching mangoDb

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const { Collection } = require("mongodb");
const app = express();

app.use(bodyParser.json());
app.use(express.static("main.html"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mangoose.connect("mongod://localhhost:27017/keepmeclean", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error is Connecting to DataBase"));
db.once("open", () => console.log("Connected to Database"));

app.post("Sumbit", (req, res) => {
  var ISSUE = req.body.ISSUE;
  var UPLOAD1 = req.body.File - 1;
  var UPLOAD2 = req.body.File - 2;
  var UPLOAD3 = req.body.File - 3;
  var discription = req.body.ISSUE - DEATILS;

  var data = {
    Issue: Issue,
    "Images\vides": UPLOAD1,
    "Images\vides": UPLOAD2,
    "Images\vides": UPLOAD3,
  };

  db.collections("users").insertOne(data, (err, Collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });
  return res.redirect("submit_success.html");
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    return res.redirect("main.html");
  })
  .listen(50000);

console.log("Listenting on PORT 3000");
