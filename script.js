// Obtén una referencia al elemento del mapa en el HTML
var map = L.map('map').setView([41.3851, 2.1734], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Carga tu archivo JSON con los datos de timelineObjects
fetch('datos_diciembre.json')
    .then(response => response.json())
    .then(data => {
        var markers = L.markerClusterGroup(); // Crea un grupo de clustering de marcadores

        data.timelineObjects.forEach(obj => {
            if (obj.placeVisit) {
                var lat = obj.placeVisit.location.latitudeE7 / 1e7;
                var lng = obj.placeVisit.location.longitudeE7 / 1e7;
                var startTimestamp = obj.placeVisit.duration.startTimestamp;
                var endTimestamp = obj.placeVisit.duration.endTimestamp;

                var startDate = new Date(Date.parse(startTimestamp));
                var endDate = new Date(Date.parse(endTimestamp));

                var contenidoMarcador = '<strong>' + obj.placeVisit.location.name + '</strong><br>' +
                    'Fecha de entrada: ' + startDate.toLocaleString() + '<br>' +
                    'Fecha de salida: ' + endDate.toLocaleString();

                var marker = L.marker([lat, lng]).bindPopup(contenidoMarcador);
                markers.addLayer(marker); // Agrega el marcador al grupo de clustering
            }
        });

        map.addLayer(markers); // Agrega el grupo de clustering al mapa
    });