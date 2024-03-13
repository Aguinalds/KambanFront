import { Component, Input, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ColunaService } from 'src/app/Service/Coluna.service';
import { SharedService } from 'src/app/Service/SharedService';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modaltarefa',
  templateUrl: './modaltarefa.component.html',
  styleUrls: ['./modaltarefa.component.scss'],
})
export class ModaltarefaComponent {
  constructor(
    private sharedService: SharedService,
    private colunaService: ColunaService,
    private toastController: ToastController
  ) {}

  @ViewChild(IonModal) modal!: IonModal;

  novaColuna: boolean = false;
  name: string = '';
  selectedColumn: any; // Alteração: Variável para armazenar a coluna selecionada
  novaColunaNome: string = ''; // Alteração: Variável para armazenar o nome da nova coluna
  colunas: { nome: string }[] = [];
  errorMessage: string = '';
  newColumnIndex: string = '';


  resetValues() {
    this.name = '';
    this.selectedColumn = null;
    this.novaColunaNome = '';
    this.novaColuna = false;
    this.errorMessage = '';
  }

  ngOnInit() {
    // Inscreva-se para receber as colunas atualizadas do SharedService
    this.sharedService.colunas$.subscribe((colunas) => {
      this.colunas = colunas;
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.novaColunaNome.trim() !== '' && this.name === '') {
      this.colunaService.adicionarColuna(this.novaColunaNome);
      this.resetValues();
      this.modal.dismiss(this.name, 'confirm');
    }else if (this.novaColunaNome.trim() !== '' && this.name !== '') {
      this.colunaService.adicionarColuna(this.novaColunaNome);
      const selectedColumnIndex = this.colunas.findIndex(
        (coluna) => coluna.nome === this.novaColunaNome
      );
      this.sharedService.enviarNomeCard(this.name, selectedColumnIndex);
      this.resetValues();
      this.modal.dismiss(this.name, 'confirm');
    }
     else if (this.selectedColumn) {
      const selectedColumnIndex = this.colunas.findIndex(
        (coluna) => coluna.nome === this.selectedColumn.nome
      );
      this.sharedService.enviarNomeCard(this.name, selectedColumnIndex);
      this.resetValues();
      this.modal.dismiss(this.name, 'confirm');
    } else {
      this.exibirToastErro(
        'Por favor, certifique-se de selecionar todos os campos. Se não houver uma coluna adequada, crie uma nova!'
      );
    }
  }
  // Função para exibir um toast com a mensagem de erro
  async exibirToastErro(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 5000, // Duração do toast em milissegundos
      color: 'danger', // Cor do toast
      position: 'top', // Posição do toast na tela
    });
    toast.present();
  }

  criarNovaColuna() {
    this.novaColuna = true;
  }
}
