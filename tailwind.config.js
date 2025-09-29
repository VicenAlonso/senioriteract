/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,css}',
    './src/pages/*.html',
    './*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados para la aplicación
        primario: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secundario: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        }
      },
      fontFamily: {
        // Fuentes amigables para personas mayores
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Tamaños de fuente más grandes para mejor legibilidad
        'xs': ['0.875rem', { lineHeight: '1.5' }],
        'sm': ['1rem', { lineHeight: '1.6' }],
        'base': ['1.125rem', { lineHeight: '1.7' }],
        'lg': ['1.25rem', { lineHeight: '1.8' }],
        'xl': ['1.5rem', { lineHeight: '1.8' }],
      }
    },
  },
  plugins: [],
}
