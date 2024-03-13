import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coluna } from '../Componentes/quadro/quadro.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private novaColunaSubject = new BehaviorSubject<boolean>(false);
  novaColuna$ = this.novaColunaSubject.asObservable();

  private colunasSource = new BehaviorSubject<Coluna[]>([]);
  colunas$ = this.colunasSource.asObservable();

  private nomeCardSubject = new BehaviorSubject<{ nome: string, colunaIndex: number }>({ nome: '', colunaIndex: -1 });
  novoCard$ = this.nomeCardSubject.asObservable();

  constructor() {}

  // Método para adicionar uma nova coluna
  adicionarNovaColuna(coluna: Coluna) {
    const colunas = this.colunasSource.getValue();
    colunas.push(coluna);
    this.colunasSource.next(colunas);
    this.novaColunaSubject.next(true);
  }

  // Método para enviar o nome de um card e o índice da coluna
  enviarNomeCard(nome: string, colunaIndex: number) {
    this.nomeCardSubject.next({ nome, colunaIndex });
  }

  // Método para atualizar as colunas
  atualizarColunas(colunas: Coluna[]) {
    this.colunasSource.next(colunas);
  }
}
