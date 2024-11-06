let geoJsonLayer; // Declare a global variable for the GeoJSON layer

function buildMap(callback) {
  let myMap = L.map("map", {
    center: [38.8053, -122.7808],
    zoom: 2
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  function style(feature) {
    return { color: "gray", weight: 1, fillColor: "lightgray", fillOpacity: 0.5 };
  }

  let link = "https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson";

  d3.json(link).then(function(data) {
    const selectedCountries = ["United States of America", "Russia", "Canada", "China", "India", "Australia"];
    const countries = data.features;
    let filteredData = countries.filter(d => selectedCountries.includes(d.properties.ADMIN));
    
    geoJsonLayer = L.geoJson(filteredData, { style: style }).addTo(myMap);

    if (callback) callback();
  });
}

function updateMap(country) {
  geoJsonLayer.eachLayer(function(layer) {
    if (layer.feature.properties.ADMIN === country) {
      // Update the style or perform any action on the matching layer
      layer.setStyle({
        color: "gray",
        fillColor: "red",
        fillOpacity: 0.7
      });
    } else {
      // Optionally reset the style of non-matching layers
      layer.setStyle({
        color: "gray",
        fillColor: "lightgray",
        fillOpacity: 0.5
      });
    }
  });
}

function init() {
  buildMap(function() {
    document.getElementById("countrySelect").addEventListener("change", function() {
      const selectedCountry = this.value;
      updateMap(selectedCountry);
    });
  });
}

init();
