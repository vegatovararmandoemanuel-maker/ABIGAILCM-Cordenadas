// Añadidas funciones para dibujar imagen de fondo en modo cover en el canvas si existe la imagen

/* ============================================
   FUNCIONALIDAD PRINCIPAL - GPS Y COORDENADAS
   (con fondo en canvas si IMG_20260410_223451_846.jpg está disponible)
   ============================================ */

let map;
let userMarker;
let history = [];
const MAX_HISTORY = 50;

// Inicializar el mapa
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    loadHistory();
    setupEventListeners();
});

function initMap() {
    // Crear mapa centrado en una ubicación por defecto
    map = L.map('map').setView([40.4168, -3.7038], 13);
    
    // Agregar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
    }).addTo(map);
}

function setupEventListeners() {
    document.getElementById('getLocationBtn').addEventListener('click', getLocation);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', copyToClipboard);
    });
    
    document.getElementById('shareBtn').addEventListener('click', shareLocation);
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', importData);
    document.getElementById('fileInput').addEventListener('change', handleFileImport);
    
    // Cerrar modal
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

/* ============================================
   Helper para cargar imágenes con crossOrigin
   ============================================ */
function loadImage(src){
    return new Promise((resolve)=>{
        if(!src) return resolve(null);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = ()=>resolve(img);
        img.onerror = ()=>resolve(null);
        img.src = src;
    });
}

/* ============================================
   Dibujar imagen como background en modo cover
   ============================================ */
async function drawBackgroundCover(ctx, src, w, h){
    const img = await loadImage(src);
    if(!img) return false;
    const iw = img.width, ih = img.height;
    const ir = iw/ih, cr = w/h;
    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (ir > cr) {
        // imagen más ancha -> recortar lados
        sw = ih * cr;
        sx = (iw - sw) / 2;
    } else {
        // imagen más alta -> recortar arriba/abajo
        sh = iw / cr;
        sy = (ih - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    return true;
}

/* ============================================
   OBTENER UBICACIÓN GPS
   ============================================ */

function getLocation() {
    const btn = document.getElementById('getLocationBtn');
    btn.disabled = true;
    btn.textContent = '⏳ Obteniendo ubicación...';
    
    if (!navigator.geolocation) {
        showModal('Error', 'Geolocalización no disponible en tu navegador');
        btn.disabled = false;
        btn.textContent = '📍 Obtener Mi Ubicación';
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function successCallback(position) {
    const { latitude, longitude, accuracy, altitude, altitudeAccuracy } = position.coords;
    const timestamp = new Date();
    
    // Actualizar la UI con las coordenadas
    document.getElementById('latitude').textContent = latitude.toFixed(6);
    document.getElementById('longitude').textContent = longitude.toFixed(6);
    document.getElementById('accuracy').textContent = accuracy.toFixed(2) + ' metros';
    document.getElementById('altitude').textContent = altitude ? altitude.toFixed(2) + ' metros' : 'No disponible';
    
    // Actualizar el mapa
    updateMap(latitude, longitude);
    
    // Obtener la dirección inversa
    reverseGeocode(latitude, longitude);
    
    // Agregar al historial
    addToHistory({
        latitude,
        longitude,
        accuracy,
        altitude,
        timestamp
    });
    
    // Restaurar botón
    const btn = document.getElementById('getLocationBtn');
    btn.disabled = false;
    btn.textContent = '📍 Obtener Mi Ubicación';
    
    showModal('Éxito', '✅ Ubicación obtenida correctamente');
}

function errorCallback(error) {
    let message = '';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = 'Permiso denegado. Por favor, habilita la geolocalización.';
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'Información de ubicación no disponible.';
            break;
        case error.TIMEOUT:
            message = 'Se agotó el tiempo de espera para obtener la ubicación.';
            break;
        default:
            message = 'Error al obtener la ubicación: ' + error.message;
    }
    
    showModal('Error', message);
    
    const btn = document.getElementById('getLocationBtn');
    btn.disabled = false;
    btn.textContent = '📍 Obtener Mi Ubicación';
}

/* ============================================
   ACTUALIZAR MAPA
   ============================================ */

function updateMap(latitude, longitude) {
    // Centrar el mapa en las nuevas coordenadas
    map.setView([latitude, longitude], 15);
    
    // Eliminar marcador anterior
    if (userMarker) {
        map.removeLayer(userMarker);
    }
    
    // Crear nuevo marcador
    userMarker = L.marker([latitude, longitude], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })
    }).addTo(map);
    
    userMarker.bindPopup(`
        <div style="font-family: monospace;">
            <strong>Mi Ubicación</strong><br>
            Lat: ${latitude.toFixed(6)}<br>
            Lng: ${longitude.toFixed(6)}<br>
            Actualizado: ${new Date().toLocaleTimeString()}
        </div>
    `).openPopup();
}

/* ============================================
   GEOCODIFICACIÓN INVERSA
   ============================================ */

function reverseGeocode(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const address = data.address?.city || data.address?.town || data.address?.country || 'Dirección no encontrada';
            document.getElementById('address').textContent = data.address?.name || address || 'Ubicación desconocida';
        })
        .catch(error => {
            console.error('Error en geocodificación inversa:', error);
            document.getElementById('address').textContent = 'Error al obtener dirección';
        });
}

/* ============================================
   HISTORIAL DE UBICACIONES
   ============================================ */

function addToHistory(locationData) {
    history.unshift({
        ...locationData,
        id: Date.now()
    });
    
    // Limitar a MAX_HISTORY entradas
    if (history.length > MAX_HISTORY) {
        history.pop();
    }
    
    saveHistory();
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No hay ubicaciones registradas</p>';
        return;
    }
    
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item">
            <div class="history-item-time">
                📅 ${new Date(item.timestamp).toLocaleString()}
            </div>
            <div class="history-item-coords">
                📍 ${item.latitude.toFixed(6)}, ${item.longitude.toFixed(6)}
            </div>
            <div class="history-item-address">
                Precisión: ${item.accuracy.toFixed(2)}m
            </div>
            <div style="margin-top: 10px; display: flex; gap: 10px;">
                <button class="btn btn-info" style="font-size: 0.9em; padding: 6px 12px;" onclick="goToHistory(${index})">
                    📍 Ir
                </button>
                <button class="btn btn-secondary" style="font-size: 0.9em; padding: 6px 12px;" onclick="deleteHistoryItem(${index})">
                    🗑️ Eliminar
{