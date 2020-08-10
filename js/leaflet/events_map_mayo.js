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
function getColorAsalto(d) {
    return d > 20 ? '#800026' :
        d > 15  ? '#BD0026' :
        d > 10  ? '#E31A1C' :
        d > 5  ? '#FC4E2A' :
        d > 2  ? '#FD8D3C' :
        d > 1  ? '#FEB24C' :
            '#FFEDA0';
}

function getColorATM(d) {
    return d > 20 ? '#800026' :
        d > 15  ? '#BD0026' :
        d > 10  ? '#E31A1C' :
        d > 5  ? '#FC4E2A' :
        d > 2  ? '#FD8D3C' :
        d > 1  ? '#FEB24C' :
            '#FFEDA0';
}

function getColorCH(d) {
    return d > 80 ? '#800026' :
        d > 60  ? '#BD0026' :
        d > 40  ? '#E31A1C' :
        d > 20  ? '#FC4E2A' :
        d > 10  ? '#FD8D3C' :
        d > 5  ? '#FEB24C' :
            '#FFEDA0';
}

// Choroplet style function
function styleAsalto(feature) {
    return {
        fillColor: getColorAsalto(feature.properties.entidades_asalto_Incidentes),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleATM(feature) {
    return {
        fillColor: getColorATM(feature.properties.entidades_atm_Incidentes),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleCH(feature) {
    return {
        fillColor: getColorCH(feature.properties.entidades_ch_Incidentes),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Defining icons for .geojson layers
var bankLogo = L.icon({
    iconUrl: 'images/asaltoSucursal.svg',
    iconSize: [30, 30]
}); 

var atmLogo = L.icon({
    iconUrl: 'images/roboATM.svg',
    iconSize: [30, 30]
}); 

var chLogo = L.icon({
    iconUrl: 'images/roboCH.svg',
    iconSize: [30, 30]
}); 

var bank = L.icon({
    iconUrl: 'images/bank.png',
    iconSize: [30, 30]
});

var atmsLogo = L.icon({
    iconUrl: 'images/atm.svg',
    iconSize: [30, 30]
}); 

// Loading geojson files markers wih popUp feature
var asalto = new L.GeoJSON.AJAX(["js/leaflet/geojson/mayo/asaltoSimplificado.geojson"], {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng, {icon: bankLogo});
    }, 
    onEachFeature: popUp
});

var atm = new L.GeoJSON.AJAX(["js/leaflet/geojson/mayo/atmSimplificado.geojson"], {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng, {icon: atmLogo});
    }, 
    onEachFeature: popUp
});

var ch = new L.GeoJSON.AJAX(["js/leaflet/geojson/mayo/chSimplificado.geojson"], {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng, {icon: chLogo});
    }, 
    onEachFeature: popUp
});

var sucursales = new L.GeoJSON.AJAX("js/leaflet/geojson/mayo/sucursalesSimplificado.geojson", {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng, {icon: bank});
    }, 
    onEachFeature: popUp
});

var atms = new L.GeoJSON.AJAX("js/leaflet/geojson/mayo/atmsSimplificado.geojson", {
    pointToLayer: function(geojsonpoint, latlng) {
        return L.marker(latlng, {icon: atmsLogo});
    },
    onEachFeature: popUp
});

heatAsalto = heatAsalto.map(function (p) { return [p[1], p[0]]; });
heatATM = heatATM.map(function (p) { return [p[1], p[0]]; });
heatCH = heatCH.map(function (p) { return [p[1], p[0]]; });

var entidadesAsalto = L.geoJson(entidadesAsalto, {style: styleAsalto,
    onEachFeature: function(feature, layer) {
        layer.on('click', function() {
        //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
        layer.bindPopup('<h2>' + feature.properties.Entidad + '</h2><p>' + "Número de incidentes: " + feature.properties.entidades_asalto_Incidentes + '</p>').openPopup();
    });
}});

var entidadesATM = L.geoJson(entidadesATM, {style: styleATM,
    onEachFeature: function(feature, layer) {
        layer.on('click', function() {
        //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
        layer.bindPopup('<h2>' + feature.properties.Entidad + '</h2><p>' + "Número de incidentes: " + feature.properties.entidades_atm_Incidentes + '</p>').openPopup();
    });
}});

var entidadesCH = L.geoJson(entidadesCH, {style: styleCH,
    onEachFeature: function(feature, layer) {
        layer.on('click', function() {
        //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
        layer.bindPopup('<h2>' + feature.properties.Entidad + '</h2><p>' + "Número de incidentes: " + feature.properties.entidades_ch_Incidentes + '</p>').openPopup();
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

var heatAsalto = L.heatLayer(heatAsalto, { 
    radius: 15, 
    blur: 20, 
    maxZoom: 13,
});

var heatATM = L.heatLayer(heatATM, { 
    radius: 15, 
    blur: 20, 
    maxZoom: 13,
});

var heatCH = L.heatLayer(heatCH, { 
    radius: 15, 
    blur: 20, 
    maxZoom: 13,
});

//baseMap layer
var baseMaps = {
    "Vista de satélite": sat,
    "Incidencia - mapa de calor": light
};

// overlayMaps
var overlayMaps = {
    "<b>Mapa coroplético:</b> Asalto a sucursal" : entidadesAsalto,
    "<b>Mapa coroplético:</b> Asalto a ATM" : entidadesATM,
    "<b>Mapa coroplético:</b> Asalto a cuentahabiente<hr/>" : entidadesCH,
    "<b>Mapa de calor:</b> Asalto a sucursal" : heatAsalto,
    "<b>Mapa de calor:</b> Asalto a ATM" : heatATM,
    "<b>Mapa de calor:</b> Robo a cuentahabiente<hr/>" : heatCH,
    "<b>Padrón:</b> Cajeros" : atms,
    "<b>Padrón:</b> Sucursales<hr/>" : sucursales,
    "<b>Incidente:</b> Asalto a sucursal" : asalto,
    "<b>Incidente:</b> Robo ATM" : atm,
    "<b>Incidente:</b> Robo cuentahabiente" : ch
};

// Calling leaflet map
var mymap = L.map('mapid', {
    center: [22.78, -102.03],
    zoom: 5,
    layers: [light] // mandatory to call baseMap variables for second time
});

// aux var to get Marker Cluster Layer Support,
mcg = L.markerClusterGroup.layerSupport(),
// Add Layer for cluster group
myLayerGroup = L.layerGroup([
    asalto,
    atm,
    ch,
    sucursales
]);

mcg.addTo(mymap);
mcg.checkIn([
    asalto,
    atm,
    ch,
    sucursales,
    atms
]); // <= this is where the magic happens!

// Add marker cluster and layer control to my map
L.control.layers(baseMaps, overlayMaps).addTo(mymap);

//check on this one later mcg.disableClustering(14); 
