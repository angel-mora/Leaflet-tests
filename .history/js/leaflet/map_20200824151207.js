// Pop-up function for ajax geojson markers query   
function popUp(f, l) {
    var out = [];
    if (f.properties) {
        for (key in f.properties) {
            out.push("<strong>" + key + ": " + "</strong>" + f.properties[key]);
        } //here we can modify the pop-up appearence
        l.bindPopup(out.join("<br />"));
    }
}
// Choroplet layer chunk
function getColor1(d) {
    return d > 25 ? '#800026' :
        d > 20  ? '#BD0026' :
        d > 10  ? '#E31A1C' :
        d > 5  ? '#FC4E2A' :
        d > 2  ? '#FD8D3C' :
        d > 1  ? '#FEB24C' :
            '#FFEDA0';
}

function getColor2(d) {
    return d > 25 ? '#800026' :
        d > 20  ? '#BD0026' :
        d > 10  ? '#E31A1C' :
        d > 5  ? '#FC4E2A' :
        d > 2  ? '#FD8D3C' :
        d > 1  ? '#FEB24C' :
            '#FFEDA0';
}

function getColor3(d) {
    return d > 100 ? '#800026' :
        d > 80  ? '#BD0026' :
        d > 60  ? '#E31A1C' :
        d > 40  ? '#FC4E2A' :
        d > 25  ? '#FD8D3C' :
        d > 5  ? '#FEB24C' :
            '#FFEDA0';
}

// Choroplet style function
function style1(feature) {
    return {
        fillColor: getColor1(feature.properties.julio_conteo_1),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function style2(feature) {
    return {
        fillColor: getColor2(feature.properties.julio_conteo_2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function style3(feature) {
    return {
        fillColor: getColor3(feature.properties.julio_conteo_3),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Loading geojson files markers wih popUp feature
var group1 = new L.GeoJSON.AJAX(["js/leaflet/geojson/file1.json"], {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng);
    }, 
    onEachFeature: popUp
});

var group2 = new L.GeoJSON.AJAX(["js/leaflet/geojson/file2.json"], {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng);
    }, 
    onEachFeature: popUp
});

var group3 = new L.GeoJSON.AJAX(["js/leaflet/geojson/file3.json"], {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng);
    }, 
    onEachFeature: popUp
});

var groups = new L.GeoJSON.AJAX("js/leaflet/geojson/groups.json", {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng);
    },
    onEachFeature: popUp
});

heat1 = heat1.map(function (p) { return [p[1], p[0]]; });
heat2 = heat2.map(function (p) { return [p[1], p[0]]; });
heat3 = heat3.map(function (p) { return [p[1], p[0]]; });

var entidades1 = L.geoJson(entidadesConteo, {style: style1,
    onEachFeature: function(feature, layer) {
        layer.on('click', function() {
        //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
        layer.bindPopup('<h2>' + feature.properties.admin_name + '</h2><p>' + "Value: " + feature.properties.julio_conteo_ASALTO + '</p>').openPopup();
    });
}});

var entidades2 = L.geoJson(entidadesConteo, {style: style2,
    onEachFeature: function(feature, layer) {
        layer.on('click', function() {
        //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
        layer.bindPopup('<h2>' + feature.properties.admin_name + '</h2><p>' + "Value: " + feature.properties.julio_conteo_ATM + '</p>').openPopup();
    });
}});

var entidades3 = L.geoJson(entidadesConteo, {style: style3,
    onEachFeature: function(feature, layer) {
        layer.on('click', function() {
        //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
        layer.bindPopup('<h2>' + feature.properties.admin_name + '</h2><p>' + "Value: " + feature.properties.julio_conteo_CH + '</p>').openPopup();
    });
}});

// Loading polygons for choroplet
//var entidadesAsalto = L.geoJson(entidadesAsalto);

// Adding map layers as variables for baseMaps in layer control
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5nZWxtb21hIiwiYSI6ImNrNGJ2YmJibDBobzMzbXM1Z2Rpa3M5MGcifQ.F_de8Hnz18gjwJsWa-efZw';

var sat = L.tileLayer(mbUrl, { id: 'mapbox/satellite-streets-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
    light = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

// heatmap layers

var heat1 = L.heatLayer(heat1, { 
    radius: 15, 
    blur: 17, 
    maxZoom: 10,
    gradient: {0.4: 'red', 0.65: 'orange', 1: 'yellow'}
});

var heat2 = L.heatLayer(heat2, { 
    radius: 15, 
    blur: 17, 
    maxZoom: 10,
    gradient: {0.4: 'red', 0.65: 'orange', 1: 'yellow'}
});

var heat3 = L.heatLayer(heat3, { 
    radius: 15, 
    blur: 17, 
    maxZoom: 10,
    gradient: {0.4: 'red', 0.65: 'orange', 1: 'yellow'}
});

//baseMap layer
var baseMaps = {
    "Vista de satélite": sat,
    "Vista simplificada": light
};

// overlayMaps
var overlayMaps = {
    "<b>Mapa coroplético:</b> example 1" : entidades1,
    "<b>Mapa coroplético:</b> example 2" : entidades2,
    "<b>Mapa coroplético:</b> example 3<hr/>" : entidades3,
    "<b>Mapa de calor:</b> example 1" : heat1,
    "<b>Mapa de calor:</b> example 2" : heat2,
    "<b>Mapa de calor:</b> example 3<hr/>" : heat3,
    "<b>example</b><hr/>" : groups,
    "<b>Marker Cluster Layer Group:</b> example 1" : group1,
    "<b>Marker Cluster Layer Group:</b> example 2" : group2,
    "<b>Marker Cluster Layer Group:</b> example 3" : group3
};

// Calling leaflet map
var mymap = L.map('mapid', {
    center: [22.78, -102.03],
    zoom: 5,
    layers: [light] // mandatory to call baseMap variables for second time
}); // , mcg = L.markerClusterGroup().disableClustering()

// aux var to get Marker Cluster Layer Support,
mcg = L.markerClusterGroup.layerSupport(),
// Add Layer for cluster group
myLayerGroup = L.layerGroup([
    group1,
    group2,
    group3,
    groups,
]);

mcg.addTo(mymap);
mcg.checkIn([
    group1,
    group2,
    group3,
    groups,
]); // <= this is where the magic happens!

// Add marker cluster and layer control to my map
L.control.layers(baseMaps, overlayMaps).addTo(mymap);

//check on the next method later: mcg.disableClustering(14); 
