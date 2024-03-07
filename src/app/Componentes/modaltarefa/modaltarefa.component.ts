import { Component, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ColunaService } from 'src/app/Service/Coluna.service';
import { SharedService } from 'src/app/Service/SharedService';

@Component({
  selector: 'app-modaltarefa',
  templateUrl: './modaltarefa.component.html',
  styleUrls: ['./modaltarefa.component.scss'],
})
export class ModaltarefaComponent {

  
  constructor(private sharedService: SharedService, private colunaService: ColunaService) {}

  @ViewChild(IonModal) modal!: IonModal;

  name: string = '';

  colunas: { nome: string }[] = []; // Definindo a propriedade colunas

  ngOnInit() {
    this.colunas = this.colunaService.getColunas(); // Obtendo as colunas do serviço
  }
  

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.sharedService.enviarNomeCard(this.name);
  }

}
