import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = 'http://localhost:3000/comentarios/';

  constructor(private http: HttpClient) { }

  publicarComentario(id_producto: number, autor: string, contenido: string): Observable<any> {
    const comentario = { autor, contenido };
    return this.http.post(`${this.apiUrl}${id_producto}`, comentario);
  }
}
