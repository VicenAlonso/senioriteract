# Guía Git para SeniorInteract

## ✅ Repositorio Ya Configurado

Tu proyecto ya está subido en: **https://github.com/VicenAlonso/senioriteract**

Esta guía te ayudará a manejar cambios futuros en tu proyecto.

## 🔄 Comandos para Cambios Diarios

### Ver Estado del Repositorio
```bash
# Ver archivos modificados
git status

# Ver diferencias en archivos modificados
git diff

# Ver historial de commits
git log --oneline
```

### Subir Cambios Nuevos
```bash
# 1. Agregar archivos modificados
git add .

# O agregar archivos específicos
git add src/js/auth.js
git add index.html

# 2. Hacer commit con mensaje descriptivo
git commit -m "Descripción clara del cambio realizado"

# 3. Subir cambios a GitHub
git push
```

### Ejemplos de Commits Comunes
```bash
# Nuevas funcionalidades
git commit -m "feat: Agregar módulo de comunicación"
git commit -m "feat: Implementar chat en tiempo real"

# Corrección de errores
git commit -m "fix: Corregir validación de RUT"
git commit -m "fix: Resolver problema de redirección"

# Mejoras de diseño
git commit -m "style: Mejorar accesibilidad en formularios"
git commit -m "style: Actualizar colores para mejor contraste"

# Documentación
git commit -m "docs: Actualizar README con nuevas instrucciones"
git commit -m "docs: Agregar guía de instalación"

# Mantenimiento
git commit -m "chore: Actualizar dependencias"
git commit -m "chore: Limpiar archivos innecesarios"
```

## 🌿 Trabajar con Ramas (Avanzado)

### Crear Nueva Funcionalidad en Rama Separada
```bash
# Crear y cambiar a nueva rama
git checkout -b nueva-funcionalidad

# Hacer cambios y commits en la rama
git add .
git commit -m "feat: Agregar nueva funcionalidad"

# Subir la rama a GitHub
git push -u origin nueva-funcionalidad

# Cambiar de vuelta a master
git checkout master

# Fusionar la rama (después de hacer Pull Request en GitHub)
git merge nueva-funcionalidad

# Eliminar rama local después de fusionar
git branch -d nueva-funcionalidad
```

### Ramas Útiles para SeniorInteract
```bash
# Para nuevos módulos
git checkout -b modulo-comunicacion
git checkout -b modulo-salud

# Para correcciones urgentes
git checkout -b hotfix-login

# Para mejoras de diseño
git checkout -b mejoras-accesibilidad
```

## 🆘 Solución de Problemas Comunes

### Error: "Your branch is behind"
```bash
# Descargar cambios del repositorio remoto
git pull origin master
```

### Error: "Merge conflict"
```bash
# Ver archivos en conflicto
git status

# Editar archivos manualmente para resolver conflictos
# Buscar marcas como <<<<<<< HEAD

# Después de resolver conflictos
git add .
git commit -m "fix: Resolver conflictos de merge"
git push
```

### Deshacer Último Commit (sin perder cambios)
```bash
git reset --soft HEAD~1
```

### Ver Diferencias Antes de Commit
```bash
# Ver todos los cambios
git diff

# Ver cambios de un archivo específico
git diff src/js/auth.js
```

### Ignorar Archivos Temporalmente
```bash
# Quitar archivo del seguimiento sin eliminarlo
git rm --cached archivo.txt

# Actualizar .gitignore y hacer commit
git add .gitignore
git commit -m "chore: Actualizar .gitignore"
```

## 🌟 GitHub Pages - Tu Sitio Web Gratis

Tu proyecto puede estar disponible en línea en: **https://vicenalonso.github.io/senioriteract/**

### Activar GitHub Pages
1. Ve a **Settings** de tu repositorio
2. Busca **Pages** en el menú lateral
3. En **Source** selecciona "Deploy from a branch"
4. En **Branch** selecciona "master"
5. En **Folder** selecciona "/ (root)"
6. Haz clic en **Save**

¡En unos minutos tu sitio estará disponible públicamente!

## 📋 Flujo de Trabajo Recomendado

### Para Cambios Pequeños (Diario)
```bash
# 1. Ver qué cambió
git status

# 2. Agregar cambios
git add .

# 3. Hacer commit
git commit -m "fix: Corregir validación de formulario"

# 4. Subir a GitHub
git push
```

### Para Nuevas Funcionalidades (Semanal)
```bash
# 1. Crear rama para la funcionalidad
git checkout -b modulo-comunicacion

# 2. Desarrollar la funcionalidad
# ... hacer cambios en el código ...

# 3. Hacer commits frecuentes
git add .
git commit -m "feat: Agregar interfaz de chat"
git commit -m "feat: Implementar envío de mensajes"

# 4. Subir rama a GitHub
git push -u origin modulo-comunicacion

# 5. Crear Pull Request en GitHub
# 6. Fusionar cuando esté listo
# 7. Volver a master y actualizar
git checkout master
git pull origin master
```

## 🎯 Consejos para SeniorInteract

### Commits Específicos para tu Proyecto
```bash
# Mejoras de accesibilidad
git commit -m "style: Aumentar tamaño de botones para personas mayores"
git commit -m "style: Mejorar contraste de colores"

# Nuevos módulos
git commit -m "feat: Agregar módulo de salud"
git commit -m "feat: Implementar recordatorio de medicamentos"

# Correcciones de autenticación
git commit -m "fix: Corregir validación de RUT en modo local"
git commit -m "fix: Resolver problema de sesión expirada"

# Documentación
git commit -m "docs: Actualizar guía de modo local"
git commit -m "docs: Agregar ejemplos de uso"
```

### Archivos Importantes a Vigilar
- `src/js/auth.js` - Sistema de autenticación
- `src/js/config.js` - Configuración (modo local/Supabase)
- `index.html` - Página principal
- `src/pages/principal.html` - Dashboard protegido
- `README.md` - Documentación principal

¡Tu proyecto SeniorInteract está listo para crecer! 🚀
