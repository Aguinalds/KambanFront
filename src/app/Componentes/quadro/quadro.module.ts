import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColunaComponent } from '../coluna/coluna.component';
import { CardComponent } from '../card/card.component';



@NgModule({
  declarations: [ColunaComponent, CardComponent],
  imports: [
    CommonModule
  ],
  exports: [ColunaComponent, CardComponent]
})
export class QuadroModule { }
