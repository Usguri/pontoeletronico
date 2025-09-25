import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  matricula: any;
  accessToken!: any;
  username: any;

  constructor(private http: HttpClient, private router: Router) { }

  public login(username: string, password: number): Observable<any> {

    const body = {
      email: username,
      senha: password
    }
    return this.http.post("https://localhost:7234/api/login", body, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
  }

  loadProfile(data: any) {

    this.isAuthenticated = true;
    this.username = data.usuario.nome;
    this.matricula = data.usuario.matricula;
    this.accessToken = data.token;

    localStorage.setItem('user', JSON.stringify(data.usuario));
    localStorage.setItem('token', data.token);
  }

  logout() {
    this.isAuthenticated = false;
    this.username = null;
    this.accessToken = null;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  initializeAuth() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.isAuthenticated = true;
      this.username = JSON.parse(user).name;
      this.accessToken = token;
    }
  }

  loadJwtTokenFromLocalStorage() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      this.isAuthenticated = true;
      this.username = JSON.parse(user).name;
      this.matricula = JSON.parse(user).matricula;
      this.accessToken = token;
    }
  }
}
