import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProducto(id_producto: number){
    return this.http.get<any>(`${this.apiUrl}/${id_producto}`);

  }

  // Llamar al procedimiento para agregar un producto
  agregarCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-cliente`, cliente);
  }

  agregarDevolucion(devolucion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-devolucion`, devolucion);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-producto`, producto);
  }

  agregarSucursal(sucursal: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-sucursal`, sucursal);
  }

  agregarCompra(compra: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar-compra`, compra);
  }

  generarReporte(reporte: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generar-reporte`, reporte);
  }

}
