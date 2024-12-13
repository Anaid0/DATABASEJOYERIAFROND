import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = 'http://localhost:3000/agregarComentario'; // Cambia por la URL de tu backend

  constructor(private http: HttpClient) { }

  agregarComentario(comentario: any): Observable<any> {
    return this.http.post(this.apiUrl, comentario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
