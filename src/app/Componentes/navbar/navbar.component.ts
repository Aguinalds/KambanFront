import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';
import { ModalController, NavController } from '@ionic/angular';
import { ModaltarefaComponent } from '../modaltarefa/modaltarefa.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(private sharedService: SharedService, private modalController: ModalController) { }

  onNovaTarefaClick() {
    this.sharedService.adicionarNovaColuna();
  }

  onNovoCardClick() {
    this.sharedService.adicionarNovoCard();
  }

  

  ngOnInit() {}

  

}
