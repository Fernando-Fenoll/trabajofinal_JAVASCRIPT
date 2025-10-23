document.addEventListener('DOMContentLoaded', () => {
    
    const latEmpresa = 40.4168; 
    const lonEmpresa = -3.7038;
    
    
    const map = L.map('mapa-ubicacion').setView([latEmpresa, lonEmpresa], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([latEmpresa, lonEmpresa]).addTo(map)
        .bindPopup('Ubicación de nuestra oficina').openPopup();

    
    L.Routing.control({
        
        waypoints: [
            L.latLng(latEmpresa, lonEmpresa) 
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        showAlternatives: false,
        addWaypoints: false 
    }).addTo(map);
    
});