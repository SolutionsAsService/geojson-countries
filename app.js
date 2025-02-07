// Initialize the map
var map = L.map('map').setView([20, 0], 2);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Fetch and display GeoJSON data
fetch('path/to/geo-countries.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(map);
    });

// Function to handle each feature (country)
function onEachFeature(feature, layer) {
    layer.on({
        click: onCountryClick
    });
}

// Function to handle country click
function onCountryClick(e) {
    var countryName = e.target.feature.properties.name;
    fetchCountryData(countryName);
}

// Function to fetch and display country data
function fetchCountryData(countryName) {
    fetch(`https://raw.githubusercontent.com/SolutionsAsService/CountryData/main/${countryName}.json`)
        .then(response => response.json())
        .then(data => {
            displayCountryData(data);
        });
}

// Function to display country data
function displayCountryData(data) {
    var info = L.control();

    info.onAdd = function () {
        var div = L.DomUtil.create('div', 'info');
        div.innerHTML = `<h4>${data.name}</h4><p>Population: ${data.population}</p><p>Area: ${data.area} sq km</p>`;
        return div;
    };

    info.addTo(map);
}
