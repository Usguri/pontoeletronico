import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MarcarPontoUser } from '../models/marcarpontouser'

@Injectable({
  providedIn: 'root'
})

export class MarcarPontoUserService {

  private apiUrl = 'https://localhost:7234/api/';
  constructor(private http: HttpClient) { }

  MarcarcaoPonto(payload: MarcarPontoUser): Observable<any> {
    const isEntrada = payload.operacao == 1;

    const endpoint = isEntrada
      ? `registrar_horario_entrada?iduser=${payload.iduser}`
      : `registrar_horario_saida?idregistro=${payload.idregistro}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return isEntrada
      ? this.http.post(`${this.apiUrl}${endpoint}`, null, { headers })
      : this.http.put(`${this.apiUrl}${endpoint}`, null, { headers });
  }
}
