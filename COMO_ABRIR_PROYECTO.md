# 🚀 Cómo Abrir y Trabajar en SeniorInteract

## 📂 Ubicación del Proyecto
Tu proyecto está en: `C:\Users\vicen\OneDrive\Escritorio\senioriteract`

## 🔧 Métodos para Abrir el Proyecto

### Método 1: Con Live Server (Recomendado)
```bash
# 1. Abrir terminal en la carpeta del proyecto
cd "C:\Users\vicen\OneDrive\Escritorio\senioriteract"

# 2. Iniciar servidor de desarrollo
npm run dev
```
- ✅ **Se abre automáticamente** en el navegador
- ✅ **Recarga automática** cuando cambias archivos
- ✅ **URL**: http://localhost:3000 o http://127.0.0.1:8080

### Método 2: Abrir Directamente en Navegador
```bash
# Simplemente abre el archivo index.html en tu navegador
# Doble clic en: C:\Users\vicen\OneDrive\Escritorio\senioriteract\index.html
```
- ✅ **Más simple** - No necesita servidor
- ❌ **Sin recarga automática**
- ✅ **Funciona offline**

### Método 3: Con Python (Alternativo)
```bash
# 1. Ir a la carpeta del proyecto
cd "C:\Users\vicen\OneDrive\Escritorio\senioriteract"

# 2. Iniciar servidor Python
python -m http.server 8000
```
- ✅ **URL**: http://localhost:8000
- ✅ **No necesita Node.js**

## 🛠️ Pasos Completos para Trabajar

### 1. Abrir Terminal
- **Windows**: `Win + R` → escribir `cmd` → Enter
- **O**: Abrir PowerShell desde el menú inicio

### 2. Navegar al Proyecto
```bash
cd "C:\Users\vicen\OneDrive\Escritorio\senioriteract"
```

### 3. Iniciar Servidor
```bash
npm run dev
```

### 4. Abrir en Navegador
- Se abre automáticamente, o ve a: http://localhost:3000

## 🔍 Verificar que Todo Funciona

### Probar Funcionalidades:
1. **Página principal** - Debe cargar correctamente
2. **Botón "Comenzar"** - Debe ir a login (sin sesión)
3. **Registro** - Crear cuenta de prueba
4. **Login** - Usar: `demo@senioriteract.com` / `12345678`
5. **Área personal** - Debe mostrar dashboard
6. **Cerrar sesión** - Debe volver al inicio

## 🛑 Cerrar el Servidor

Cuando termines de trabajar:
```bash
# En la terminal donde está corriendo el servidor:
Ctrl + C

# O cerrar la ventana de terminal
```

## 📝 Comandos Útiles

### Ver Estado del Proyecto
```bash
# Ver archivos modificados
git status

# Ver si el servidor está corriendo
netstat -an | findstr :3000
```

### Compilar Estilos (si cambias CSS)
```bash
npx tailwindcss -i ./src/style.css -o ./dist/style.css --minify
```

### Subir Cambios a GitHub
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

## 🚨 Solución de Problemas

### Error: "npm no se reconoce"
```bash
# Instalar Node.js desde: https://nodejs.org/
# Reiniciar terminal después de instalar
```

### Error: "Puerto ocupado"
```bash
# Cambiar puerto en package.json o usar:
npm run dev -- --port 3001
```

### Error: "Archivos no cargan"
```bash
# Verificar que estás en la carpeta correcta:
dir
# Debe mostrar: index.html, package.json, src/, etc.
```

### Proyecto no funciona
```bash
# Reinstalar dependencias:
npm install

# Recompilar estilos:
npm run build-css
```

## 📱 URLs Importantes

- **Desarrollo local**: http://localhost:3000
- **GitHub**: https://github.com/VicenAlonso/senioriteract
- **GitHub Pages**: https://vicenalonso.github.io/senioriteract/

## 🎯 Flujo de Trabajo Diario

1. **Abrir terminal** en la carpeta del proyecto
2. **Ejecutar** `npm run dev`
3. **Hacer cambios** en el código
4. **Ver cambios** automáticamente en el navegador
5. **Cuando termines**:
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```
6. **Cerrar servidor** con `Ctrl + C`

## 💡 Consejos

- **Siempre trabajar** con el servidor corriendo para ver cambios en tiempo real
- **Hacer commits frecuentes** para no perder trabajo
- **Probar en modo local** antes de subir a GitHub
- **El proyecto funciona sin internet** (modo local activado)
- **Mantener la terminal abierta** mientras trabajas

¡Tu proyecto SeniorInteract está listo para seguir creciendo! 🌟
