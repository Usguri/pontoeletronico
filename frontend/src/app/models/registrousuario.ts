export interface RegistroUsuario {
  idregistro: number;
  nome: string;
  matricula: number;
  nomedia: string;
  registroEntrada: string | null;
  registroSaida: string | null;
  dia: number;
  mes: number;
  numeroSemana: number;
  nome_mes: string;
}
