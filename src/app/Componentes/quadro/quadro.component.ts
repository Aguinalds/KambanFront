import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';
import { ColunaService } from 'src/app/Service/Coluna.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss'],
})
export class QuadroComponent  implements OnInit {

  constructor(private sharedService: SharedService,private colunaService: ColunaService) { }

  ngOnInit() {
    this.sharedService.novaColuna$.subscribe(() => {
      this.adicionarNovaColuna();
    });
  }

  colunas: { nome: string }[] = [];

  adicionarNovaColuna() {
    const novaColunaNome = `Coluna ${this.colunaService.getColunas().length + 1}`;
    this.colunaService.adicionarColuna({ nome: novaColunaNome });
    this.colunas.push({ nome: novaColunaNome });
  }


}
