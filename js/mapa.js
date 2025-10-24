document.addEventListener('DOMContentLoaded', () => {
    
    //coordenadas iniciales
    const latEmpresa = 40.4168; 
    const lonEmpresa = -3.7038;
    const destinoLatLng = L.latLng(latEmpresa, lonEmpresa);

    //mapa
    const map = L.map('mapa-ubicacion').setView([latEmpresa, lonEmpresa], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //ruta con origen y destino 
    const iniciarRouting = (origen) => {
        
        L.Routing.control({
            waypoints: [
                origen,        
                destinoLatLng  
            ],
            routeWhileDragging: false,
            show: true, 
            addWaypoints: false
        }).addTo(map);
        
        L.marker(destinoLatLng).addTo(map)
            .bindPopup("Ubicación de nuestra oficina")
            .openPopup();
    };


    //ubicación usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // ÉXITO: Usuario dio permiso y tenemos coordenadas
                const origenLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
                
                iniciarRouting(origenLatLng);
                map.setView(origenLatLng, 13); // Centra el mapa en el usuario
            },
            (error) => {
                // Si falla o se deniega:
                console.error("Error al obtener la ubicación:", error);
                
              
                L.marker(destinoLatLng).addTo(map).bindPopup("Ubicación de nuestra oficina").openPopup();
                alert("No se pudo detectar tu ubicación. Se muestra solo la ubicación de nuestra oficina.");
            }
        );
    } else {
        // Navegador no soporta geolocalización 
        L.marker(destinoLatLng).addTo(map).bindPopup("Tu navegador no soporta geolocalización.").openPopup();
    }
});