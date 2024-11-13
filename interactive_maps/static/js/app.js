// Declare a global variable for the GeoJSON layer
let geoJsonLayer;

function buildMap(callback) {
  // Initialize the map with specified center and zoom level
  let myMap = L.map("map", {
    center: [15.505, -0.09],
    zoom: 2
  });

  // Add OpenStreetMap tiles to the map with attribution
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Define a style function to style the countries' polygons
  function style(feature) {
    return { color: "gray", weight: 1, fillColor: "lightgray", fillOpacity: 0.5 };
  }

  // Link to GeoJSON data source for country boundaries
  let link = "https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson";

  // Load GeoJSON data and filter for selected countries
  d3.json(link).then(function(data) {
    const selectedCountries = ["United States of America", "Russia", "Canada", "China", "India", "Australia"];
    const countries = data.features;
    let filteredData = countries.filter(d => selectedCountries.includes(d.properties.ADMIN));
    
    // Add filtered country polygons to the map with specified styles
    geoJsonLayer = L.geoJson(filteredData, { style: style }).addTo(myMap);

    // Add legend control to display percentage change color scale
    const legend = L.control({ position: "topright" });

    // Define legend content
    legend.onAdd = function(myMap) {
      const div = L.DomUtil.create("div", "info legend");
      div.style.backgroundColor = "white";
      div.style.padding = "8px";
      div.style.borderRadius = "5px";
      div.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.2)";

      // Define depth intervals for the color legend
      const depths = [-10, -5, 0, 5, 10];
      const labels = [];
  
      // Create a color scale for the depth intervals
      const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)
        .domain([-10, 10]);
      
      // Generate a label with a color box for each depth interval
      for (let i = 0; i < depths.length; i++) {
          const color = colorScale(depths[i]);
          
          labels.push(
              `<i style="background-color: ${color}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> 
               ${depths[i]} %`
          );
      }

      div.innerHTML = "<h4>Percentage Change</h4>" + labels.join("<br>");
      return div;
    };
    legend.addTo(myMap);

    // Execute the callback function, if provided
    if (callback) callback();
  });
}

// Function to update the map based on selected statistic and year
function updateMap(stat, year) {

  // Load dataset with country-specific statistics
  d3.json("https://api.jsonbin.io/v3/b/6733ff84acd3cb34a8a7ac4c").then(async (data) => {
    objects = data.record;
    selectedData = objects.filter(item => item["Year Range"] === year);
    
    // Define color scale for percentage change visualization
    const colorScale = d3.scaleSequential(d3.interpolateRdYlGn)
        .domain([-10, 10]);

    // Loop through each selected data item
    for (let i = 0; i < selectedData.length; i++) {
      let value = selectedData[i][stat];
      let country = selectedData[i]["Country"];

      // Await to ensure each layer is updated sequentially
      await new Promise((resolve) => {
        geoJsonLayer.eachLayer(function(layer) {
          if (layer.feature.properties.ADMIN === country || layer.feature.properties.ISO_A3 === country) {
            // Update the style of matching country layer based on the statistic value
            layer.setStyle({
              color: "gray",
              fillColor: colorScale(value),
              fillOpacity: 0.7
            });

            let coordinates;

            // Set custom popup coordinates for specific countries
            if (country === "USA") {
              coordinates = [37.0902, -95.7129]; // Coordinates for USA
            } else if (country === "Russia") {
              coordinates = [61.5240, 105.3188]; // Coordinates for Russia
            } else {
              coordinates = layer.getBounds().getCenter(); // Default center for other countries
            }

            // Add a popup marker displaying country name and statistic
            L.marker(coordinates)
              .addTo(geoJsonLayer)
              .bindPopup(country + "<br>" + stat + ": " + value.toFixed(2) + "%");

            resolve(); // Resolve promise to continue to the next layer
          }
        });
      });
    }
  });
}

// Initialize function to build the map and populate dropdown menus
function init() {
  // Load data from JSON source to populate dropdowns
  d3.json("https://api.jsonbin.io/v3/b/6733ff84acd3cb34a8a7ac4c").then((data) => {
    objects = data.record;

    // Build the map and add callback to create dropdown for statistics
    buildMap(function() {
      const names = Object.keys(objects[0]).slice(2); // Get available statistics
      let dropdown = d3.select("#dropdown");
      
      // Add each statistic as an option in the dropdown menu
      names.forEach((n) => {
        dropdown.append("option")
        .text(n)
        .attr("value", n);
      });
    });

    // Extract unique years for the year dropdown menu
    const years = [...new Set(objects.map(item => item["Year Range"]))];
    let yearDropdown = d3.select("#yearDropdown");
    
    // Add each year as an option in the dropdown menu
    years.forEach((y) => {
      yearDropdown.append("option")
      .text(y)
      .attr("value", y);
    });

    // Set initial selections for statistic and year
    let firstStat = names[0];
    let firstYear = years[0];
    updateMap(firstStat, firstYear); // Initialize map with first statistic and year
  });
}

// Event handler to update map when a new statistic is selected
function optionChanged(newStat) {
  const selectedYear = document.getElementById("yearDropdown").value;
  updateMap(newStat, selectedYear);
}

// Event handler to update map when a new year is selected
function yearChanged(newYear) {
  const selectedStat = document.getElementById("dropdown").value;
  updateMap(selectedStat, newYear);
}

// Start the initialization process
init();

