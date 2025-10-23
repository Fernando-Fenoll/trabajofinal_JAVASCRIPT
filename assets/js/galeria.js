document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar el contenedor de la galería
    const galeriaContenedor = document.getElementById('lightgallery');
    
    if (galeriaContenedor) {
        // 2. Inicializar LightGallery en el contenedor seleccionado
        lightGallery(galeriaContenedor, {
            // Opciones de configuración
            selector: 'a', // Indica que los elementos clicables son las etiquetas <a>
            speed: 500,    // Velocidad de transición en milisegundos
            licenseKey: '0000-0000-000-0000', // Clave dummy; funciona para proyectos no comerciales/demo.
        });
    }
});