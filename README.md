# SeniorInteract

Una aplicación web desarrollada con HTML, CSS y JavaScript puro, junto con Tailwind CSS, diseñada especialmente para facilitar la interacción digital de las personas mayores.

## 🚀 Características

- **Interfaz Accesible**: Diseño limpio y simple con fuentes grandes y contrastes altos
- **Responsive**: Funciona perfectamente en dispositivos móviles, tablets y escritorio
- **Tecnología Simple**: Construido con HTML, CSS y JavaScript puro
- **Tailwind CSS**: Framework de CSS utilitario para estilos modernos
- **Optimizado para Personas Mayores**: Botones grandes, texto legible y navegación intuitiva
- **Accesibilidad Web**: Cumple con estándares WCAG para lectores de pantalla

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos personalizados y responsive
- **JavaScript ES6+**: Funcionalidad interactiva sin frameworks
- **Tailwind CSS**: Framework de CSS utilitario
- **Live Server**: Servidor de desarrollo local

### Backend (Opcional)
- **Python**: Para servicios backend adicionales
- **Supabase**: Base de datos y autenticación
- **FastAPI**: Framework web rápido para Python
- **Pandas**: Análisis y manipulación de datos

## 📦 Instalación

### Prerrequisitos
- Node.js 16 o superior (solo para Tailwind CSS)
- npm o yarn
- Python 3.8+ (opcional, para servicios backend)
- Navegador web moderno

### Configuración del Proyecto

1. **Instalar dependencias de Node.js (para Tailwind CSS):**
   ```bash
   npm install
   ```

2. **Compilar estilos de Tailwind CSS:**
   ```bash
   npm run build
   # O para modo watch (recompila automáticamente):
   npm run watch
   ```

3. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Instalar dependencias de Python (opcional):**
   ```bash
   pip install -r requirements.txt
   ```

5. **Abrir en el navegador:**
   Visita [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

```
senioriteract/
├── src/
│   ├── style.css           # Estilos fuente con Tailwind CSS
│   └── app.js              # JavaScript principal de la aplicación
├── dist/
│   └── style.css           # Estilos compilados de Tailwind CSS
├── index.html              # Página principal HTML
├── package.json            # Dependencias de Node.js
├── requirements.txt        # Dependencias de Python
├── tailwind.config.js      # Configuración de Tailwind CSS
├── postcss.config.js       # Configuración de PostCSS
└── README.md               # Documentación del proyecto
```

## 🎨 Guía de Estilos

### Colores Principales
- **Primario**: Azul (#0ea5e9) - Para elementos principales
- **Secundario**: Gris (#64748b) - Para elementos secundarios
- **Fondo**: Gris claro (#f8fafc) - Para fondos

### Tipografía
- **Fuente**: Inter (Google Fonts)
- **Tamaño base**: 18px (más grande para mejor legibilidad)
- **Altura de línea**: 1.7 (espaciado generoso)

### Componentes Predefinidos
- `.boton-primario`: Botón principal azul
- `.boton-secundario`: Botón secundario con borde
- `.tarjeta`: Contenedor con sombra y bordes redondeados
- `.campo-entrada`: Campo de formulario estilizado

## 📱 Diseño Responsivo

La aplicación está optimizada para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Escritorio**: 1024px+

## 🧪 Scripts Disponibles

- `npm run dev`: Ejecuta live-server para desarrollo local
- `npm run build`: Compila Tailwind CSS para producción (minificado)
- `npm run watch`: Compila Tailwind CSS en modo watch (recompila automáticamente)
- `npm run serve`: Ejecuta live-server sin abrir navegador automáticamente

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b caracteristica/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin caracteristica/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, no dudes en:
- Abrir un issue en GitHub
- Contactar al equipo de desarrollo

---

**¡Gracias por usar SeniorInteract!** 🎉
