import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../Service/SharedService';
import { ColunaService } from 'src/app/Service/Coluna.service';
import { BehaviorSubject } from 'rxjs';

interface Card {
  id: number;
  nome: string;
  dragging: boolean;
  draggingWithinColumn: boolean;
}

interface Coluna {
  nome: string;
  cards: Card[];
}

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss'],
})
export class QuadroComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private colunaService: ColunaService
  ) {}

  colunas: Coluna[] = [];
  colunasVazias: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  draggingIndex: number = -1;
  draggingColumnIndex: number = -1;
  showDropIndicator: boolean = false;
  hoverIndex: number = -1;

  ngOnInit() {
    this.sharedService.novoCard$.subscribe((nomeCard) => {
      this.adicionarNovoCard(nomeCard);
    });

    // Inicia a verificação automática de colunas vazias
    this.verificarColunasVaziasPeriodicamente();
  }

  verificarColunasVaziasPeriodicamente() {
    setInterval(() => {
      this.verificarEAdicionarCardVazio();
    }, 50); // Verifica a cada 5 segundos. Você pode ajustar o intervalo conforme necessário.
  }

  verificarEAdicionarCardVazio() {
    for (let i = 0; i < this.colunas.length; i++) {
      const coluna = this.colunas[i];
      if (this.colunas[i].cards.length === 0) {
        // Se a coluna estiver completamente vazia, adiciona um card vazio
        this.adicionarCardVazio(i);
      }
      // Verifica se não existe um card vazio na coluna
      if (!this.existeCardVazio(i) && this.existeCard(i)) {
        this.adicionarCardVazio(i);
      } else if (this.existeCard(i)) {
        // Se existir um card real, remove todos os cards vazios
        this.removerCardVazio(i);
      }
    }
  }
  
  existeCard(colunaIndex: number): boolean {
    return this.colunas[colunaIndex].cards.some(card => card.id != -1);
  }


  existeCardVazio(colunaIndex: number): boolean {
    return this.colunas[colunaIndex].cards.some(card => card.id === -1);
  }

  removerTodosCardsVazios() {
    this.colunas.forEach((coluna) => {
      coluna.cards = coluna.cards.filter(card => card.id !== -1);
    });
  }

  adicionarNovaColuna() {
    const novaColunaNome = `Coluna ${this.colunaService.getColunas().length + 1}`;
    this.colunaService.adicionarColuna({ nome: novaColunaNome });

    const novoCardVazio = this.criarCardVazio();
    this.colunas.push({ nome: novaColunaNome, cards: [novoCardVazio] });

    this.atualizarColunasVazias();
  }

  onDragStart(event: DragEvent, index: number, colunaIndex: number) {
    event.dataTransfer?.setData('text/plain', index.toString());
    this.draggingIndex = index;
    this.draggingColumnIndex = colunaIndex;
    this.colunas[colunaIndex].cards[index].draggingWithinColumn = true;
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    const mouseY = event.clientY;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const offset = mouseY - rect.top;
    const threshold = rect.height / 2;

    if (this.colunas[index].cards.length === 0 || index === this.draggingColumnIndex) {
      this.hoverIndex = 0;
    } else {
      this.hoverIndex = offset < threshold ? index : index + 1;
    }
    this.showDropIndicator = true;
  }

  onDrop(event: DragEvent, droppedIndex: number, droppedColunaIndex: number) {
    event.preventDefault();
    this.removeEmptyCard(this.draggingColumnIndex);
    
    if (this.draggingIndex !== -1 && droppedIndex !== -1) {
      const draggedCard = this.colunas[this.draggingColumnIndex].cards.splice(this.draggingIndex, 1)[0];
      this.colunas[droppedColunaIndex].cards.splice(droppedIndex, 0, draggedCard);
      this.colunas[droppedColunaIndex].cards.forEach((card, index) => (card.draggingWithinColumn = index === droppedIndex));
    }

    this.draggingIndex = -1;
    this.draggingColumnIndex = -1;
    this.resetDragging();
    this.showDropIndicator = false;

    if (this.isColumnEmpty(this.draggingColumnIndex)) {
      this.addEmptyCard(this.draggingColumnIndex);
    }
  }

  adicionarCardVazio(colunaIndex: number) {
    if (this.colunas[colunaIndex].cards.length === 0) {
      const novoCardVazio = this.criarCardVazio();
      this.colunas[colunaIndex].cards.push(novoCardVazio);
    }
  }

  criarCardVazio(): Card {
    return {
      id: -1,
      nome: '',
      dragging: false,
      draggingWithinColumn: false,
    };
  }

  resetDragging() {
    this.colunas.forEach((coluna) => coluna.cards.forEach((card) => (card.dragging = false)));
  }

  adicionarNovoCard(nome: string) {
    let algumaColunaVazia = false;

    this.colunas.forEach((coluna) => {
      if (coluna.cards.length === 1 && coluna.cards[0].id === -1) {
        coluna.cards = [{ id: 1, nome, dragging: false, draggingWithinColumn: false }];
      } else {
        coluna.cards.push({ id: coluna.cards.length, nome, dragging: false, draggingWithinColumn: false });
      }

      if (this.verificarColunaVazia(coluna)) {
        algumaColunaVazia = true;
      }
    });

    if (!algumaColunaVazia) {
      this.atualizarColunasVazias();
    }
  }

  removerCardVazio(colunaIndex: number) {
    this.colunas[colunaIndex].cards = this.colunas[colunaIndex].cards.filter(card => card.id !== -1);
  }

  addEmptyCard(colunaIndex: number) {
    if (this.colunas[colunaIndex].cards.length === 0) {
      const novoCardVazio = this.criarCardVazio();
      this.colunas[colunaIndex].cards.push(novoCardVazio);
    }
  }

  removeEmptyCard(colunaIndex: number) {
    if (this.colunas[colunaIndex].cards.length === 1 && this.colunas[colunaIndex].cards[0].id === -1) {
      this.colunas[colunaIndex].cards.splice(0, 1);
    }
  }

  atualizarColunasVazias(): void {
    const algumaColunaVazia = this.colunas.some((coluna) => this.verificarColunaVazia(coluna));
    this.colunasVazias.next(algumaColunaVazia);
  }

  verificarColunaVazia(coluna: Coluna): boolean {
    return (coluna.cards.length === 0 || coluna.cards[0].id === -1);
  }

  calcularAlturaColuna(): number {
    let totalCards = this.colunas.reduce((total, coluna) => total + coluna.cards.length, 0);
    const alturaCartao = 240;
    const margemExtra = 35;
    return totalCards <= 3 ? 800 : totalCards * alturaCartao + (totalCards - 1) * margemExtra;
  }

  isColumnEmpty(colunaIndex: number): boolean {
    return this.colunas[colunaIndex].cards.length === 0 || this.colunas[colunaIndex].cards.every(card => card.id === -1);
  }
}
