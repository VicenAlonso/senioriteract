/**
 * Sistema de Autenticación para SeniorInteract
 * Manejo completo de autenticación con Supabase
 */

// Importar Supabase (se carga desde CDN en el HTML)
let clienteSupabase = null;

// Inicializar cliente de Supabase
function inicializarSupabase() {
    // Verificar si está en modo local
    if (window.ConfiguracionSupabase.modoLocal) {
        console.log('Modo local activado - Supabase deshabilitado temporalmente');
        clienteSupabase = null; // No inicializar Supabase
        return true;
    }
    
    if (typeof supabase === 'undefined') {
        console.error('Supabase no está cargado. Asegúrate de incluir el script de Supabase.');
        return false;
    }
    
    try {
        clienteSupabase = supabase.createClient(
            window.ConfiguracionSupabase.url,
            window.ConfiguracionSupabase.claveAnonima
        );
        console.log('Cliente Supabase inicializado correctamente');
        return true;
    } catch (error) {
        console.error('Error al inicializar Supabase:', error);
        return false;
    }
}

// Utilidades para validación
const validadores = {
    /**
     * Valida un email
     * @param {string} email - Email a validar
     * @returns {boolean} - True si es válido
     */
    validarEmail: function(email) {
        return window.ConfiguracionApp.validacion.patronEmail.test(email);
    },

    /**
     * Valida una contraseña
     * @param {string} clave - Contraseña a validar
     * @returns {boolean} - True si es válida
     */
    validarClave: function(clave) {
        return clave && clave.length >= window.ConfiguracionApp.validacion.longitudMinimaClave;
    },

    /**
     * Valida un RUT chileno
     * @param {string} rut - RUT a validar (formato: 12345678-9)
     * @returns {boolean} - True si es válido
     */
    validarRUT: function(rut) {
        if (!rut || !window.ConfiguracionApp.validacion.patronRUT.test(rut)) {
            return false;
        }

        const [numero, digitoVerificador] = rut.split('-');
        return this.calcularDigitoVerificadorRUT(numero) === digitoVerificador.toUpperCase();
    },

    /**
     * Calcula el dígito verificador de un RUT
     * @param {string} numero - Número del RUT sin dígito verificador
     * @returns {string} - Dígito verificador calculado
     */
    calcularDigitoVerificadorRUT: function(numero) {
        let suma = 0;
        let multiplicador = 2;

        for (let i = numero.length - 1; i >= 0; i--) {
            suma += parseInt(numero.charAt(i)) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const digitoVerificador = 11 - resto;

        if (digitoVerificador === 11) return '0';
        if (digitoVerificador === 10) return 'K';
        return digitoVerificador.toString();
    },

    /**
     * Formatea un RUT agregando puntos y guión
     * @param {string} rut - RUT sin formato
     * @returns {string} - RUT formateado
     */
    formatearRUT: function(rut) {
        // Remover caracteres no numéricos excepto K
        const rutLimpio = rut.replace(/[^0-9kK]/g, '');
        
        if (rutLimpio.length < 2) return rutLimpio;
        
        const cuerpo = rutLimpio.slice(0, -1);
        const digitoVerificador = rutLimpio.slice(-1);
        
        // Agregar puntos cada 3 dígitos desde la derecha
        const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        
        return `${cuerpoFormateado}-${digitoVerificador}`;
    }
};

// Gestión de sesiones
const gestorSesion = {
    /**
     * Guarda la sesión del usuario en localStorage
     * @param {Object} usuario - Datos del usuario
     * @param {Object} sesion - Datos de la sesión
     */
    guardarSesion: function(usuario, sesion) {
        const datosSesion = {
            usuario: {
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.user_metadata?.nombre || '',
                apellido: usuario.user_metadata?.apellido || '',
                rut: usuario.user_metadata?.rut || '',
                rol: usuario.user_metadata?.rol || window.ConfiguracionApp.roles.ADULTO_MAYOR,
                fechaNacimiento: usuario.user_metadata?.fecha_nacimiento || '',
                telefono: usuario.user_metadata?.telefono || ''
            },
            sesion: {
                accessToken: sesion.access_token,
                refreshToken: sesion.refresh_token,
                expiresAt: sesion.expires_at,
                fechaCreacion: new Date().getTime()
            }
        };

        localStorage.setItem(
            window.ConfiguracionApp.sesion.claveLocalStorage,
            JSON.stringify(datosSesion)
        );

        console.log('Sesión guardada correctamente');
    },

    /**
     * Obtiene la sesión actual del localStorage
     * @returns {Object|null} - Datos de la sesión o null si no existe
     */
    obtenerSesion: function() {
        try {
            const sesionGuardada = localStorage.getItem(
                window.ConfiguracionApp.sesion.claveLocalStorage
            );
            
            if (!sesionGuardada) return null;
            
            const datosSesion = JSON.parse(sesionGuardada);
            
            // Verificar si la sesión ha expirado
            if (this.sesionExpirada(datosSesion)) {
                this.limpiarSesion();
                return null;
            }
            
            return datosSesion;
        } catch (error) {
            console.error('Error al obtener sesión:', error);
            this.limpiarSesion();
            return null;
        }
    },

    /**
     * Verifica si la sesión ha expirado
     * @param {Object} datosSesion - Datos de la sesión
     * @returns {boolean} - True si ha expirado
     */
    sesionExpirada: function(datosSesion) {
        if (!datosSesion.sesion.fechaCreacion) return true;
        
        const tiempoTranscurrido = new Date().getTime() - datosSesion.sesion.fechaCreacion;
        return tiempoTranscurrido > window.ConfiguracionApp.sesion.tiempoExpiracion;
    },

    /**
     * Limpia la sesión del localStorage
     */
    limpiarSesion: function() {
        localStorage.removeItem(window.ConfiguracionApp.sesion.claveLocalStorage);
        console.log('Sesión limpiada');
    },

    /**
     * Verifica si hay una sesión activa
     * @returns {boolean} - True si hay sesión activa
     */
    sesionActiva: function() {
        return this.obtenerSesion() !== null;
    },

    /**
     * Obtiene información básica del usuario actual
     * @returns {Object|null} - Información del usuario o null
     */
    obtenerUsuarioActual: function() {
        const sesion = this.obtenerSesion();
        return sesion ? sesion.usuario : null;
    }
};

// Sistema de autenticación principal
const sistemaAuth = {
    /**
     * Inicializa el sistema de autenticación
     */
    inicializar: function() {
        if (!inicializarSupabase()) {
            this.mostrarError('Error al conectar con el servidor de autenticación');
            return false;
        }
        
        // Verificar sesión existente
        this.verificarSesionExistente();
        return true;
    },

    /**
     * Verifica si existe una sesión activa al cargar la página
     */
    verificarSesionExistente: async function() {
        const sesionLocal = gestorSesion.obtenerSesion();
        
        if (sesionLocal) {
            try {
                // Modo local - solo verificar que la sesión no haya expirado
                if (window.ConfiguracionSupabase.modoLocal) {
                    console.log('Modo local: Verificando sesión local');
                    
                    // La verificación de expiración ya se hace en gestorSesion.obtenerSesion()
                    if (sesionLocal) {
                        console.log('Sesión local válida encontrada:', sesionLocal.usuario.email);
                        // No necesitamos llamar manejarSesionExitosa porque no hay redirección aquí
                    }
                    return;
                }

                // Verificar con Supabase si la sesión sigue siendo válida
                const { data: { user }, error } = await clienteSupabase.auth.getUser(
                    sesionLocal.sesion.accessToken
                );
                
                if (error || !user) {
                    gestorSesion.limpiarSesion();
                    console.log('Sesión inválida, limpiada');
                } else {
                    console.log('Sesión válida encontrada:', user.email);
                    this.manejarSesionExitosa(user, sesionLocal.sesion);
                }
            } catch (error) {
                console.error('Error al verificar sesión:', error);
                gestorSesion.limpiarSesion();
            }
        }
    },

    /**
     * Registra un nuevo usuario
     * @param {Object} datosUsuario - Datos del usuario a registrar
     */
    registrarUsuario: async function(datosUsuario) {
        try {
            this.mostrarCargando(true);

            // Validar datos
            if (!this.validarDatosRegistro(datosUsuario)) {
                return false;
            }

            // Modo local - simular registro
            if (window.ConfiguracionSupabase.modoLocal) {
                console.log('Modo local: Simulando registro de usuario');
                
                // Simular delay de red
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Verificar si el email ya existe en localStorage
                const usuariosLocales = JSON.parse(localStorage.getItem('usuarios_locales') || '[]');
                const emailExiste = usuariosLocales.find(u => u.email === datosUsuario.email);
                
                if (emailExiste) {
                    this.mostrarError(window.ConfiguracionApp.mensajes.error.emailYaRegistrado);
                    return false;
                }
                
                // Crear usuario local
                const nuevoUsuario = {
                    id: 'local_' + Date.now(),
                    email: datosUsuario.email,
                    clave: datosUsuario.clave, // En producción esto estaría hasheado
                    user_metadata: {
                        nombre: datosUsuario.nombre,
                        apellido: datosUsuario.apellido,
                        rut: datosUsuario.rut,
                        rol: datosUsuario.rol || window.ConfiguracionApp.roles.ADULTO_MAYOR,
                        fecha_nacimiento: datosUsuario.fechaNacimiento,
                        telefono: datosUsuario.telefono
                    }
                };
                
                // Guardar usuario en localStorage
                usuariosLocales.push(nuevoUsuario);
                localStorage.setItem('usuarios_locales', JSON.stringify(usuariosLocales));
                
                this.mostrarExito('Cuenta creada exitosamente en modo local');
                
                // Crear sesión automáticamente
                const sesionLocal = {
                    access_token: 'local_token_' + Date.now(),
                    refresh_token: 'local_refresh_' + Date.now(),
                    expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
                };
                
                this.manejarSesionExitosa(nuevoUsuario, sesionLocal);
                return true;
            }

            // Modo Supabase normal
            const { data, error } = await clienteSupabase.auth.signUp({
                email: datosUsuario.email,
                password: datosUsuario.clave,
                options: {
                    data: {
                        nombre: datosUsuario.nombre,
                        apellido: datosUsuario.apellido,
                        rut: datosUsuario.rut,
                        rol: datosUsuario.rol || window.ConfiguracionApp.roles.ADULTO_MAYOR,
                        fecha_nacimiento: datosUsuario.fechaNacimiento,
                        telefono: datosUsuario.telefono
                    }
                }
            });

            if (error) {
                this.manejarErrorAuth(error);
                return false;
            }

            this.mostrarExito(window.ConfiguracionApp.mensajes.exito.registroExitoso);
            
            // Si el registro fue exitoso y no requiere confirmación por email
            if (data.user && data.session) {
                this.manejarSesionExitosa(data.user, data.session);
            }
            
            return true;

        } catch (error) {
            console.error('Error en registro:', error);
            this.mostrarError(window.ConfiguracionApp.mensajes.error.errorConexion);
            return false;
        } finally {
            this.mostrarCargando(false);
        }
    },

    /**
     * Inicia sesión con email y contraseña
     * @param {string} email - Email del usuario
     * @param {string} clave - Contraseña del usuario
     */
    iniciarSesion: async function(email, clave) {
        try {
            this.mostrarCargando(true);

            // Validar datos básicos
            if (!validadores.validarEmail(email)) {
                this.mostrarError(window.ConfiguracionApp.mensajes.error.emailInvalido);
                return false;
            }

            if (!validadores.validarClave(clave)) {
                this.mostrarError(window.ConfiguracionApp.mensajes.error.claveCorta);
                return false;
            }

            // Modo local - simular login
            if (window.ConfiguracionSupabase.modoLocal) {
                console.log('Modo local: Simulando inicio de sesión');
                
                // Simular delay de red
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Buscar usuario en localStorage
                const usuariosLocales = JSON.parse(localStorage.getItem('usuarios_locales') || '[]');
                const usuario = usuariosLocales.find(u => u.email === email && u.clave === clave);
                
                if (!usuario) {
                    this.mostrarError(window.ConfiguracionApp.mensajes.error.credencialesIncorrectas);
                    return false;
                }
                
                // Crear sesión local
                const sesionLocal = {
                    access_token: 'local_token_' + Date.now(),
                    refresh_token: 'local_refresh_' + Date.now(),
                    expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
                };
                
                this.mostrarExito('Inicio de sesión exitoso en modo local');
                this.manejarSesionExitosa(usuario, sesionLocal);
                return true;
            }

            // Modo Supabase normal
            const { data, error } = await clienteSupabase.auth.signInWithPassword({
                email: email,
                password: clave
            });

            if (error) {
                this.manejarErrorAuth(error);
                return false;
            }

            this.mostrarExito(window.ConfiguracionApp.mensajes.exito.loginExitoso);
            this.manejarSesionExitosa(data.user, data.session);
            return true;

        } catch (error) {
            console.error('Error en inicio de sesión:', error);
            this.mostrarError(window.ConfiguracionApp.mensajes.error.errorConexion);
            return false;
        } finally {
            this.mostrarCargando(false);
        }
    },

    /**
     * Recupera la contraseña enviando email
     * @param {string} email - Email del usuario
     */
    recuperarClave: async function(email) {
        try {
            this.mostrarCargando(true);

            if (!validadores.validarEmail(email)) {
                this.mostrarError(window.ConfiguracionApp.mensajes.error.emailInvalido);
                return false;
            }

            // Modo local - simular recuperación
            if (window.ConfiguracionSupabase.modoLocal) {
                console.log('Modo local: Simulando recuperación de contraseña');
                
                // Simular delay de red
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Verificar si el email existe
                const usuariosLocales = JSON.parse(localStorage.getItem('usuarios_locales') || '[]');
                const usuario = usuariosLocales.find(u => u.email === email);
                
                if (!usuario) {
                    this.mostrarError(window.ConfiguracionApp.mensajes.error.usuarioNoExiste);
                    return false;
                }
                
                this.mostrarExito('En modo local: Se simularía el envío de email de recuperación');
                return true;
            }

            // Modo Supabase normal
            const { error } = await clienteSupabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/src/pages/recuperar.html`
            });

            if (error) {
                this.manejarErrorAuth(error);
                return false;
            }

            this.mostrarExito(window.ConfiguracionApp.mensajes.exito.emailRecuperacion);
            return true;

        } catch (error) {
            console.error('Error en recuperación:', error);
            this.mostrarError(window.ConfiguracionApp.mensajes.error.errorConexion);
            return false;
        } finally {
            this.mostrarCargando(false);
        }
    },

    /**
     * Cierra la sesión actual
     */
    cerrarSesion: async function() {
        try {
            // Modo local - solo limpiar localStorage
            if (window.ConfiguracionSupabase.modoLocal) {
                console.log('Modo local: Cerrando sesión local');
                gestorSesion.limpiarSesion();
                this.mostrarExito('Sesión cerrada correctamente en modo local');
                
                // Redirigir a página de login después de un breve delay
                setTimeout(() => {
                    window.location.href = '/src/pages/login.html';
                }, 1500);
                return;
            }

            // Modo Supabase normal
            await clienteSupabase.auth.signOut();
            gestorSesion.limpiarSesion();
            this.mostrarExito(window.ConfiguracionApp.mensajes.exito.logoutExitoso);
            
            // Redirigir a página de login después de un breve delay
            setTimeout(() => {
                window.location.href = '/src/pages/login.html';
            }, 1500);

        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Limpiar sesión local aunque falle la desconexión del servidor
            gestorSesion.limpiarSesion();
            window.location.href = '/src/pages/login.html';
        }
    },

    /**
     * Valida los datos de registro
     * @param {Object} datos - Datos a validar
     * @returns {boolean} - True si son válidos
     */
    validarDatosRegistro: function(datos) {
        if (!datos.email || !datos.clave || !datos.nombre || !datos.apellido || !datos.rut) {
            this.mostrarError(window.ConfiguracionApp.mensajes.error.camposRequeridos);
            return false;
        }

        if (!validadores.validarEmail(datos.email)) {
            this.mostrarError(window.ConfiguracionApp.mensajes.error.emailInvalido);
            return false;
        }

        if (!validadores.validarClave(datos.clave)) {
            this.mostrarError(window.ConfiguracionApp.mensajes.error.claveCorta);
            return false;
        }

        if (!validadores.validarRUT(datos.rut)) {
            this.mostrarError(window.ConfiguracionApp.mensajes.error.rutInvalido);
            return false;
        }

        return true;
    },

    /**
     * Maneja una sesión exitosa
     * @param {Object} usuario - Datos del usuario
     * @param {Object} sesion - Datos de la sesión
     */
    manejarSesionExitosa: function(usuario, sesion) {
        gestorSesion.guardarSesion(usuario, sesion);
        
        // Redirigir según el rol del usuario
        const rolUsuario = usuario.user_metadata?.rol || window.ConfiguracionApp.roles.ADULTO_MAYOR;
        this.redirigirSegunRol(rolUsuario);
    },

    /**
     * Redirige al usuario según su rol
     * @param {string} rol - Rol del usuario
     */
    redirigirSegunRol: function(rol) {
        let urlDestino = '/index.html'; // Por defecto

        switch (rol) {
            case window.ConfiguracionApp.roles.ADMINISTRADOR:
                urlDestino = '/admin/dashboard.html';
                break;
            case window.ConfiguracionApp.roles.MODERADOR:
                urlDestino = '/moderador/dashboard.html';
                break;
            case window.ConfiguracionApp.roles.ADULTO_MAYOR:
                urlDestino = '/index.html';
                break;
        }

        setTimeout(() => {
            window.location.href = urlDestino;
        }, 1500);
    },

    /**
     * Maneja errores de autenticación
     * @param {Object} error - Error de Supabase
     */
    manejarErrorAuth: function(error) {
        let mensajeError = window.ConfiguracionApp.mensajes.error.errorConexion;

        switch (error.message) {
            case 'Invalid login credentials':
                mensajeError = window.ConfiguracionApp.mensajes.error.credencialesIncorrectas;
                break;
            case 'User not found':
                mensajeError = window.ConfiguracionApp.mensajes.error.usuarioNoExiste;
                break;
            case 'User already registered':
                mensajeError = window.ConfiguracionApp.mensajes.error.emailYaRegistrado;
                break;
        }

        this.mostrarError(mensajeError);
        console.error('Error de autenticación:', error);
    },

    /**
     * Muestra un mensaje de error
     * @param {string} mensaje - Mensaje a mostrar
     */
    mostrarError: function(mensaje) {
        this.mostrarMensaje(mensaje, 'error');
    },

    /**
     * Muestra un mensaje de éxito
     * @param {string} mensaje - Mensaje a mostrar
     */
    mostrarExito: function(mensaje) {
        this.mostrarMensaje(mensaje, 'exito');
    },

    /**
     * Muestra un mensaje en la interfaz
     * @param {string} mensaje - Mensaje a mostrar
     * @param {string} tipo - Tipo de mensaje (error, exito, info)
     */
    mostrarMensaje: function(mensaje, tipo = 'info') {
        // Buscar contenedor de mensajes
        let contenedorMensajes = document.getElementById('contenedor-mensajes');
        
        if (!contenedorMensajes) {
            // Crear contenedor si no existe
            contenedorMensajes = document.createElement('div');
            contenedorMensajes.id = 'contenedor-mensajes';
            contenedorMensajes.className = 'fixed top-4 right-4 z-50';
            document.body.appendChild(contenedorMensajes);
        }

        // Crear elemento de mensaje
        const elementoMensaje = document.createElement('div');
        elementoMensaje.className = `mensaje-${tipo} p-4 mb-2 rounded-lg shadow-lg max-w-sm transition-all duration-300`;
        
        // Estilos según el tipo
        switch (tipo) {
            case 'error':
                elementoMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
                break;
            case 'exito':
                elementoMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
                break;
            default:
                elementoMensaje.classList.add('bg-blue-100', 'border-blue-400', 'text-blue-700');
        }

        elementoMensaje.innerHTML = `
            <div class="flex items-center">
                <span class="flex-1">${mensaje}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-lg font-bold">&times;</button>
            </div>
        `;

        contenedorMensajes.appendChild(elementoMensaje);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (elementoMensaje.parentNode) {
                elementoMensaje.remove();
            }
        }, 5000);
    },

    /**
     * Muestra/oculta indicador de carga
     * @param {boolean} mostrar - True para mostrar, false para ocultar
     */
    mostrarCargando: function(mostrar) {
        const botones = document.querySelectorAll('button[type="submit"]');
        
        botones.forEach(boton => {
            if (mostrar) {
                boton.disabled = true;
                boton.textContent = window.ConfiguracionApp.mensajes.info.cargando;
                boton.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                boton.disabled = false;
                boton.classList.remove('opacity-50', 'cursor-not-allowed');
                // Restaurar texto original (se debe manejar en cada página)
            }
        });
    },

    /**
     * Verifica si el usuario tiene acceso a una página protegida
     * @param {string} paginaRequerida - Nombre de la página (opcional)
     * @returns {boolean} - True si tiene acceso
     */
    verificarAccesoPagina: function(paginaRequerida = null) {
        const sesionActiva = gestorSesion.sesionActiva();
        
        if (!sesionActiva) {
            console.log('Acceso denegado: No hay sesión activa');
            return false;
        }

        const usuario = gestorSesion.obtenerUsuarioActual();
        if (!usuario) {
            console.log('Acceso denegado: No se pudo obtener información del usuario');
            return false;
        }

        console.log(`Acceso permitido para usuario: ${usuario.email} (${usuario.rol})`);
        return true;
    },

    /**
     * Redirige al usuario según su estado de sesión
     * @param {string} paginaProtegida - URL de la página protegida
     * @param {string} paginaLogin - URL de la página de login
     */
    redirigirSegunSesion: function(paginaProtegida = './src/pages/principal.html', paginaLogin = './src/pages/login.html') {
        if (gestorSesion.sesionActiva()) {
            window.location.href = paginaProtegida;
        } else {
            window.location.href = paginaLogin;
        }
    },

    /**
     * Protege una página verificando la sesión y redirigiendo si es necesario
     * @param {string} paginaLogin - URL de la página de login para redirección
     */
    protegerPagina: function(paginaLogin = 'login.html') {
        if (!this.verificarAccesoPagina()) {
            console.log('Redirigiendo a página de login...');
            setTimeout(() => {
                window.location.href = paginaLogin;
            }, 100);
            return false;
        }
        return true;
    },

    /**
     * Actualiza la interfaz según el estado de sesión del usuario
     */
    actualizarInterfazSegunSesion: function() {
        const sesionActiva = gestorSesion.sesionActiva();
        const usuario = gestorSesion.obtenerUsuarioActual();

        // Buscar elementos que cambien según el estado de sesión
        const botonComenzar = document.getElementById('boton-comenzar');
        const botonAprender = document.getElementById('boton-aprender');

        if (botonComenzar) {
            if (sesionActiva && usuario) {
                botonComenzar.textContent = 'Ir a Mi Área';
                botonComenzar.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = './src/pages/principal.html';
                };
            } else {
                botonComenzar.textContent = 'Comenzar';
                botonComenzar.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = './src/pages/login.html';
                };
            }
        }

        // Actualizar botón "Aprender Más" si existe
        if (botonAprender && sesionActiva && usuario) {
            botonAprender.textContent = 'Ver Tutoriales';
            botonAprender.onclick = (e) => {
                e.preventDefault();
                this.mostrarMensaje('Los tutoriales estarán disponibles próximamente en tu área personal.', 'info');
            };
        }

        console.log(`Interfaz actualizada. Sesión activa: ${sesionActiva}`);
    }
};

// Exportar para uso global
window.SistemaAuth = sistemaAuth;
window.GestorSesion = gestorSesion;
window.Validadores = validadores;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    sistemaAuth.inicializar();
    
    // Actualizar interfaz después de un breve delay para asegurar que todo esté cargado
    setTimeout(() => {
        sistemaAuth.actualizarInterfazSegunSesion();
    }, 100);
});
