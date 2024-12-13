import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-inicio',
  templateUrl: './cliente-inicio.component.html',
  styleUrls: ['./cliente-inicio.component.css']  // Asegúrate de que la propiedad sea "styleUrls" (con 's')
})
export class ClienteInicioComponent {
  isMapVisible: boolean = false;
  productos: any[] = []; // Aquí guardaremos los productos obtenidos
  isLoginVisible: boolean = false;
  username: string = '';
  password: string = '';
  

verProducto(id_producto:number):void {
  this.router.navigate([`producto/${id_producto}`]);

}

buscarSucursales() {
  this.isMapVisible = !this.isMapVisible;
  }  

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Llamamos al backend para obtener los productos
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.http.get<any[]>('http://localhost:3000/productos').subscribe(
      (data) => {
        console.log('Productos obtenidos:', data); // Asegúrate de que 'data' contiene los campos esperados
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  
  // Función para manejar el inicio de sesión
  iniciarSesion(event: Event): void {
    event.preventDefault();
    if (this.username === 'admin' && this.password === '12345') {
      alert('Iniciando sesión como admin');
      this.router.navigate(['admin']);

      // Aquí rediriges al panel de control del admin
    } else {
      alert('Credenciales incorrectas');
    }
  }

  currentSlideIndex = 0;

  // Método para navegar a la siguiente diapositiva
  nextSlide(): void {
    if (this.currentSlideIndex < this.productos.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0; // Volver al principio
    }
  }

  // Método para navegar a la diapositiva anterior
  prevSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.productos.length - 1; // Volver al final
    }
  }

  // Método para obtener la transformación del carrusel
  getCarouselTransform(): string {
    return `translateX(-${this.currentSlideIndex * 270}px)`; // Ajusta el valor (270px) dependiendo del tamaño de tus tarjetas
  }
  mostrarLogin(): void {
    this.isLoginVisible = !this.isLoginVisible;
  }
}
