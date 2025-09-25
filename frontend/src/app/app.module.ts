import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,        // Angular funcionar no browser
    AppRoutingModule,     // Sistema de rotas
    HttpClientModule,     // Requisições HTTP
    ReactiveFormsModule,   // Formulários reativos
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
