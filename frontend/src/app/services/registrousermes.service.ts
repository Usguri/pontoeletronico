import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroUsuario } from '../models/registrousuario'

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioMesService {
  private apiUrl = 'https://localhost:7234/api/buscar_horarios_mensal';

  constructor(private http: HttpClient) { }

  getRegistroUsuarioMes(mes: number, iduser: number | null): Observable<RegistroUsuario[]> {
    let params = new HttpParams().set('mes', mes.toString());

    if (iduser != null) {
      params = params.set('iduser', iduser);
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<RegistroUsuario[]>(this.apiUrl, { params, headers });
  }
}
