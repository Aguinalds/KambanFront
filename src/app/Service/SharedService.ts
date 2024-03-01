import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private novaColunaSubject = new BehaviorSubject<boolean>(false);
  novaColuna$ = this.novaColunaSubject.asObservable();

  private novoCardSubject = new BehaviorSubject<boolean>(false);
  novoCard$ = this.novoCardSubject.asObservable();

  adicionarNovaColuna() {
    this.novaColunaSubject.next(true);
  }

  adicionarNovoCard() {
    this.novoCardSubject.next(true);
  }
}
