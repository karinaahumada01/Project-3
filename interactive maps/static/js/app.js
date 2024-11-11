let geoJsonLayer; // Declare a global variable for the GeoJSON layer

function buildMap(callback) {
  let myMap = L.map("map", {
    center: [51.505, -0.09],
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

function updateMap(stat, year) {

  d3.json("https://api.jsonbin.io/v3/qs/672d6689e41b4d34e450814f").then(async (data) => {
    objects = data.record;
    selectedData = objects.filter(item => item["Year Range"] === year);
    
    
    
    
    const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)
        .domain([-10, 10]);
    for (let i = 0; i < objects.length; i++) {
      let value = selectedData[i][stat];
      let country = selectedData[i]["Country"];
      await new Promise((resolve) => {
        geoJsonLayer.eachLayer(function(layer) {
          if (layer.feature.properties.ADMIN === country || layer.feature.properties.ISO_A3 === country) {
          // Update the style or perform any action on the matching layer
            layer.setStyle({
              color: "gray",
              fillColor: colorScale(value),
              fillOpacity: 0.7
            });

            let coordinates = layer.getBounds().getCenter();
            L.marker(coordinates)
              .addTo(geoJsonLayer)
              .bindPopup(country + "<br>" + stat + ": " + value);
            
            resolve();
          }
        });
      });
    }
  });
}

function init() {
  d3.json("https://api.jsonbin.io/v3/qs/672d6689e41b4d34e450814f").then((data) => {
    objects = data.record;
    buildMap(function() {
    const names = Object.keys(objects[0]);
    console.log(objects[0]);
    let dropdown = d3.select("#dropdown");
    names.forEach((n) => {
      dropdown.append("option")
      .text(n)
      .attr("value", n);
      });
    });
    const years = [...new Set(objects.map(item => item["Year Range"]))];
    let yearDropdown = d3.select("#yearDropdown");
    years.forEach((y) => {
      yearDropdown.append("option")
      .text(y)
      .attr("value", y);
    });
  });
}

function optionChanged(newStat) {
  const selectedYear = document.getElementById("yearDropdown").value;
  updateMap(newStat, selectedYear);
}

function yearChanged(newYear) {
  const selectedStat = document.getElementById("dropdown").value;
  updateMap(selectedStat, newYear);
}


init();
