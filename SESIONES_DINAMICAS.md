# Sistema de Sesiones Dinámicas - SeniorInteract

## 📋 Descripción

Sistema que adapta la interfaz de usuario según el estado de sesión, proporcionando una experiencia personalizada y fluida entre las páginas públicas y privadas de la aplicación.

## 🔄 Funcionamiento del Botón "Comenzar"

### Estado Sin Sesión
- **Texto**: "Comenzar"
- **Acción**: Redirige a `src/pages/login.html`
- **Propósito**: Invitar al usuario a iniciar sesión

### Estado Con Sesión Activa
- **Texto**: "Ir a Mi Área"
- **Acción**: Redirige a `src/pages/principal.html`
- **Propósito**: Acceso directo al área personal

## 🏗️ Arquitectura del Sistema

### Archivos Modificados

1. **`src/js/auth.js`**
   - Función `actualizarInterfazSegunSesion()`
   - Función `verificarAccesoPagina()`
   - Función `protegerPagina()`
   - Función `redirigirSegunSesion()`

2. **`index.html`**
   - Enlaces dinámicos en header
   - Menú móvil adaptativo
   - Scripts de autenticación integrados

3. **`src/pages/principal.html`**
   - Página protegida con verificación automática
   - Dashboard personalizado por usuario
   - Información de sesión en tiempo real

## 🛡️ Protección de Páginas

### Verificación Automática
```javascript
// En principal.html
async function verificarAutenticacion() {
    if (!window.GestorSesion || !window.GestorSesion.sesionActiva()) {
        window.location.href = 'login.html';
        return;
    }
    // Continuar cargando la página...
}
```

### Flujo de Protección
1. **Carga de página** → Verificar sesión
2. **Sin sesión** → Redirigir a login
3. **Con sesión** → Mostrar contenido protegido
4. **Sesión expirada** → Limpiar y redirigir

## 🎨 Interfaz Adaptativa

### Header Principal (`index.html`)

**Usuario No Logueado:**
```html
<div id="enlaces-auth" class="flex items-center space-x-4">
    <a href="./src/pages/login.html">Iniciar Sesión</a>
    <a href="./src/pages/registro.html">Registrarse</a>
</div>
```

**Usuario Logueado:**
```html
<div id="info-usuario" class="flex items-center space-x-4">
    <span>Bienvenido/a, [Nombre]</span>
    <a href="./src/pages/principal.html">Mi Área</a>
</div>
```

### Menú Móvil Adaptativo

El menú móvil cambia automáticamente mostrando:
- Enlaces de autenticación para usuarios no logueados
- Enlace al área personal para usuarios logueados

## 🔧 Funciones Principales

### `actualizarInterfazSegunSesion()`
```javascript
// Actualiza botones y enlaces según estado de sesión
sistemaAuth.actualizarInterfazSegunSesion()
```

### `verificarAccesoPagina()`
```javascript
// Verifica si el usuario tiene acceso a una página
const tieneAcceso = sistemaAuth.verificarAccesoPagina()
```

### `protegerPagina()`
```javascript
// Protege una página redirigiendo si no hay sesión
sistemaAuth.protegerPagina('login.html')
```

### `redirigirSegunSesion()`
```javascript
// Redirige según el estado de sesión
sistemaAuth.redirigirSegunSesion('./src/pages/principal.html', './src/pages/login.html')
```

## 📱 Página Principal Protegida

### Características
- **Verificación automática** de sesión al cargar
- **Información personalizada** del usuario
- **Menú de usuario** con opciones contextuales
- **Módulos de la aplicación** organizados por categorías
- **Cierre de sesión** con confirmación

### Módulos Disponibles
1. **Comunicación** - Contacto con familiares
2. **Salud** - Registro médico y citas
3. **Entretenimiento** - Juegos y actividades
4. **Aprendizaje** - Tutoriales y cursos
5. **Servicios** - Compras y trámites
6. **Ayuda** - Soporte técnico

### Información del Usuario
- Nombre completo en el header
- Email y rol en menú desplegable
- Iniciales en avatar circular
- Mensaje de bienvenida personalizado

## 🔄 Flujo de Navegación

### Desde Página Pública (index.html)
1. **Sin sesión**: Comenzar → Login → Principal
2. **Con sesión**: Ir a Mi Área → Principal (directo)

### Desde Página de Login
1. **Login exitoso** → Redirigir a Principal
2. **Ya logueado** → Redirigir a Principal automáticamente

### Desde Página Principal
1. **Sesión válida** → Mostrar contenido
2. **Sin sesión** → Redirigir a Login
3. **Cerrar sesión** → Limpiar datos → Redirigir a Login

## 🎯 Experiencia de Usuario

### Ventajas del Sistema
- **Navegación fluida** sin interrupciones
- **Estado persistente** entre recargas
- **Interfaz contextual** según el usuario
- **Protección automática** de contenido privado
- **Mensajes claros** sobre el estado de sesión

### Accesibilidad
- **Botones grandes** (mínimo 48px) para fácil interacción
- **Texto legible** con fuentes grandes (18px base)
- **Alto contraste** en colores
- **Navegación por teclado** completa
- **Mensajes descriptivos** para lectores de pantalla

## 🧪 Casos de Prueba

### Pruebas de Funcionalidad
1. **Botón Comenzar sin sesión** → Debe ir a login
2. **Botón Comenzar con sesión** → Debe ir a principal
3. **Acceso directo a principal sin sesión** → Debe redirigir a login
4. **Acceso a principal con sesión** → Debe mostrar contenido
5. **Cierre de sesión desde principal** → Debe limpiar y redirigir
6. **Recarga de página con sesión** → Debe mantener estado
7. **Sesión expirada** → Debe limpiar y redirigir

### Pruebas de Interfaz
1. **Header cambia según sesión** → Enlaces vs info usuario
2. **Menú móvil adaptativo** → Opciones contextuales
3. **Mensajes de bienvenida** → Personalización correcta
4. **Avatar con iniciales** → Generación automática
5. **Responsive design** → Funciona en todos los dispositivos

## 🔍 Debugging

### Logs Útiles
```javascript
// Verificar estado de sesión
console.log('Sesión activa:', window.GestorSesion.sesionActiva())

// Ver datos de usuario
console.log('Usuario actual:', window.GestorSesion.obtenerUsuarioActual())

// Verificar localStorage
console.log('Datos en localStorage:', localStorage.getItem('senioriteract_sesion'))
```

### Problemas Comunes
1. **Botón no cambia** → Verificar que los scripts estén cargados
2. **Redirección infinita** → Revisar lógica de verificación
3. **Sesión no persiste** → Comprobar localStorage
4. **Interfaz no actualiza** → Verificar event listeners

## 🚀 Próximas Mejoras

- [ ] **Notificaciones push** para sesiones próximas a expirar
- [ ] **Modo offline** con sincronización posterior
- [ ] **Múltiples pestañas** con sincronización de estado
- [ ] **Recordar última página** visitada
- [ ] **Tema personalizable** por usuario
- [ ] **Dashboard configurable** con widgets movibles

## 📞 Soporte Técnico

Para problemas relacionados con sesiones dinámicas:

1. **Verificar configuración** de Supabase
2. **Comprobar localStorage** del navegador
3. **Revisar logs** en consola del navegador
4. **Probar en modo incógnito** para descartar cache
5. **Verificar conectividad** de red
