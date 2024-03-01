import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {

  constructor(private sharedService: SharedService) { }

  onNovaTarefaClick() {
    this.sharedService.adicionarNovaColuna();
  }

  onNovoCardClick() {
    this.sharedService.adicionarNovoCard();
  }

  ngOnInit() {}

  

}
