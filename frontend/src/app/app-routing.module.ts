import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WorkingDayComponent } from './components/tela-inicial/tela-principal-colaborador.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  { path: "", component: WorkingDayComponent, canActivate: [AuthenticationGuard] },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
