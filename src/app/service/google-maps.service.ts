import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  loadScript(apiKey: string, libraries: string[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verificar si la API de Google Maps ya está cargada
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
      } else {
        const librariesParam = libraries.length > 0 ? `&libraries=${libraries.join(',')}` : '';
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${librariesParam}`;
        script.async = true;
        script.defer = true;

        // Usar un manejador de eventos para onload
        script.onload = () => {
          resolve();  // El script se cargó correctamente
        };

        // Usar un manejador de eventos para onerror
        script.onerror = (error) => {
          reject('Error al cargar el script de Google Maps: ' + (error instanceof Error ? error.message : error));
        };

        // Agregar el script al DOM
        document.head.appendChild(script);
      }
    });
  }
}
