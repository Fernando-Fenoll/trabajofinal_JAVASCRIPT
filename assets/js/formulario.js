document.addEventListener('DOMContentLoaded', () => {
    
    const formulario = document.querySelector('.formulario');
    if (!formulario) return;


    // 1. SELECTORES NECESARIOS
   

    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const condicionesCheckbox = document.getElementById('condiciones');
    
  
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const extrasCheckboxes = document.querySelectorAll('input[name="extras"]:checked');
    const presupuestoFinalOutput = document.getElementById('presupuesto-final'); 
 
    const PRECIO_BASE_DEFAULT = 0;
    
 
    // 2. EXPRESIONES REGULARES PARA VALIDACIÓN
 
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/; 
    const regexTelefono = /^\d{9}$/;               
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
    // 3. LÓGICA DEL PRESUPUESTO DINÁMICO
    

    function obtenerPrecioProducto() {
        const opcionSeleccionada = productoSelect.options[productoSelect.selectedIndex];
        return parseFloat(opcionSeleccionada.getAttribute('data-precio')) || PRECIO_BASE_DEFAULT;
    }

    function obtenerCosteExtras() {
        let costeTotal = 0;
        const extras = document.querySelectorAll('input[name="extras"]:checked'); 
        
        extras.forEach(checkbox => {
            costeTotal += parseFloat(checkbox.getAttribute('data-coste')) || 0;
        });
        return costeTotal;
    }

    function calcularDescuento(total) {
        const meses = parseInt(plazoInput.value) || 0;
        let descuento = 0;

        if (meses > 0 && meses <= 5) {
            descuento = 0.05; 
        } else if (meses > 5) {
            descuento = 0.10; 
        }
        
        return total * descuento;
    }

    function actualizarPresupuesto() {
      
        const precioProducto = obtenerPrecioProducto();
        const costeExtras = obtenerCosteExtras();
        let subtotal = precioProducto + costeExtras;

        const descuento = calcularDescuento(subtotal);
        const total = subtotal - descuento;
        
        presupuestoFinalOutput.textContent = `${total.toFixed(2)} €`;
    }

    // 4. ESCUCHADORES ACTUALIZACION EN TIEMPO REAL

    if (productoSelect) productoSelect.addEventListener('change', actualizarPresupuesto);
    if (plazoInput) plazoInput.addEventListener('input', actualizarPresupuesto); 
    
    document.querySelectorAll('input[name="extras"]').forEach(checkbox => {
        checkbox.addEventListener('change', actualizarPresupuesto);
    });

    actualizarPresupuesto(); 
    
    // 5. VALIDACIÓN FINAL EN EL ENVÍO PARA EL SUBMIT

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); 

        if (validarFormularioCompleto()) {
            alert(`✅ Presupuesto: ${presupuestoFinalOutput.textContent}\n\n¡Solicitud enviada! Nos pondremos en contacto pronto.`);
            formulario.reset();
            actualizarPresupuesto(); 
        }
    });
    
    // 6. CUANTA GUERRA ME HA DADO EL **** FORMULARIO

    function validarFormularioCompleto() {
        
    
        if (!regexLetras.test(nombreInput.value) || nombreInput.value.length === 0 || nombreInput.value.length > 15) {
            alert('Nombre: Solo letras (máx. 15 caracteres).');
            nombreInput.focus();
            return false;
        }

        if (!regexLetras.test(apellidosInput.value) || apellidosInput.value.length === 0 || apellidosInput.value.length > 40) {
            alert('Apellidos: Solo letras (máx. 40 caracteres).');
            apellidosInput.focus();
            return false;
        }
        
        if (!regexTelefono.test(telefonoInput.value)) {
            alert('Teléfono: Solo 9 dígitos numéricos.');
            telefonoInput.focus();
            return false;
        }

        if (!regexEmail.test(emailInput.value)) {
            alert('Correo Electrónico: Formato inválido.');
            emailInput.focus();
            return false;
        }
        
        if (!condicionesCheckbox.checked) {
            alert('Debes aceptar las condiciones de privacidad para enviar el formulario.');
            condicionesCheckbox.focus();
            return false;
        }
        
        if (obtenerPrecioProducto() === PRECIO_BASE_DEFAULT) {
             alert('Por favor, selecciona un producto.');
             productoSelect.focus();
             return false;
        }

        return true; 
    }
    
    // Reset
    const resetButton = document.getElementById('reset-form');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            formulario.reset();
            setTimeout(actualizarPresupuesto, 50); 
        });
    }

});