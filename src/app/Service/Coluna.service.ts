import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColunaService {
  private colunas: { nome: string }[] = [];

  constructor() {}

  private colunasSubject = new BehaviorSubject<{ nome: string }[]>([]);
  colunas$ = this.colunasSubject.asObservable();

  private nomeCardSubject = new BehaviorSubject<{ nome: string}>({ nome: ''});
  novoCard$ = this.nomeCardSubject.asObservable();

  private nomeColunaSubject = new BehaviorSubject<{ nome: string}>({ nome: ''});
  novaColuna$ = this.nomeColunaSubject.asObservable();

  setColunas(colunas: { nome: string }[]): void {
    this.colunasSubject.next(colunas);
  }

  adicionarColuna(nome: string ): any {
    this.nomeColunaSubject.next({nome});
  }
}
