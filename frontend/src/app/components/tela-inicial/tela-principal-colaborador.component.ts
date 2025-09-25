import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MarcarPontoUserService } from '../../services/registrarponto.service';
import {
  getMesAtual,
  getDataHora,
  gerarMesesComValores,
  getNumberWeek,
  OrderbyMesDiaLastRegistro,
  PontoFoiMarcado,
  ValidaOperacaoMarcacao,
  VerificaBatidaPontoSemanaDia,
  AjustarNomeDiaSemana,
  formatarDataHora
}
  from "../../helpers/file.helpers";
import { RegistroUsuarioService } from '../../services/registrousersemana.service'
import { RegistroUsuarioMesService } from '../../services/registrousermes.service'
import { CommonModule } from '@angular/common';
import { MarcarPontoUser } from '../../models/marcarpontouser'
import { RegistroUsuario } from '../../models/registrousuario'
import { PdfService } from '../../services/gerarrelatorio.service'

@Component({
  selector: 'app-tela--principal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-principal-colaborador.html',
  styleUrls: ['./tela-principal-colaborador.css']
})

export class WorkingDayComponent {

  weekPoints: RegistroUsuario[] = []
  meses: { mes: string; valor: number }[] = []
  iduser: number | null = null
  getregistroatual: RegistroUsuario | null = null
  botaoDesabilitadoEntrada: boolean = false
  botaoDesabilitadoSaida: boolean = false
  selectMes: number = getMesAtual()


  constructor(
    private authService: AuthService,
    private ScorPoint: MarcarPontoUserService,
    private GetRegistroSemana: RegistroUsuarioService,
    private GetRegistroMes: RegistroUsuarioMesService,
    private router: Router,
    private gerarrelatorio: PdfService
  ) { }

  ngOnInit(): void {
    const dadosuser = JSON.parse(localStorage.getItem('user')!)
    this.iduser = dadosuser.iduser
    this.meses = gerarMesesComValores();
    this.AtualizarRegistroAtual()
  }

  getNomeDia(numeroDia: number): string {
    return AjustarNomeDiaSemana(numeroDia);
  }

  getOrganizaDataHora(data: string | null): string | null {
    return formatarDataHora(data)
  }

  registrarOperacao(operacao: 1 | 2) {

    const retorno = ValidaOperacaoMarcacao(operacao, this.botaoDesabilitadoEntrada, this.botaoDesabilitadoSaida)
    if (!retorno.valido) {
      alert(retorno.mensagem)
      return;
    }

    const payload: MarcarPontoUser = {
      iduser: this.iduser,
      operacao,
      idregistro: this.getregistroatual?.idregistro
    };

    this.ScorPoint.MarcarcaoPonto(payload).subscribe({
      next: data => {

        if (!this.getregistroatual) {
          this.AtualizarRegistroAtual()
          this.botaoDesabilitadoEntrada = true;
          this.getregistroatual = data.model
          return;
        }

        if (operacao == 2) {
          this.getregistroatual.registroSaida = getDataHora();
          this.botaoDesabilitadoSaida = true;
        }

      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleCurrentMonth() {

    this.GetRegistroMes.getRegistroUsuarioMes(this.selectMes, this.iduser).subscribe({
      next: data => {
        this.weekPoints = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  gerarRelatorio() {

    if (this.selectMes && this.weekPoints.length > 0) {
      const nomesmes = this.meses.find(m => m.valor === this.selectMes)?.mes
      this.gerarrelatorio.gerarRelatorio(this.weekPoints, nomesmes)
    } else {
      alert("Não contém dias marcados nesse mês!")
    }

  }

  selectMonth(event: Event) {
    const select = event.target as HTMLSelectElement;
    if (select && select.value) {
      this.GetRegistroMes.getRegistroUsuarioMes(parseInt(select.value), this.iduser).subscribe({
        next: data => {
          this.weekPoints = data;
          this.selectMes = parseInt(select.value)
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  BatidaPontoVindoBackend(RegistroUsuario: RegistroUsuario | null) {
    const ponto = PontoFoiMarcado(RegistroUsuario);
    this.botaoDesabilitadoEntrada = ponto.entrada;
    this.botaoDesabilitadoSaida = ponto.saida;
  }

  AtualizarRegistroAtual() {

    const numeroSemana = getNumberWeek()
    this.GetRegistroSemana.getRegistroUsuarioSemana(numeroSemana, this.iduser).subscribe((data) => {

      this.weekPoints = data
      if (!VerificaBatidaPontoSemanaDia(OrderbyMesDiaLastRegistro(data))) {
        this.getregistroatual = OrderbyMesDiaLastRegistro(data)
        this.BatidaPontoVindoBackend(this.getregistroatual)
      }

    })
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
