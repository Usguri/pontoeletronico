import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroUsuario } from '../models/registrousuario'

@Injectable({
  providedIn: 'root'
})

export class RegistroUsuarioService {
  private apiUrl = 'https://localhost:7234/api/buscar_horarios_semanal';

  constructor(private http: HttpClient) { }

  getRegistroUsuarioSemana(numeroSemana: number, Iduser: number | null): Observable<RegistroUsuario[]> {
    let params = new HttpParams().set('numeroSemana', numeroSemana.toString());

    if (Iduser !== null) {
      params = params.set('iduser', Iduser);
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RegistroUsuario[]>(this.apiUrl, { params, headers });
  }

}
