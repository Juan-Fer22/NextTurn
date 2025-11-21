import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Clock, TrendingUp, Sparkles, Coins } from 'lucide-angular';
import { DiceGameComponent } from '../dice-game/dice-game.component';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';

interface MotivationalMessage {
  threshold: number;
  message: string;
  icon: string;
}

const MOTIVATIONAL_MESSAGES: MotivationalMessage[] = [
  { threshold: 80, message: 'Ya casi llegas a la cima…', icon: '🎯' },
  { threshold: 60, message: 'El ritmo te acompaña, estás a un paso de entrar', icon: '🎵' },
  { threshold: 40, message: 'Siente la vibra, la noche te está esperando', icon: '✨' },
  { threshold: 20, message: 'La pista de baile te llama…', icon: '💃' },
  { threshold: 0, message: '¡Prepárate! Tu momento está por llegar', icon: '🔥' }
];

@Component({
  selector: 'app-waiting-room',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DiceGameComponent],
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
  @Input() reservation!: Reservation;
  
  private reservationService = inject(ReservationService);
  private timer: any;
  
  timeLeft = 0;
  totalTime = 0;
  
  readonly Clock = Clock;
  readonly TrendingUp = TrendingUp;
  readonly Sparkles = Sparkles;
  readonly Coins = Coins;

  ngOnInit(): void {
    this.totalTime = this.reservation.waitTime * 60;
    this.timeLeft = this.totalTime;
    
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        setTimeout(() => {
          this.reservationService.markReady();
        }, 500);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  get progress(): number {
    return ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
  }

  get minutes(): number {
    return Math.floor(this.timeLeft / 60);
  }

  get seconds(): number {
    return this.timeLeft % 60;
  }

  get currentMessage(): MotivationalMessage {
    return MOTIVATIONAL_MESSAGES.find(m => this.progress >= m.threshold) || MOTIVATIONAL_MESSAGES[0];
  }

  getCoinColor(): string {
    const baseColor = this.reservation.color;
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    const brightnessMultiplier = 0.3 + (this.progress / 100) * 0.7;

    const newR = Math.min(255, Math.floor(r * brightnessMultiplier));
    const newG = Math.min(255, Math.floor(g * brightnessMultiplier));
    const newB = Math.min(255, Math.floor(b * brightnessMultiplier));

    return `rgb(${newR}, ${newG}, ${newB})`;
  }

  getBackgroundColor(): string {
    const intensity = Math.floor(this.progress * 2.55);
    return `rgb(${intensity * 0.4}, ${intensity * 0.2}, ${intensity * 0.6})`;
  }

  getCoinStyles(): any {
    const color = this.getCoinColor();
    return {
      'background-color': color,
      'box-shadow': `0 0 ${20 + this.progress * 0.5}px ${color}, 0 0 ${40 + this.progress}px ${color}40`,
      'transform': `scale(${1 + this.progress * 0.003})`
    };
  }

  getCircleStrokeDashoffset(): number {
    return 2 * Math.PI * 60 * (1 - this.progress / 100);
  }

  getTypeName(): string {
    const types: any = {
      duo: 'Dúo',
      cuarteto: 'Cuarteto',
      grupal: 'Grupal'
    };
    return types[this.reservation.type] || '';
  }
}
