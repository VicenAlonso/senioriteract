/**
 * Configuración de Supabase para SeniorInteract
 * Archivo de configuración principal para la conexión con Supabase
 */

// Configuración de Supabase
// IMPORTANTE: Estas variables deben ser configuradas con tus credenciales reales
const configuracionSupabase = {
    url: 'TU_SUPABASE_URL', // Reemplazar con tu URL de Supabase
    claveAnonima: 'TU_SUPABASE_ANON_KEY', // Reemplazar con tu clave anónima de Supabase
    modoLocal: true, // Activar modo local para pruebas sin Supabase
};

// Configuración de la aplicación
const configuracionApp = {
    nombre: 'SeniorInteract',
    version: '1.0.0',
    debug: true,
    
    // Configuración de roles
    roles: {
        ADMINISTRADOR: 'administrador',
        MODERADOR: 'moderador',
        ADULTO_MAYOR: 'adulto_mayor'
    },
    
    // Configuración de sesiones
    sesion: {
        claveLocalStorage: 'senioriteract_sesion',
        tiempoExpiracion: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
    },
    
    // Configuración de validación
    validacion: {
        longitudMinimaClave: 8,
        patronEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patronRUT: /^[0-9]+-[0-9kK]{1}$/
    },
    
    // Mensajes de la aplicación
    mensajes: {
        error: {
            emailInvalido: 'Por favor, ingresa un email válido',
            claveCorta: 'La contraseña debe tener al menos 8 caracteres',
            rutInvalido: 'El RUT ingresado no es válido',
            camposRequeridos: 'Todos los campos son obligatorios',
            errorConexion: 'Error de conexión. Inténtalo nuevamente',
            credencialesIncorrectas: 'Email o contraseña incorrectos',
            usuarioNoExiste: 'No existe una cuenta con este email',
            emailYaRegistrado: 'Ya existe una cuenta con este email'
        },
        exito: {
            registroExitoso: 'Cuenta creada exitosamente. Revisa tu email para confirmar',
            loginExitoso: 'Inicio de sesión exitoso',
            logoutExitoso: 'Sesión cerrada correctamente',
            emailRecuperacion: 'Se ha enviado un email con instrucciones para recuperar tu contraseña'
        },
        info: {
            cargando: 'Procesando...',
            redirigiendo: 'Redirigiendo...'
        }
    }
};

// Usuario de prueba para modo local
const usuarioPrueba = {
    id: 'local_demo',
    email: 'demo@senioriteract.com',
    clave: '12345678',
    user_metadata: {
        nombre: 'María',
        apellido: 'González',
        rut: '12345678-5',
        rol: 'adulto_mayor',
        fecha_nacimiento: '1950-05-15',
        telefono: '+56912345678'
    }
};

// Crear usuario de prueba si no existe
if (configuracionSupabase.modoLocal) {
    const usuariosLocales = JSON.parse(localStorage.getItem('usuarios_locales') || '[]');
    const existeDemo = usuariosLocales.find(u => u.email === usuarioPrueba.email);
    
    if (!existeDemo) {
        usuariosLocales.push(usuarioPrueba);
        localStorage.setItem('usuarios_locales', JSON.stringify(usuariosLocales));
        console.log('Usuario de prueba creado: demo@senioriteract.com / 12345678');
    }
}

// Exportar configuraciones para uso global
window.ConfiguracionSupabase = configuracionSupabase;
window.ConfiguracionApp = configuracionApp;
