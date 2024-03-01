import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { QuadroModule } from '../quadro/quadro.module';
import { QuadroComponent } from '../quadro/quadro.component';


@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, 
    QuadroModule
  ],
  declarations: [HomePage, NavbarComponent, QuadroComponent]
})
export class HomePageModule {}
