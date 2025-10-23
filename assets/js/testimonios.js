document.addEventListener('DOMContentLoaded', () => {
/*ANIMACIÓN*/
const track = document.querySelector('.slider-track');
const testimonios = document.querySelectorAll('.testimonio');
let indiceActual = 0;


function moverSlider() {

    indiceActual = (indiceActual + 1) % testimonios.length;
    const desplazamiento = -indiceActual * 50;
    
    track.style.transform = `translateX(${desplazamiento}%)`;
}

setInterval(moverSlider, 7500);

/*FUNCIÓN AJAX-JSON*/

    const urlNoticias = './assets/data/noticias.json'; 
    const contenedorNoticias = document.getElementById('lista-noticias');

    function cargarNoticiasXHR() {
        const xhr = new XMLHttpRequest();

        
        xhr.onreadystatechange = function() { 
            if (xhr.readyState === 4 && xhr.status === 200) {
                const respuestaTexto = xhr.responseText;
                const noticias = JSON.parse(respuestaTexto);
                let htmlNoticias = '';
                
                noticias.forEach(noticia => {
                    htmlNoticias += `
                        
                            <article class="targeta">
                                <h3>${noticia.titulo}</h3>
                                <p class="fecha">${noticia.fecha}</p>
                                <p>${noticia.contenido}</p>
                            </article>
                    `;
                });
                
                contenedorNoticias.innerHTML = htmlNoticias;
            }
        };

        xhr.open('GET', urlNoticias, true); 
        xhr.send();
    }

    cargarNoticiasXHR(); 
});

//FORMULARIO

document.addEventListener('DOMContentLoaded', () => {
    
    const formulario = document.querySelector('.formulario'); 
    if (!formulario) {
        return; 
    }});
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        
        validarFormulario();
    });
