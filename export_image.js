// export_image.js
// Genera una imagen PNG (por defecto 1200x800) usando la foto IMG_20260410_223451_846.jpg como fondo
// y los datos visibles en la página (latitud, longitud, dirección, fecha/hora). Requiere que drawBackgroundCover
// y loadImage estén definidos (están en script.js).

async function exportImage(width = 1200, height = 800) {
  const canvas = document.getElementById('exportCanvas');
  if (!canvas) {
    console.warn('No se encontró el canvas de exportación');
    return;
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const src = 'IMG_20260410_223451_846.jpg';
  // Intentar dibujar la imagen de fondo en modo cover
  let drawn = false;
  try {
    drawn = await drawBackgroundCover(ctx, src, width, height);
  } catch (e) {
    console.warn('Error cargando imagen de fondo:', e);
  }

  if (!drawn) {
    // Fallback: fondo blanco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  // Dibujar semitransparente la caja donde pondremos texto para mejor legibilidad
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  const pad = 36;
  const boxH = 180;
  ctx.fillRect(pad, pad, width - pad*2, boxH);

  // Texto principal
  const lat = document.getElementById('latitude')?.textContent || '--';
  const lon = document.getElementById('longitude')?.textContent || '--';
  const addr = document.getElementById('address')?.textContent || '';
  const now = new Date();
  const timestamp = now.toLocaleString();

  ctx.fillStyle = '#111';
  ctx.textAlign = 'left';
  ctx.font = 'bold 28px Arial';
  ctx.fillText(`Lat: ${lat}`, pad + 12, pad + 44);
  ctx.fillText(`Lon: ${lon}`, pad + 12, pad + 84);

  ctx.font = '20px Arial';
  wrapTextExport(ctx, `Dirección: ${addr}`, pad + 12, pad + 120, width - pad*2 - 24, 24);

  ctx.font = '14px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(`Generado: ${timestamp}`, width - pad - 12, height - pad - 12);

  // Descargar
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `coordenadas_${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function wrapTextExport(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// Enlazar el botón si existe
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('downloadImageBtn');
  if (btn) {
    btn.addEventListener('click', function() {
      exportImage(1200, 800);
    });
  }
});
