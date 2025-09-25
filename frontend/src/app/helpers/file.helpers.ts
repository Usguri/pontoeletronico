import { RegistroUsuario } from '../models/registrousuario'

export interface MesValor {
  mes: string;
  valor: number;
}

export function gerarMesesComValores(): MesValor[] {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho', 'Agosto',
    'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const mesesComValores: MesValor[] = meses.map((mes, index) => {
    return {
      mes,
      valor: index + 1
    };
  });

  return mesesComValores;
}

export function getMesAtual(): number {
  const data = new Date();
  return data.getMonth() + 1;
}

export function getDataHora(): string {
  const data = new Date();
  return data.toISOString();
}

export function getDayInNumber(): number {
  const hoje = new Date();
  return hoje.getDay();
}

export function getNumberWeek(): number {
  const date = new Date();
  const data = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const diaSemana = data.getUTCDay() || 7;
  data.setUTCDate(data.getUTCDate() + 4 - diaSemana);
  const inicioAno = new Date(Date.UTC(data.getUTCFullYear(), 0, 1));
  const numeroSemana = Math.ceil((((data.getTime() - inicioAno.getTime()) / 86400000) + 1) / 7);
  return numeroSemana;
}

export function OrderbyMesDiaLastRegistro(dados: any[]): any | null {

  if (!dados) {
    return []
  }

  const dadosOrdenados = dados.sort((a, b) => {
    if (a.mes !== b.mes) {
      return a.mes - b.mes;
    }
    return a.dia - b.dia;
  })
  return dadosOrdenados[dadosOrdenados.length - 1]
}

export function PontoFoiMarcado(ultimoRegistro?: RegistroUsuario | null): { entrada: boolean; saida: boolean } {
  if (!ultimoRegistro) {
    return { entrada: false, saida: false };
  }

  return {
    entrada: Boolean(ultimoRegistro.registroEntrada),
    saida: Boolean(ultimoRegistro.registroSaida)
  };
}

export function ValidaOperacaoMarcacao(opc: number, entrada: boolean, saida: boolean): { valido: boolean; mensagem?: string } {

  if (entrada && saida) {
    return { valido: false, mensagem: "As batidas de ponto já foram registradas." };
  }
  if (opc == 1 && entrada) {
    return { valido: false, mensagem: "A batida de ponto de entrada já foi registrada." };
  }
  if (opc == 2 && saida) {
    return { valido: false, mensagem: "A batida de ponto de saída já foi registrada." };
  }
  if (opc == 2 && !entrada) {
    return { valido: false, mensagem: "Não é possível registrar saída antes da entrada." };
  }

  return { valido: true };

}

export function VerificaBatidaPontoSemanaDia(Registro?: RegistroUsuario | null): boolean {
  if (!Registro) return false;

  const getdiahj = getDayInNumber()
  const getweek = getNumberWeek()


  if (getweek > Registro.numeroSemana) {
    return true
  } else if (getweek == Registro.numeroSemana && getdiahj > Registro.dia) {
    return true
  }
  return false
}

export function formatarDataHora(data: string | null): string | null {
  if (!data) {
    return null;
  }

  const dataObj = new Date(data);

  return dataObj.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(',', '');
}

export function AjustarNomeDiaSemana(numeroDia: number): string {
  const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return dias[numeroDia] || 'Dia inválido';
}
