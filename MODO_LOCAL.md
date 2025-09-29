# Modo Local - SeniorInteract

## 📋 Descripción

El modo local permite probar toda la funcionalidad de autenticación sin necesidad de configurar Supabase. Ideal para desarrollo y pruebas rápidas.

## 🔧 Activación del Modo Local

El modo local está **activado por defecto** en `src/js/config.js`:

```javascript
const configuracionSupabase = {
    url: 'TU_SUPABASE_URL',
    claveAnonima: 'TU_SUPABASE_ANON_KEY',
    modoLocal: true, // ✅ Activado para pruebas
};
```

## 👤 Usuario de Prueba

Se crea automáticamente un usuario de prueba:

- **Email**: `demo@senioriteract.com`
- **Contraseña**: `12345678`
- **Nombre**: María González
- **RUT**: 12345678-5
- **Rol**: Adulto Mayor

## 🚀 Funcionalidades Disponibles

### ✅ Registro de Usuarios
- Validación completa de formularios
- Verificación de RUT chileno
- Almacenamiento en `localStorage`
- Prevención de emails duplicados
- Creación automática de sesión

### ✅ Inicio de Sesión
- Validación de credenciales
- Búsqueda en usuarios locales
- Creación de sesión temporal
- Redirección automática

### ✅ Recuperación de Contraseña
- Validación de email
- Simulación de envío de email
- Verificación de usuario existente

### ✅ Gestión de Sesiones
- Almacenamiento seguro en `localStorage`
- Expiración automática (24 horas)
- Verificación de sesiones activas
- Limpieza automática

### ✅ Protección de Páginas
- Verificación automática de acceso
- Redirección a login si no hay sesión
- Mantenimiento de estado entre páginas

## 🗄️ Almacenamiento Local

### Estructura de Datos

**Usuarios** (`usuarios_locales`):
```json
[
  {
    "id": "local_1640995200000",
    "email": "usuario@ejemplo.com",
    "clave": "contraseña123",
    "user_metadata": {
      "nombre": "Juan",
      "apellido": "Pérez",
      "rut": "12345678-9",
      "rol": "adulto_mayor",
      "fecha_nacimiento": "1960-01-01",
      "telefono": "+56912345678"
    }
  }
]
```

**Sesión** (`senioriteract_sesion`):
```json
{
  "usuario": {
    "id": "local_1640995200000",
    "email": "usuario@ejemplo.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "rut": "12345678-9",
    "rol": "adulto_mayor"
  },
  "sesion": {
    "accessToken": "local_token_1640995200000",
    "refreshToken": "local_refresh_1640995200000",
    "expiresAt": 1640995200000,
    "fechaCreacion": 1640995200000
  }
}
```

## 🧪 Casos de Prueba

### 1. Registro de Usuario Nuevo
```
1. Ir a /src/pages/registro.html
2. Llenar formulario con datos válidos
3. Usar RUT válido (ej: 12345678-5)
4. Enviar formulario
5. ✅ Debe crear cuenta y redirigir a área personal
```

### 2. Inicio de Sesión con Usuario de Prueba
```
1. Ir a /src/pages/login.html
2. Email: demo@senioriteract.com
3. Contraseña: 12345678
4. Enviar formulario
5. ✅ Debe iniciar sesión y redirigir a área personal
```

### 3. Botón Dinámico en Index
```
1. Ir a /index.html sin sesión
2. ✅ Botón debe mostrar "Comenzar"
3. Iniciar sesión
4. Volver a /index.html
5. ✅ Botón debe mostrar "Ir a Mi Área"
```

### 4. Protección de Página Principal
```
1. Ir directamente a /src/pages/principal.html sin sesión
2. ✅ Debe redirigir automáticamente a login
3. Iniciar sesión
4. Ir a /src/pages/principal.html
5. ✅ Debe mostrar el dashboard personalizado
```

### 5. Persistencia de Sesión
```
1. Iniciar sesión
2. Recargar cualquier página
3. ✅ Sesión debe mantenerse activa
4. Esperar 24 horas (o cambiar fecha del sistema)
5. ✅ Sesión debe expirar automáticamente
```

## 🔍 Debugging en Modo Local

### Comandos de Consola Útiles

```javascript
// Ver usuarios registrados
console.log(JSON.parse(localStorage.getItem('usuarios_locales')))

// Ver sesión actual
console.log(JSON.parse(localStorage.getItem('senioriteract_sesion')))

// Verificar estado de sesión
console.log(window.GestorSesion.sesionActiva())

// Ver usuario actual
console.log(window.GestorSesion.obtenerUsuarioActual())

// Limpiar todos los datos locales
localStorage.removeItem('usuarios_locales')
localStorage.removeItem('senioriteract_sesion')
```

### Logs Automáticos

El sistema muestra logs informativos en la consola:
- ✅ "Modo local activado - Supabase deshabilitado temporalmente"
- ✅ "Usuario de prueba creado: demo@senioriteract.com / 12345678"
- ✅ "Modo local: Simulando registro de usuario"
- ✅ "Modo local: Simulando inicio de sesión"
- ✅ "Sesión local válida encontrada: usuario@ejemplo.com"

## 🔄 Cambiar a Modo Supabase

Para activar Supabase cuando tengas las credenciales:

1. **Configurar credenciales** en `src/js/config.js`:
```javascript
const configuracionSupabase = {
    url: 'https://tu-proyecto.supabase.co',
    claveAnonima: 'tu_clave_anonima_real',
    modoLocal: false, // ❌ Desactivar modo local
};
```

2. **Limpiar datos locales** (opcional):
```javascript
localStorage.removeItem('usuarios_locales')
localStorage.removeItem('senioriteract_sesion')
```

3. **Recargar la aplicación** - Ahora usará Supabase

## ⚠️ Limitaciones del Modo Local

- **Sin persistencia real**: Los datos se pierden al limpiar localStorage
- **Sin encriptación**: Las contraseñas se almacenan en texto plano
- **Sin validación de servidor**: Toda la validación es del lado cliente
- **Sin emails reales**: La recuperación de contraseña es simulada
- **Sin sincronización**: No funciona entre diferentes dispositivos/navegadores

## 🎯 Ventajas del Modo Local

- **Desarrollo rápido**: No necesita configuración externa
- **Pruebas offline**: Funciona sin conexión a internet
- **Debugging fácil**: Todos los datos están en localStorage
- **Prototipado**: Ideal para demostrar funcionalidades
- **Aprendizaje**: Perfecto para entender el flujo de autenticación

## 🚀 Próximos Pasos

Una vez que pruebes el modo local y estés satisfecho con la funcionalidad:

1. **Crear proyecto en Supabase**
2. **Configurar base de datos** (SQL incluido en AUTENTICACION.md)
3. **Obtener credenciales** de tu proyecto
4. **Actualizar configuración** y desactivar modo local
5. **Probar con Supabase real**

El modo local te permite experimentar con todas las funcionalidades sin comprometerte con una configuración externa hasta que estés listo.
