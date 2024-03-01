import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';


@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss'],
})
export class ColunaComponent  implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.novoCard$.subscribe(() => {
      this.adicionarNovoCard();
    });
  }

  card: { nome: string }[] = [];

  adicionarNovoCard() {
    const novoCard = `Card ${this.card.length + 1}`;
    this.card.push({ nome: novoCard });
  }

  calcularAlturaColuna(): number {
    if (this.card.length <= 3 ) {
      return 800; // Altura padrão para um único cartão
    }
    const alturaCartao = 240; 
    const margemExtra = 20; 
    return (this.card.length * alturaCartao) + (this.card.length - 1) * margemExtra;
  }

}
