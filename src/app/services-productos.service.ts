import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesProductosService {
  private apiUrl = 'http://localhost:3000'; // URL del backend

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  // Obtener un producto por su ID
  getProductoById(id_producto: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto/${id_producto}`);
  }

  // Procesar compra
  comprarProducto(id_producto: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/comprar/${id_producto}`, {
      cantidad,
    });
  }
  // Llamar al procedimiento para agregar un producto
  agregarProducto(
    nombre: string,
    precio: number,
    stock: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-producto`, {
      nombre,
      precio,
      stock,
    });
  }


  
}
