import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SharedService } from 'src/app/Service/SharedService';

@Component({
  selector: 'app-modaltarefa',
  templateUrl: './modaltarefa.component.html',
  styleUrls: ['./modaltarefa.component.scss'],
})
export class ModaltarefaComponent {

  
  constructor(private sharedService: SharedService) {}

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';

  ngOnInit() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.sharedService.enviarNomeCard(this.name);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
