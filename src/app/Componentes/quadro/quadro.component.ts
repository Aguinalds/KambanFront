import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss'],
})
export class QuadroComponent  implements OnInit {

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.novaColuna$.subscribe(() => {
      this.adicionarNovaColuna();
    });
  }

  colunas: { nome: string }[] = [];

  adicionarNovaColuna() {
    const novaColunaNome = `Coluna ${this.colunas.length + 1}`;
    this.colunas.push({ nome: novaColunaNome });
  }

}
