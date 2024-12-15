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
  producto: any = {}; // Aquí guardamos los detalles del producto
  cantidad: number = 1; // Cantidad seleccionada por el usuario
  showModal: boolean = false; // Controla la visibilidad del modal
  showSuccessMessage: boolean = false; // Controla la visibilidad del mensaje de éxito
  stock: number = 0; // Cantidad disponible en stock
  idProducto: number = 0; // ID del producto obtenido de la URL

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Capturamos el ID del producto desde la URL
    const productoId = this.route.snapshot.paramMap.get('id_producto');
    if (productoId) {
      this.idProducto = parseInt(productoId); // Guardamos el ID
      this.obtenerProducto(this.idProducto); // Llamamos a la función para obtener los detalles del producto
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

  // Redirigir a la página de comentarios y guardar automáticamente el ID del producto
  comentar(): void {
    // Aquí podrías guardar datos asociados al comentario si fuera necesario
    this.router.navigate(['comentarios/:id_producto'], {
      queryParams: { id_producto: this.idProducto }
    });
  }

  // Volver a la página principal
  principal(): void {
    this.router.navigate(['/']);
  }

  // Función para mostrar el modal de compra
  comprar(): void {
    this.showModal = true; // Mostrar modal
  }

  // Confirmar la compra y actualizar el stock
  confirmarCompra(): void {
    // Aquí llamamos al backend para procesar el pago y actualizar el stock
    const compraData = { cantidad: this.cantidad, id_producto: this.idProducto };

    this.http.post(`http://localhost:3000/comprar`, compraData).subscribe(
      (response) => {
        this.showModal = false; // Cerrar el modal
        this.showSuccessMessage = true; // Mostrar el mensaje de éxito
        setTimeout(() => (this.showSuccessMessage = false), 3000); // Ocultar mensaje de éxito después de 3 segundos
        // Opcional: Puedes actualizar el stock después de la compra
        if (this.producto.stock >= this.cantidad) {
          this.producto.stock -= this.cantidad;
        }
      },
      (error) => {
        console.error('Error al procesar la compra:', error);
      }
    );
  }

  // Cancelar la compra
  cancelarCompra(): void {
    this.showModal = false; // Cerrar el modal
  }
}
