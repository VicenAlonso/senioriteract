# Sistema de Autenticación - SeniorInteract

## 📋 Descripción

Sistema completo de autenticación desarrollado en JavaScript puro usando Supabase como backend. Diseñado específicamente para personas mayores con interfaces accesibles y validaciones robustas.

## 🏗️ Estructura de Archivos

```
src/
├── js/
│   ├── config.js          # Configuración de Supabase y aplicación
│   └── auth.js            # Lógica principal de autenticación
├── css/
│   └── auth.css           # Estilos específicos para autenticación
└── pages/
    ├── login.html         # Página de inicio de sesión
    ├── registro.html      # Página de registro de usuarios
    └── recuperar.html     # Página de recuperación de contraseña
```

## 🚀 Características Principales

### ✅ Funcionalidades Implementadas

- **Registro de usuarios** con validación completa
- **Inicio de sesión** con email y contraseña
- **Recuperación de contraseña** por email
- **Validación de RUT chileno** con algoritmo verificador
- **Sistema de roles** (Administrador, Moderador, Adulto Mayor)
- **Manejo seguro de sesiones** en localStorage
- **Interfaz accesible** para personas mayores
- **Validación en tiempo real** de formularios
- **Indicador de fortaleza** de contraseñas
- **Responsive design** para todos los dispositivos

### 🔐 Roles de Usuario

1. **Adulto Mayor** - Usuario principal de la plataforma
2. **Moderador** - Cuidador o familiar con permisos adicionales
3. **Administrador** - Control total del sistema

### 🛡️ Seguridad

- Contraseñas con mínimo 8 caracteres
- Validación de email en formato correcto
- Validación de RUT chileno con dígito verificador
- Sesiones con tiempo de expiración (24 horas)
- Tokens seguros para recuperación de contraseña
- Sanitización de datos de entrada

## ⚙️ Configuración

### 1. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Copia el archivo `.env.example` como `.env`
3. Completa las credenciales en `src/js/config.js`:

```javascript
const configuracionSupabase = {
    url: 'https://tu-proyecto.supabase.co',
    claveAnonima: 'tu_clave_anonima_aqui',
};
```

### 2. Configurar Base de Datos

Ejecuta este SQL en tu proyecto Supabase para crear las tablas necesarias:

```sql
-- Habilitar Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Crear tabla de perfiles de usuario
CREATE TABLE public.perfiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    rut TEXT UNIQUE NOT NULL,
    rol TEXT NOT NULL DEFAULT 'adulto_mayor',
    fecha_nacimiento DATE,
    telefono TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Crear políticas RLS
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON public.perfiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON public.perfiles
    FOR UPDATE USING (auth.uid() = id);

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.perfiles (id, nombre, apellido, rut, rol, fecha_nacimiento, telefono)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'nombre',
        NEW.raw_user_meta_data->>'apellido',
        NEW.raw_user_meta_data->>'rut',
        COALESCE(NEW.raw_user_meta_data->>'rol', 'adulto_mayor'),
        (NEW.raw_user_meta_data->>'fecha_nacimiento')::DATE,
        NEW.raw_user_meta_data->>'telefono'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 3. Configurar Email Templates

En tu panel de Supabase, ve a Authentication > Email Templates y personaliza:

- **Confirm signup** - Confirmación de registro
- **Reset password** - Recuperación de contraseña
- **Magic link** - Enlaces mágicos (opcional)

## 📱 Uso de las Páginas

### Página de Login (`login.html`)

- Campo de email con validación
- Campo de contraseña con opción mostrar/ocultar
- Checkbox "Recordar sesión"
- Enlace a recuperación de contraseña
- Enlace a registro de nueva cuenta

### Página de Registro (`registro.html`)

- Campos de información personal (nombre, apellido)
- Validación de RUT chileno en tiempo real
- Campo de email con validación
- Contraseña con indicador de fortaleza
- Confirmación de contraseña
- Campos opcionales (fecha nacimiento, teléfono)
- Selector de rol de usuario
- Checkbox de términos y condiciones

### Página de Recuperación (`recuperar.html`)

- **Paso 1**: Solicitar email de recuperación
- **Paso 2**: Confirmación de envío con instrucciones
- **Paso 3**: Cambio de contraseña (cuando viene desde email)
- Temporizador para reenvío de email
- Validación de nueva contraseña

## 🔧 API del Sistema

### Funciones Principales

```javascript
// Inicializar sistema
SistemaAuth.inicializar()

// Registrar usuario
await SistemaAuth.registrarUsuario(datosUsuario)

// Iniciar sesión
await SistemaAuth.iniciarSesion(email, clave)

// Recuperar contraseña
await SistemaAuth.recuperarClave(email)

// Cerrar sesión
await SistemaAuth.cerrarSesion()

// Verificar sesión activa
GestorSesion.sesionActiva()

// Obtener datos de sesión
GestorSesion.obtenerSesion()
```

### Validadores

```javascript
// Validar email
Validadores.validarEmail(email)

// Validar contraseña
Validadores.validarClave(clave)

// Validar RUT chileno
Validadores.validarRUT(rut)

// Formatear RUT
Validadores.formatearRUT(rut)
```

## 🎨 Personalización de Estilos

Los estilos están en `src/css/auth.css` y incluyen:

- Variables CSS para colores y espaciado
- Componentes reutilizables
- Estados de hover y focus
- Animaciones suaves
- Responsive design
- Modo de alto contraste
- Soporte para prefers-reduced-motion

### Clases CSS Principales

```css
.contenedor-auth          /* Contenedor principal */
.tarjeta-auth            /* Tarjeta del formulario */
.formulario-auth         /* Formulario base */
.campo-auth              /* Campos de entrada */
.boton-auth-primario     /* Botón principal */
.boton-auth-secundario   /* Botón secundario */
.mensaje-error           /* Mensajes de error */
.indicador-clave         /* Indicador de fortaleza */
```

## 🧪 Testing

### Casos de Prueba

1. **Registro exitoso** con todos los campos válidos
2. **Validación de RUT** con RUTs válidos e inválidos
3. **Fortaleza de contraseña** con diferentes combinaciones
4. **Login exitoso** con credenciales correctas
5. **Manejo de errores** con credenciales incorrectas
6. **Recuperación de contraseña** con email válido
7. **Persistencia de sesión** al recargar página
8. **Cierre de sesión** y limpieza de datos

### Datos de Prueba

```javascript
// RUTs válidos para testing
const rutsValidos = [
    '12345678-5',
    '98765432-1',
    '11111111-1'
];

// Usuarios de prueba
const usuariosPrueba = [
    {
        nombre: 'María',
        apellido: 'González',
        rut: '12345678-5',
        email: 'maria@ejemplo.com',
        rol: 'adulto_mayor'
    }
];
```

## 🚨 Troubleshooting

### Problemas Comunes

1. **Error "Supabase no está cargado"**
   - Verificar que el script de Supabase esté incluido
   - Comprobar conexión a internet

2. **RUT no válido**
   - Verificar formato: 12345678-9
   - Comprobar dígito verificador

3. **Email no enviado**
   - Verificar configuración SMTP en Supabase
   - Revisar carpeta de spam

4. **Sesión no persiste**
   - Verificar localStorage del navegador
   - Comprobar tiempo de expiración

## 📞 Soporte

Para problemas o consultas:

1. Revisar logs en la consola del navegador
2. Verificar configuración de Supabase
3. Comprobar conectividad de red
4. Consultar documentación de Supabase

## 🔄 Actualizaciones Futuras

- [ ] Autenticación con redes sociales
- [ ] Verificación por SMS
- [ ] Autenticación de dos factores
- [ ] Integración con Resend para emails
- [ ] Dashboard de administración
- [ ] Logs de auditoría
- [ ] Exportación de datos de usuario
