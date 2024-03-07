import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColunaService {
  private colunas: { nome: string }[] = [];

  constructor() {}

  getColunas(): { nome: string }[] {
    return this.colunas;
  }

  adicionarColuna(coluna: { nome: string }): void {
    this.colunas.push(coluna);
  }
}
