** ABIGAIL.github.io**

**Localizador de Coordenadas GPS - Aplicación Web Interactiva**

Una aplicación web moderna para obtener, visualizar y gestionar coordenadas GPS en tiempo real.

## ✨ Características Principales

- **📍 Obtener Ubicación GPS**: Accede a tu ubicación en tiempo real con alta precisión
- **🗺️ Mapa Interactivo**: Visualiza tu ubicación en un mapa interactivo con Leaflet
- **📊 Información Detallada**: Latitud, longitud, precisión y altitud
- **🔄 Geocodificación Inversa**: Convierte coordenadas a dirección legible
- **📋 Copiar Coordenadas**: Copia fácilmente lat/lng al portapapeles
- **📚 Historial**: Guarda automáticamente hasta 50 ubicaciones previas
- **💾 Exportar/Importar**: Descarga tus datos como JSON o importa desde archivo
- **📤 Compartir**: Comparte tu ubicación a través de Google Maps
- **📱 Responsive**: Funciona perfectamente en desktop, tablet y móvil

## 🚀 Cómo Usar

### 1. **Abrir la Aplicación**
   - Ve a la rama `main` del repositorio
   - Abre el archivo `index.html` en tu navegador
   - O usa GitHub Pages si está habilitado

### 2. **Obtener tu Ubicación**
   - Haz clic en el botón **"📍 Obtener Mi Ubicación"**
   - Autoriza el acceso a tu geolocalización cuando se te solicite
   - La app mostrará:
     - Latitud y Longitud
     - Precisión del GPS
     - Altitud (si está disponible)
     - Dirección aproximada

### 3. **Explorar el Mapa**
   - El mapa se centra automáticamente en tu ubicación
   - Usa el zoom y panorámica para explorar
   - Haz clic en el marcador para ver detalles

### 4. **Usar el Historial**
   - Cada ubicación obtenida se guarda automáticamente
   - Ve todos tus registros en la sección "Historial de Ubicaciones"
   - Haz clic en **"📍 Ir"** para ir a esa ubicación en el mapa
   - Haz clic en **"🗑️ Eliminar"** para quitar una entrada

### 5. **Exportar Datos**
   - Haz clic en **"📥 Exportar Datos (JSON)"**
   - Se descargará un archivo con todas tus ubicaciones
   - Puedes compartir o guardar estos datos

### 6. **Importar Datos**
   - Haz clic en **"📤 Importar Datos (JSON)"**
   - Selecciona un archivo JSON previamente exportado
   - Se cargarán todas las ubicaciones en el historial

## 📁 Estructura del Proyecto

```
ABIGAILTEAMO/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Este archivo
└─Abigailteamo-main.zip # Archivo original (opcional)
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos modernos y responsivos
- **JavaScript Vanilla**: Lógica sin dependencias
- **Leaflet.js**: Mapas interactivos
- **OpenStreetMap**: Datos de mapas
- **Nominatim API**: Geocodificación inversa
- **LocalStorage**: Almacenamiento de historial

## 🔧 Requisitos

- Navegador moderno con soporte para:
  - Geolocalización (Geolocation API)
  - LocalStorage
  - Fetch API
  - ES6 JavaScript

## ⚙️ Instalación

### Opción 1: Clonar y Usar Localmente

```bash
# Clonar el repositorio
git clone https://github.com/vegatovararmandoemanuel-maker/ABIGAILTEAMO.github.io

# Navegar a la carpeta
cd ABIGAILTEAMO

# Abrir en el navegador (si tienes Python 3)
python -m http.server 8000

# Luego accede a: http://localhost:8000
```

### Opción 2: GitHub Pages

Si tienes GitHub Pages habilitado:
1. Ve a Settings → Pages
2. Selecciona `main` branch como source
3. La app estará disponible en: `https://vegatovararmandoemanuel-maker.github.io/ABIGAILTEAMO/`

## 🔐 Privacidad y Seguridad

- ✅ Tu ubicación se procesa **localmente en tu navegador**
- ✅ NO se envía a servidores externos (excepto para obtener el nombre de la dirección)
- ✅ El historial se guarda en **LocalStorage de tu navegador**
- ✅ Puedes limpiar tu historial en cualquier momento

## 📝 Notas Importantes

- **Permisos**: La aplicación requiere permiso para acceder a tu geolocalización
- **Conexión**: Necesitas conexión a internet para:
  - Cargar mapas (OpenStreetMap)
  - Obtener nombres de direcciones (Nominatim API)
- **Precisión**: La precisión del GPS depende de:
  - Tu dispositivo
  - Cobertura GPS disponible
  - Ubicación (indoor/outdoor)

## 🐛 Solución de Problemas

### "Permiso denegado" / "Ubicación no disponible"
- Comprueba que has autorizado la geolocalización en tu navegador
- En navegadores privados, pueden tener restricciones
- Intenta usar HTTPS en lugar de HTTP

### El mapa no carga
- Verifica tu conexión a internet
- Comprueba que OpenStreetMap está accesible en tu región

### Las direcciones no aparecen
- El servicio Nominatim puede tener limitaciones de tasa
- Espera unos segundos y vuelve a intentar

## 🎨 Personalización

Puedes editar los archivos para personalizar:

- **Colores**: Modifica los colores gradientes en `styles.css`
- **Zoom del mapa**: Cambia `map.setView([40.4168, -3.7038], 13)` en `script.js`
- **Límite de historial**: Modifica `MAX_HISTORY` en `script.js`

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT.

## 👨‍💻 Autor

**vegatovararmandoemanuel-maker**

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o encontras problemas, abre un issue en el repositorio.

---
**te amo Abigail 📍**
