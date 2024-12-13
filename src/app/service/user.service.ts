import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Cambiar según tu configuración

  constructor(private http: HttpClient) {}

  validateUser(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/validate`, { email });
  }
}
