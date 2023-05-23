document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([41.3851, 2.1734], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    var btnDiciembre = document.getElementById('btn-diciembre');
    var btnEnero = document.getElementById('btn-enero');

    var urlDiciembre = 'data_diciembre.json';
    var urlEnero = 'data_enero.json';

    var marcadores = []; // Array para almacenar los marcadores

    btnDiciembre.addEventListener('click', function() {
        limpiarMarcadores(); // Limpiar los marcadores antes de cargar nuevos datos
        cargarDatos(urlDiciembre);
    });

    btnEnero.addEventListener('click', function() {
        limpiarMarcadores(); // Limpiar los marcadores antes de cargar nuevos datos
        cargarDatos(urlEnero);
    });

    function cargarDatos(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.timelineObjects.forEach(obj => {
                    if (obj.placeVisit) {
                        var lat = obj.placeVisit.location.latitudeE7 / 1e7;
                        var lng = obj.placeVisit.location.longitudeE7 / 1e7;
                        var startTimestamp = obj.placeVisit.duration.startTimestamp;
                        var endTimestamp = obj.placeVisit.duration.endTimestamp;

                        var startDate = new Date(Date.parse(startTimestamp));
                        var endDate = new Date(Date.parse(endTimestamp));

                        var offsetLat = lat + (Math.random() - 0.5) * 0.003;
                        var offsetLng = lng + (Math.random() - 0.5) * 0.003;

                        var contenidoMarcador = '<strong>' + obj.placeVisit.location.name + '</strong><br>' +
                            'Fecha de entrada: ' + startDate.toLocaleString() + '<br>' +
                            'Fecha de salida: ' + endDate.toLocaleString();

                        var marcador = L.marker([offsetLat, offsetLng]).addTo(map) // Agregar el marcador al mapa
                            .bindPopup(contenidoMarcador);

                        marcadores.push(marcador); // Agregar el marcador al array de marcadores
                    }
                });
            });
    }

    function limpiarMarcadores() {
        marcadores.forEach(function(marcador) {
            map.removeLayer(marcador); // Eliminar cada marcador del mapa
        });

        marcadores = []; // Vaciar el array de marcadores
    }
});