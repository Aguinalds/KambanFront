import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss'],
})
export class ColunaComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.novoCard$.subscribe((nomeCard) => {
      this.adicionarNovoCard(nomeCard);
    });
  }

  card: { nome: string }[] = [];

  adicionarNovoCard(nome: string) {
    if (nome != '') { // Verifica se o nome não está vazio ou apenas contém espaços em branco
      this.card.push({ nome: nome });
    }
  }

  calcularAlturaColuna(): number {
    if (this.card.length <= 3) {
      return 800; // Altura padrão para um único cartão
    }
    const alturaCartao = 240;
    const margemExtra = 20;
    return (this.card.length * alturaCartao) + (this.card.length - 1) * margemExtra;
  }

}
