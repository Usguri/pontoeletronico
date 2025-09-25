import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {AjustarNomeDiaSemana} from '../helpers/file.helpers'
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  gerarRelatorio(dados: any[], mes?: string) {

    const doc = new jsPDF();
    doc.text(`Relatório do mês: ${mes}`, 10, 10);

    autoTable(doc, {
      head: [['Nome', 'Matrícula', 'Dia', 'Mês', 'Semana', 'Entrada', 'Saída']],
      body: dados.map(d => [
        d.nome,
        d.matricula,
        AjustarNomeDiaSemana(d.dia),
        new Date(2025, d.mes  - 1, 1).toLocaleString('pt-BR', { month: 'long' }),
        d.numeroSemana,
        new Date(d.registroEntrada).toLocaleString('pt-BR').replace(',', ''),
        d.registroSaida ? new Date(d.registroSaida).toLocaleString('pt-BR').replace(',', '') : 'N/A'
      ])
    });

    doc.save(`relatorio-${mes}.pdf`);
  }
}
