document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([41.41265154966755, 2.1672552909076073], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 20,
    }).addTo(map);

    var btnDiciembre = document.getElementById('btn-diciembre');
    var btnEnero = document.getElementById('btn-enero');

    var urlDiciembre = 'data_diciembre.json';
    var urlEnero = 'data_enero.json';

    var marcadores = [];

    btnDiciembre.addEventListener('click', function() {
        limpiarMarcadores();
        cargarDatos(urlDiciembre);
    });

    btnEnero.addEventListener('click', function() {
        limpiarMarcadores();
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

                        var marcador = L.marker([offsetLat, offsetLng]).addTo(map)
                            .bindPopup(contenidoMarcador);

                        marcador.on('click', function() {
                            map.flyTo(marcador.getLatLng(), 15); // Hace zoom al marcador cuando se hace clic en él
                        });

                        marcadores.push(marcador);
                    }
                });
            });
    }

    function limpiarMarcadores() {
        marcadores.forEach(function(marcador) {
            map.removeLayer(marcador);
        });

        marcadores = [];
    }
});