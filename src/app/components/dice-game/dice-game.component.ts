import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Dices, Gift, X } from 'lucide-angular';

interface Prize {
  face: number;
  prize: string;
  won: boolean;
}

const PRIZES: Prize[] = [
  { face: 1, prize: '🍹 2x1 en Shots', won: true },
  { face: 2, prize: '❌ Sigue intentando', won: false },
  { face: 3, prize: '🍾 Botella Gratis', won: true },
  { face: 4, prize: '🎫 Entrada VIP próxima vez', won: true },
  { face: 5, prize: '❌ Casi...', won: false },
  { face: 6, prize: '🎉 Shot de la Casa', won: true }
];

@Component({
  selector: 'app-dice-game',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.css']
})
export class DiceGameComponent {
  @Input() maxRolls = 0;
  
  rollsLeft = 0;
  isRolling = false;
  currentFace: number | null = null;
  prizes: Prize[] = [];
  
  readonly Dices = Dices;
  readonly Gift = Gift;
  readonly X = X;

  ngOnInit(): void {
    this.rollsLeft = this.maxRolls;
  }

  rollDice(): void {
    if (this.rollsLeft <= 0 || this.isRolling) return;

    this.isRolling = true;
    this.currentFace = null;

    // Animación de dado girando
    let count = 0;
    const interval = setInterval(() => {
      this.currentFace = Math.floor(Math.random() * 6) + 1;
      count++;
      if (count > 10) {
        clearInterval(interval);
        const finalFace = Math.floor(Math.random() * 6) + 1;
        this.currentFace = finalFace;
        const prize = PRIZES[finalFace - 1];
        this.prizes = [...this.prizes, prize];
        this.rollsLeft--;
        this.isRolling = false;
      }
    }, 100);
  }
}
