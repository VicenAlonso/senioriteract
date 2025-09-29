/**
 * SeniorInteract - Aplicación JavaScript para Personas Mayores
 * Archivo principal de funcionalidades interactivas
 */

// Configuración global de la aplicación
const configuracionApp = {
    version: '1.0.0',
    nombre: 'SeniorInteract',
    debug: true
};

// Utilidades generales
const utilidades = {
    /**
     * Registra mensajes en la consola si el modo debug está activado
     * @param {string} mensaje - Mensaje a registrar
     * @param {string} tipo - Tipo de mensaje (log, warn, error)
     */
    registrarMensaje: function(mensaje, tipo = 'log') {
        if (configuracionApp.debug) {
            console[tipo](`[${configuracionApp.nombre}] ${mensaje}`);
        }
    },

    /**
     * Muestra una notificación al usuario
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - Tipo de notificación (exito, error, info)
     */
    mostrarNotificacion: function(mensaje, tipo = 'info') {
        // Por ahora usamos alert, pero se puede mejorar con una librería de notificaciones
        alert(mensaje);
        this.registrarMensaje(`Notificación mostrada: ${mensaje}`, 'info');
    },

    /**
     * Valida si un elemento existe en el DOM
     * @param {string} selector - Selector CSS del elemento
     * @returns {Element|null} - Elemento encontrado o null
     */
    obtenerElemento: function(selector) {
        const elemento = document.querySelector(selector);
        if (!elemento) {
            this.registrarMensaje(`Elemento no encontrado: ${selector}`, 'warn');
        }
        return elemento;
    }
};

// Gestión del menú móvil
const menuMovil = {
    boton: null,
    menu: null,
    estaAbierto: false,

    /**
     * Inicializa el menú móvil
     */
    inicializar: function() {
        this.boton = utilidades.obtenerElemento('#boton-menu-movil');
        this.menu = utilidades.obtenerElemento('#menu-movil');

        if (this.boton && this.menu) {
            this.boton.addEventListener('click', () => this.alternar());
            utilidades.registrarMensaje('Menú móvil inicializado correctamente');
        }
    },

    /**
     * Alterna la visibilidad del menú móvil
     */
    alternar: function() {
        if (this.estaAbierto) {
            this.cerrar();
        } else {
            this.abrir();
        }
    },

    /**
     * Abre el menú móvil
     */
    abrir: function() {
        if (this.menu) {
            this.menu.classList.remove('hidden');
            this.estaAbierto = true;
            utilidades.registrarMensaje('Menú móvil abierto');
        }
    },

    /**
     * Cierra el menú móvil
     */
    cerrar: function() {
        if (this.menu) {
            this.menu.classList.add('hidden');
            this.estaAbierto = false;
            utilidades.registrarMensaje('Menú móvil cerrado');
        }
    }
};

// Gestión de botones principales
const botonesAccion = {
    /**
     * Inicializa los event listeners de los botones principales
     */
    inicializar: function() {
        // Botón "Comenzar"
        const botonComenzar = utilidades.obtenerElemento('#boton-comenzar');
        if (botonComenzar) {
            botonComenzar.addEventListener('click', this.manejarComenzar);
        }

        // Botón "Aprender Más"
        const botonAprender = utilidades.obtenerElemento('#boton-aprender');
        if (botonAprender) {
            botonAprender.addEventListener('click', this.manejarAprender);
        }

        // Botón "Contactar Soporte"
        const botonContacto = utilidades.obtenerElemento('#boton-contacto');
        if (botonContacto) {
            botonContacto.addEventListener('click', this.manejarContacto);
        }

        utilidades.registrarMensaje('Botones de acción inicializados correctamente');
    },

    /**
     * Maneja el clic en el botón "Comenzar"
     */
    manejarComenzar: function() {
        utilidades.mostrarNotificacion(
            '¡Bienvenido! Esta funcionalidad se desarrollará próximamente.',
            'info'
        );
        utilidades.registrarMensaje('Usuario hizo clic en "Comenzar"');
    },

    /**
     * Maneja el clic en el botón "Aprender Más"
     */
    manejarAprender: function() {
        // Desplazamiento suave a la sección de características
        const seccionCaracteristicas = utilidades.obtenerElemento('#caracteristicas');
        if (seccionCaracteristicas) {
            seccionCaracteristicas.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            utilidades.registrarMensaje('Desplazamiento a sección de características');
        }
    },

    /**
     * Maneja el clic en el botón "Contactar Soporte"
     */
    manejarContacto: function() {
        utilidades.mostrarNotificacion(
            'Para contactar soporte, envía un email a: soporte@senioriteract.com',
            'info'
        );
        utilidades.registrarMensaje('Usuario solicitó información de contacto');
    }
};

// Gestión de navegación suave
const navegacion = {
    /**
     * Inicializa la navegación suave para los enlaces internos
     */
    inicializar: function() {
        const enlacesNavegacion = document.querySelectorAll('a[href^="#"]');
        
        enlacesNavegacion.forEach(enlace => {
            enlace.addEventListener('click', this.manejarClicEnlace);
        });

        utilidades.registrarMensaje(`Navegación suave inicializada para ${enlacesNavegacion.length} enlaces`);
    },

    /**
     * Maneja el clic en enlaces de navegación interna
     * @param {Event} evento - Evento de clic
     */
    manejarClicEnlace: function(evento) {
        evento.preventDefault();
        
        const href = evento.currentTarget.getAttribute('href');
        const elementoDestino = document.querySelector(href);
        
        if (elementoDestino) {
            elementoDestino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Cerrar menú móvil si está abierto
            menuMovil.cerrar();
            
            utilidades.registrarMensaje(`Navegación a: ${href}`);
        }
    }
};

// Gestión de accesibilidad
const accesibilidad = {
    /**
     * Inicializa mejoras de accesibilidad
     */
    inicializar: function() {
        this.configurarTecladoNavegacion();
        this.configurarAnunciosLectorPantalla();
        utilidades.registrarMensaje('Mejoras de accesibilidad inicializadas');
    },

    /**
     * Configura la navegación por teclado
     */
    configurarTecladoNavegacion: function() {
        document.addEventListener('keydown', (evento) => {
            // Escape para cerrar menú móvil
            if (evento.key === 'Escape' && menuMovil.estaAbierto) {
                menuMovil.cerrar();
            }
        });
    },

    /**
     * Configura anuncios para lectores de pantalla
     */
    configurarAnunciosLectorPantalla: function() {
        // Crear región de anuncios ARIA
        const regionAnuncios = document.createElement('div');
        regionAnuncios.setAttribute('aria-live', 'polite');
        regionAnuncios.setAttribute('aria-atomic', 'true');
        regionAnuncios.className = 'sr-only';
        regionAnuncios.id = 'region-anuncios';
        document.body.appendChild(regionAnuncios);
    },

    /**
     * Anuncia un mensaje a los lectores de pantalla
     * @param {string} mensaje - Mensaje a anunciar
     */
    anunciar: function(mensaje) {
        const regionAnuncios = document.getElementById('region-anuncios');
        if (regionAnuncios) {
            regionAnuncios.textContent = mensaje;
            setTimeout(() => {
                regionAnuncios.textContent = '';
            }, 1000);
        }
    }
};

// Inicialización de la aplicación
const aplicacion = {
    /**
     * Inicializa toda la aplicación cuando el DOM está listo
     */
    inicializar: function() {
        utilidades.registrarMensaje('Iniciando aplicación SeniorInteract...');
        
        // Inicializar todos los módulos
        menuMovil.inicializar();
        botonesAccion.inicializar();
        navegacion.inicializar();
        accesibilidad.inicializar();
        
        utilidades.registrarMensaje('Aplicación inicializada correctamente');
        accesibilidad.anunciar('Aplicación SeniorInteract cargada y lista para usar');
    }
};

// Event listener para inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    aplicacion.inicializar();
});

// Exportar funciones para uso global (opcional)
window.SeniorInteract = {
    utilidades,
    menuMovil,
    botonesAccion,
    navegacion,
    accesibilidad,
    configuracionApp
};
