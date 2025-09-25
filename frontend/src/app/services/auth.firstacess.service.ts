import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthFirstAcess } from '../models/primeiroacess'

@Injectable({
  providedIn: 'root'
})
export class AuthFirstAcessService {
  private apiUrl = 'https://localhost:7234/api/cadastrar_usuario';

  constructor(private http: HttpClient) { }

  PrimeiroAcesso(nome: string, email: string, senha: string, matricula: Number): Observable<any> {
    const payload: AuthFirstAcess = { nome, email, senha, matricula };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
