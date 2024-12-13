import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})

export class DetalleProductoComponent {
  
  comentar(){
    this.router.navigate(['comentarios']);
  }

  principal() {
    this.router.navigate(['/']);
  }

  producto: any = {}; // Aquí guardamos los detalles del producto
  cantidad: number = 1; // Cantidad seleccionada por el usuario
  showModal: boolean = false; // Controla la visibilidad del modal
  showSuccessMessage: boolean = false; // Controla la visibilidad del mensaje de éxito
  stock: number =0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productoId = this.route.snapshot.paramMap.get(`id_producto`);
    if (productoId) {
      this.obtenerProducto(parseInt(productoId));
    }
  }

  // Obtener los detalles del producto desde la API
  obtenerProducto(id_producto: number): void {
    this.http.get(`http://localhost:3000/producto/${id_producto}`).subscribe(
      (data) => {
        this.producto = data;
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  // Función para mostrar el modal de compra
  comprar(): void {
    this.showModal = true; // Mostrar modal
  }

  // Confirmar la compra y actualizar el stock
  confirmarCompra(): void {
    // Aquí llamamos al backend para procesar el pago y actualizar el stock
    this.http.post(`http://localhost:3000/comprar/${this.producto.id_producto}`, { cantidad: this.cantidad })
      .subscribe(
        response => {
          this.showModal = false; // Cerrar el modal
          this.showSuccessMessage = true; // Mostrar el mensaje de éxito
          setTimeout(() => this.showSuccessMessage = false, 3000); // Ocultar mensaje de éxito después de 3 segundos
        },
        error => {
          console.error('Error al procesar la compra:', error);
        }
      );
  }

  // Cancelar la compra
  cancelarCompra(): void {
    this.showModal = false; // Cerrar el modal
  }
}
