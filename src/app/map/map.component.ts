import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Necesitamos importar HttpClient para hacer solicitudes HTTP
import { GoogleMapsService } from '../service/google-maps.service';

declare var google: any;  // Declaración global de google para evitar errores de tipo

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  direccionCasa: string = '';
  latitudCasa: number = 0;
  longitudCasa: number = 0;
  map: any;
  marker: any;
  line: any;  // Variable para la línea entre la sucursal y el cliente

  sucursales: any[] = [];  // Almacenamos las sucursales obtenidas del backend

  constructor(private http: HttpClient, private googleMapsService: GoogleMapsService) {}

  ngOnInit() {
      this.googleMapsService.loadScript('AIzaSyAQStlK4ZjCxkSTu2GgY4VJh0gLw7maQoA', ['geometry', 'places'])
        .then(() => {
          this.initMap(); // Inicializa el mapa una vez que la API esté cargada
        })
        .catch((error) => {
          console.error('Error loading Google Maps script: ', error);
        });
  
      // Obtener las sucursales desde el backend
      this.http.get<any[]>('http://localhost:3000/sucursales').subscribe(
        (data) => {
          this.sucursales = data;
          this.mostrarSucursales();  // Mostrar sucursales en el mapa después de obtenerlas
        },
        (error) => {
          console.error('Error al obtener las sucursales:', error);
        }
      );
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 4.632539102166865, lng: -74.08081778835967 },
      zoom: 12
    });

    // Configuración del autocompletado para la dirección
    const direccionCasaInput = document.getElementById('direccionCasa') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(direccionCasaInput);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        this.latitudCasa = place.geometry.location.lat();
        this.longitudCasa = place.geometry.location.lng();
        this.buscarSucursal(); // Mostrar la sucursal más cercana y la línea
      }
    });
  }

  mostrarSucursales() {
    // Mostrar todas las sucursales obtenidas del backend en el mapa
    this.sucursales.forEach(sucursal => {
      // Asegúrate de que latitud y longitud estén correctamente extraídas
      const sucursalLocation = new google.maps.LatLng(sucursal.latitud, sucursal.longitud);
      new google.maps.Marker({
        position: sucursalLocation,
        map: this.map,
        title: sucursal.nombre
      });
    });
  }
  

  buscarSucursal() {
    const userLocation = new google.maps.LatLng(this.latitudCasa, this.longitudCasa);

    // Eliminar el marcador de la ubicación del cliente si ya existe
    if (this.marker) {
      this.marker.setMap(null);
    }

    // Eliminar la línea anterior si existe
    if (this.line) {
      this.line.setMap(null);
    }

    // Crear el marcador de la ubicación del cliente
    this.marker = new google.maps.Marker({
      position: userLocation,
      map: this.map,
      title: 'Tu ubicación'
    });

    // Encontrar la sucursal más cercana
    let sucursalMasCercana = null;
    let distanciaMinima = Number.MAX_VALUE;

    this.sucursales.forEach(sucursal => {
      const sucursalLocation = new google.maps.LatLng(sucursal.latitud, sucursal.longitud);
      const distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, sucursalLocation);

      if (distance < distanciaMinima) {
        distanciaMinima = distance;
        sucursalMasCercana = sucursalLocation;
      }
    });

    // Dibujar la línea entre la ubicación del cliente y la sucursal más cercana
    if (sucursalMasCercana) {
      this.line = new google.maps.Polyline({
        path: [userLocation, sucursalMasCercana],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      this.line.setMap(this.map);
    }

    this.map.setCenter(userLocation);
    this.map.setZoom(12);
  }
}
