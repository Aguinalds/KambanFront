import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';
import { ColunaService } from 'src/app/Service/Coluna.service';

@Component({
  selector: 'app-coluna',
  templateUrl: './coluna.component.html',
  styleUrls: ['./coluna.component.scss'],
})
export class ColunaComponent implements OnInit {
  constructor(private sharedService: SharedService, private colunaService: ColunaService) { }

  colunas: { nome: string }[] = []; // Definindo a propriedade colunas

  @Input() cards: {id: number, nome: string, dragging: boolean }[] = []; // Adicionando a propriedade cards

  draggedCardIndex: number = -1; // Índice do cartão arrastado

  draggingIndex: number = -1; // Índice do card sendo arrastado

  showDropIndicator: boolean = false;

  hoverIndex: number = -1;

  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer?.setData('text/plain', index.toString());
    this.draggingIndex = index;
    this.cards[index].dragging = true; // Alterando para cards
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
      const draggedCard = this.cards[this.draggingIndex]; // Alterando para cards
      this.cards.splice(this.draggingIndex, 1); // Alterando para cards
      this.cards.splice(droppedIndex, 0, draggedCard); // Alterando para cards
    }
    this.draggingIndex = -1;
    this.resetDragging();
    this.showDropIndicator = false;
  }
  
  resetDragging() {
    this.cards.forEach(item => item.dragging = false); // Alterando para cards
  }
  
  ngOnInit() {
    this.sharedService.novoCard$.subscribe((nomeCard) => {
      this.adicionarNovoCard(nomeCard);
    });
    this.colunas = this.colunaService.getColunas();
  }

  adicionarNovoCard(nome: string) {
    this.cards = [ // Alterando para cards
      {id: 0, nome: 'Card 1', dragging: false },
      {id: 1, nome: 'Card 2', dragging: false },
      {id: 2, nome: 'Card 3', dragging: false }
    ];
  }

  calcularAlturaColuna(): number {
    if (this.cards.length <= 3) { // Alterando para cards
      return 800;
    }
    const alturaCartao = 240;
    const margemExtra = 35;
    return (this.cards.length * alturaCartao) + (this.cards.length - 1) * margemExtra; // Alterando para cards
  }
}
