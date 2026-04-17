document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('reportFugaBtn');
    const statusDiv = document.getElementById('geoStatus');

    if (!btn || !statusDiv) return;

    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            statusDiv.innerHTML = '❌ Este navegador no soporta geolocalización. Usa WhatsApp para reportar.';
            return;
        }
        statusDiv.innerHTML = '📍 Obteniendo ubicación... (permite el acceso)';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const precision = position.coords.accuracy ? `±${Math.round(position.coords.accuracy)}m` : '';
                const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
                const whatsappMsg = `Hola, reporto una FUGA DE AGUA en mi zona. Mi ubicación aproximada: ${lat},${lng} (${precision}). ${mapsLink}`;
                const whatsappUrl = `https://wa.me/50212345678?text=${encodeURIComponent(whatsappMsg)}`;

                statusDiv.innerHTML = `✅ Ubicación obtenida:<br>🌐 ${lat.toFixed(5)}, ${lng.toFixed(5)} ${precision}<br>
                <a href="${mapsLink}" target="_blank">📍 Ver en mapa</a> | 
                <a href="${whatsappUrl}" target="_blank">📲 Enviar por WhatsApp</a><br>
                <small>⬅️ Haz clic en el enlace de WhatsApp para reportar automáticamente.</small>`;
            },
            (error) => {
                let errMsg = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED: errMsg = 'Permiso denegado. Activa ubicación en tu navegador.'; break;
                    case error.POSITION_UNAVAILABLE: errMsg = 'Ubicación no disponible.'; break;
                    case error.TIMEOUT: errMsg = 'Tiempo de espera agotado.'; break;
                    default: errMsg = 'Error desconocido.';
                }
                statusDiv.innerHTML = `❌ No se pudo obtener ubicación: ${errMsg}. Puedes reportar manualmente al WhatsApp 1234-5678.`;
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    });
});