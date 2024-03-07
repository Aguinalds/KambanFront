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

  @Input() card: {id: number, nome: string, dragging: boolean }[] = []; // Adicionando a propriedade dragging

  draggedCardIndex: number = -1; // Índice do cartão arrastado

  draggingIndex: number = -1; // Índice do card sendo arrastado

  showDropIndicator: boolean = false;

  hoverIndex: number = -1;


  
  onDragStart(event: DragEvent, index: number) {
    event.dataTransfer?.setData('text/plain', index.toString()); // Passa o índice do cartão sendo arrastado
    this.draggingIndex = index; // Salva o índice do cartão sendo arrastado
    this.card[index].dragging = true; // Define a propriedade dragging para true quando o cartão está sendo arrastado
  }
  
  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const mouseY = event.clientY;
    const rect = target.getBoundingClientRect();
    const offset = mouseY - rect.top;
    const threshold = rect.height / 2; // Threshold para determinar se o mouse está na metade superior ou inferior do card
  
    // Calcular o índice do card com base na posição do mouse
    if (offset < threshold) {
      this.hoverIndex = index; // Mouse está na metade superior do card
    } else {
      this.hoverIndex = index + 1; // Mouse está na metade inferior do card
    }
  
    // Atualize a variável showDropIndicator
    this.showDropIndicator = true;
  }
  
  
  
  
  
  onDrop(event: DragEvent, droppedIndex: number) {
    event.preventDefault();
    if (this.draggingIndex !== -1 && droppedIndex !== -1) {
      const draggedCard = this.card[this.draggingIndex];
      this.card.splice(this.draggingIndex, 1);
      this.card.splice(droppedIndex, 0, draggedCard);
    }
    this.draggingIndex = -1;
    this.resetDragging();
    this.showDropIndicator = false; // Limpa a linha indicadora após o drop
  }
  
  
  resetDragging() {
    // Reseta a propriedade dragging para false em todos os cartões
    this.card.forEach(item => item.dragging = false);
  }
  
  

  ngOnInit() {
    this.sharedService.novoCard$.subscribe((nomeCard) => {
      this.adicionarNovoCard(nomeCard);
    });
    this.colunas = this.colunaService.getColunas(); // Obtendo as colunas do serviço
  }

  adicionarNovoCard(nome: string) {
    this.card = [
      {id: 0, nome: 'Card 1', dragging: false },
      {id: 1, nome: 'Card 2', dragging: false },
      {id: 2, nome: 'Card 3', dragging: false }
    ];
  }

  calcularAlturaColuna(): number {
    if (this.card.length <= 3) {
      return 800; // Altura padrão para um único cartão
    }
    const alturaCartao = 240;
    const margemExtra = 35;
    return (this.card.length * alturaCartao) + (this.card.length - 1) * margemExtra;
  }
}
