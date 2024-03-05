import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private novaColunaSubject = new BehaviorSubject<boolean>(false);
  novaColuna$ = this.novaColunaSubject.asObservable();

  private nomeCardSubject = new BehaviorSubject<string>('');
  novoCard$ = this.nomeCardSubject.asObservable();



  adicionarNovaColuna() {
    this.novaColunaSubject.next(true);
  }

  enviarNomeCard(nome: string) {
    this.nomeCardSubject.next(nome);
  }
}
