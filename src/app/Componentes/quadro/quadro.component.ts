import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';
import { ColunaService } from 'src/app/Service/Coluna.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss'],
})
export class QuadroComponent implements OnInit {

  constructor(private sharedService: SharedService, private colunaService: ColunaService) { }

  ngOnInit() {
    this.sharedService.novaColuna$.subscribe(() => {
      this.adicionarNovaColuna();
    });
    this.sharedService.novoCard$.subscribe((nomeCard) => {
      this.adicionarNovoCard(nomeCard);
    });

  }

  colunas: { nome: string, cards: { id: number, nome: string, dragging: boolean }[] }[] = [];

  adicionarNovaColuna() {
    const novaColunaNome = `Coluna ${this.colunaService.getColunas().length + 1}`;
    this.colunaService.adicionarColuna({ nome: novaColunaNome });
    this.colunas.push({ nome: novaColunaNome, cards: [] });
  }
  

  draggedCardIndex: number = -1; // Índice do cartão arrastado

  draggingIndex: number = -1; // Índice do card sendo arrastado

  showDropIndicator: boolean = false;

  hoverIndex: number = -1;

  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer?.setData('text/plain', index.toString());
    this.draggingIndex = index;
    this.colunas[index].cards[this.draggingIndex].dragging = true;
  }
  
  
  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const mouseY = event.clientY;
    const rect = target.getBoundingClientRect();
    const offset = mouseY - rect.top;
    const threshold = rect.height / 2;

    if (offset < threshold) {
      this.hoverIndex = index;
    } else {
      this.hoverIndex = index + 1;
    }

    this.showDropIndicator = true;
  }
  
  onDrop(event: DragEvent, droppedIndex: number) {
    event.preventDefault();
    if (this.draggingIndex !== -1 && droppedIndex !== -1) {
      const draggedCard = this.colunas[this.draggingIndex].cards[this.draggingIndex];
      this.colunas[this.draggingIndex].cards.splice(this.draggingIndex, 1);
      this.colunas[droppedIndex].cards.splice(droppedIndex, 0, draggedCard);
    }
    this.draggingIndex = -1;
    this.resetDragging();
    this.showDropIndicator = false;
  }
  
  
  
  resetDragging() {
    this.colunas.forEach(coluna => coluna.cards.forEach(card => card.dragging = false));
  }  
  
  
  adicionarNovoCard(nome: string) {
    this.colunas.forEach(coluna => coluna.cards = [ // Ajuste
      {id: 0, nome: 'Card 1', dragging: false },
      {id: 1, nome: 'Card 2', dragging: false },
      {id: 2, nome: 'Card 3', dragging: false }
    ]);
  }
  

  calcularAlturaColuna(): number {
    let totalCards = 0;
    this.colunas.forEach(coluna => {
      totalCards += coluna.cards.length;
    });
  
    if (totalCards <= 3) {
      return 800;
    }
  
    const alturaCartao = 240;
    const margemExtra = 35;
    return (totalCards * alturaCartao) + (totalCards - 1) * margemExtra;
  }
  
}
