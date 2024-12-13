import { Component } from '@angular/core';
import { ProductosService } from '../service/productos.service';

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  styleUrl: './admin-inicio.component.css'
})
export class AdminInicioComponent {

  activeForm: string | null = null;

  // Variables para los datos de cada formulario
  cliente = { nombre: '', apellido: '', correo: '', telefono: '', direccion: '', latitud: 0, longitud: 0 };
  devolucion = { idCompra: 0, motivo: '' };
  producto = { nombre: '', descripcion: '', precio: 0, stock: 0 };
  sucursal = { nombre: '', direccion: '', latitud: 0, longitud: 0  };
  compra = { idProducto: 0, cantidad: 0, valor: 0, idCliente: 0, idSucursal: 0};
  reporte = { mes: 0, anio: 0 };

  constructor(private productosService: ProductosService) {}

  showForm(formName: string): void {
    this.activeForm = this.activeForm === formName ? null : formName;
  }

  agregarCliente(): void {
    this.productosService.agregarCliente(this.cliente)
      .subscribe(response => {
        alert('Cliente agregado exitosamente');
        this.resetForm('cliente');
      }, error => {
        console.error('Error al agregar cliente:', error);
      });
  }

  agregarDevolucion(): void {
    this.productosService.agregarDevolucion(this.devolucion)
      .subscribe(response => {
        alert('Devolución registrada exitosamente');
        this.resetForm('devolucion');
      }, error => {
        console.error('Error al registrar devolución:', error);
      });
  }

  agregarProducto(): void {
    this.productosService.agregarProducto(this.producto)
      .subscribe(response => {
        alert('Producto agregado exitosamente');
        this.resetForm('producto');
      }, error => {
        console.error('Error al agregar producto:', error);
      });
  }

  agregarSucursal(): void {
    this.productosService.agregarSucursal(this.sucursal)
      .subscribe(response => {
        alert('Sucursal agregada exitosamente');
        this.resetForm('sucursal');
      }, error => {
        console.error('Error al agregar sucursal:', error);
      });
  }

  agregarCompra(): void {
    this.productosService.agregarCompra(this.compra)
      .subscribe(response => {
        alert('Compra registrada exitosamente');
        this.resetForm('compra');
      }, error => {
        console.error('Error al registrar compra:', error);
      });
  }

  generarReporte(): void {
    this.productosService.generarReporte(this.reporte)
      .subscribe(response => {
        console.log('Reporte generado:', response);
        alert('Reporte generado con éxito');
      }, error => {
        console.error('Error al generar reporte:', error);
      });
  }

  resetForm(formName: string): void {
    switch (formName) {
      case 'cliente': this.cliente = { nombre: '', apellido: '', correo: '', telefono: '', direccion: '', latitud: 0, longitud: 0 }; break;
      case 'devolucion': this.devolucion = { idCompra: 0, motivo: '' }; break;
      case 'producto': this.producto = { nombre: '', descripcion: '', precio: 0, stock:0 }; break;
      case 'sucursal': this.sucursal = { nombre: '', direccion: '', latitud: 0, longitud: 0 }; break;
      case 'compra': this.compra = { idProducto: 0, cantidad: 0, valor: 0, idCliente: 0, idSucursal: 0 }; break;
      case 'reporte': this.reporte = { mes: 0, anio: 0  }; break;
    }
    this.activeForm = null;
  }
}
