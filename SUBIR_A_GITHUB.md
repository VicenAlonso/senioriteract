# Guía para Subir SeniorInteract a GitHub

## 📋 Preparativos Antes de Subir

### 1. **Verificar Archivos Sensibles**
Antes de subir, asegúrate de que no hay información sensible:

- ✅ `.env` está en `.gitignore`
- ✅ Credenciales de Supabase están como placeholders
- ✅ No hay claves API reales en el código

### 2. **Revisar .gitignore**
Verifica que `.gitignore` incluya:
```
# Dependencias
node_modules/

# Archivos de entorno
.env
.env.local
.env.production

# Archivos de sistema
.DS_Store
Thumbs.db

# Archivos de IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Archivos temporales
*.tmp
*.temp
```

## 🚀 Pasos para Subir a GitHub

### Paso 1: Inicializar Repositorio Local
```bash
# Navegar a la carpeta del proyecto
cd "C:\Users\vicen\OneDrive\Escritorio\senioriteract"

# Inicializar repositorio Git
git init
```

### Paso 2: Configurar Git (si es primera vez)
```bash
# Configurar nombre de usuario
git config --global user.name "Tu Nombre"

# Configurar email
git config --global user.email "tu-email@ejemplo.com"
```

### Paso 3: Agregar Archivos al Repositorio
```bash
# Agregar todos los archivos
git add .

# Verificar qué archivos se van a subir
git status

# Hacer el primer commit
git commit -m "Initial commit: SeniorInteract - Sistema de autenticación completo"
```

### Paso 4: Crear Repositorio en GitHub
1. **Ir a GitHub.com** y hacer login
2. **Hacer clic en "New repository"** (botón verde)
3. **Configurar el repositorio:**
   - **Repository name**: `senioriteract`
   - **Description**: `Plataforma web accesible para personas mayores con sistema de autenticación`
   - **Visibility**: `Public` (o Private si prefieres)
   - **NO marcar** "Add a README file" (ya tienes uno)
   - **NO marcar** "Add .gitignore" (ya tienes uno)
   - **NO marcar** "Choose a license" (puedes agregarlo después)

4. **Hacer clic en "Create repository"**

### Paso 5: Conectar Repositorio Local con GitHub
```bash
# Agregar el repositorio remoto (reemplaza USERNAME con tu usuario de GitHub)
git remote add origin https://github.com/VicenAlonso/senioriteract.git

# Verificar que se agregó correctamente
git remote -v

# Subir el código a GitHub
git push -u origin main
```

### Paso 6: Verificar la Subida
1. **Refrescar la página** de tu repositorio en GitHub
2. **Verificar que todos los archivos** estén presentes
3. **Revisar que el README.md** se muestre correctamente

## 📁 Estructura que se Subirá

```
senioriteract/
├── src/
│   ├── css/
│   │   └── auth.css
│   ├── js/
│   │   ├── auth.js
│   │   └── config.js
│   └── pages/
│       ├── login.html
│       ├── registro.html
│       ├── recuperar.html
│       └── principal.html
├── dist/
│   └── style.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── AUTENTICACION.md
├── SESIONES_DINAMICAS.md
├── MODO_LOCAL.md
├── .gitignore
├── .editorconfig
└── requirements.txt
```

## 🔧 Comandos Git Útiles para el Futuro

### Subir Cambios Nuevos
```bash
# Ver archivos modificados
git status

# Agregar archivos específicos
git add archivo.js

# O agregar todos los cambios
git add .

# Hacer commit con mensaje descriptivo
git commit -m "Descripción del cambio realizado"

# Subir cambios a GitHub
git push
```

### Crear Ramas para Nuevas Funcionalidades
```bash
# Crear y cambiar a nueva rama
git checkout -b nueva-funcionalidad

# Hacer cambios y commits en la rama
git add .
git commit -m "Agregada nueva funcionalidad"

# Subir la rama a GitHub
git push -u origin nueva-funcionalidad

# Cambiar de vuelta a main
git checkout main

# Fusionar la rama (después de hacer Pull Request en GitHub)
git merge nueva-funcionalidad
```

## 📝 Mensajes de Commit Recomendados

### Formato Sugerido
```
tipo: descripción breve

Descripción más detallada si es necesaria
```

### Tipos de Commit
- `feat:` Nueva funcionalidad
- `fix:` Corrección de errores
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan funcionalidad)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar pruebas
- `chore:` Tareas de mantenimiento

### Ejemplos
```bash
git commit -m "feat: Agregar validación de RUT chileno"
git commit -m "fix: Corregir redirección en modo local"
git commit -m "docs: Actualizar README con instrucciones de instalación"
git commit -m "style: Mejorar accesibilidad en formularios"
```

## 🌟 Configurar GitHub Pages (Opcional)

Para que tu proyecto sea accesible en línea:

### Paso 1: Configurar GitHub Pages
1. **Ir a Settings** de tu repositorio
2. **Scroll hasta "Pages"** en el menú lateral
3. **En "Source"** seleccionar "Deploy from a branch"
4. **En "Branch"** seleccionar "main"
5. **En "Folder"** seleccionar "/ (root)"
6. **Hacer clic en "Save"**

### Paso 2: Acceder a tu Sitio
- Tu sitio estará disponible en: `https://USERNAME.github.io/senioriteract/`
- GitHub te dará la URL exacta en la configuración de Pages

## 🔒 Configuración de Seguridad

### Variables de Entorno en GitHub
Si más adelante necesitas usar variables secretas:

1. **Ir a Settings** > **Secrets and variables** > **Actions**
2. **Hacer clic en "New repository secret"**
3. **Agregar variables como:**
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

## 📋 Checklist Final

Antes de subir, verifica:

- [ ] `.gitignore` configurado correctamente
- [ ] README.md actualizado con instrucciones
- [ ] No hay credenciales reales en el código
- [ ] Todos los archivos importantes están incluidos
- [ ] El proyecto funciona en modo local
- [ ] Documentación completa (README, AUTENTICACION.md, etc.)

## 🆘 Solución de Problemas Comunes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/senioriteract.git
```

### Error: "failed to push some refs"
```bash
# Si el repositorio remoto tiene cambios
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Cambiar URL del repositorio
```bash
git remote set-url origin https://github.com/USERNAME/nuevo-nombre.git
```

### Ver historial de commits
```bash
git log --oneline
```

## 🎯 Próximos Pasos Después de Subir

1. **Crear un Release** cuando tengas una versión estable
2. **Configurar Issues** para reportar bugs
3. **Agregar etiquetas (tags)** para versiones
4. **Crear Pull Request templates** para colaboradores
5. **Configurar Actions** para CI/CD (opcional)

¡Con estos pasos tendrás tu proyecto SeniorInteract correctamente subido y organizado en GitHub!
