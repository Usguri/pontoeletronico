import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthFirstAcessService } from '../../services/auth.firstacess.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  formPrimeiro!: FormGroup;
  formAtual: 'login' | 'primeiro' = 'login';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firstAcess: AuthFirstAcessService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control('', { nonNullable: true }),
      password: this.fb.control('', { nonNullable: true })
    });

    this.formPrimeiro = this.fb.group({
      nome: this.fb.control('', { nonNullable: true }),
      email: this.fb.control('', { nonNullable: true }),
      senha: this.fb.control('', { nonNullable: true }),
      matricula: this.fb.control('', { nonNullable: true })
    });
  }

  handleLogin() {
    const { username, password } = this.formLogin.value;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl('/');
      },
      error: err => {
        if (err.status === 401) {
          alert(err.error.message);
          return;
        } else {
          console.log(err);
        }
      }
    });
  }

  handlePrimeiro() {
    const { nome, email, senha, matricula } = this.formPrimeiro.value;

    this.firstAcess.PrimeiroAcesso(nome, email, senha, matricula).subscribe({
      next: data => {

        this.formPrimeiro.reset();
        this.formAtual = 'login';
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
