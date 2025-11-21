import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CheckCircle2, Sparkles, ArrowRight } from 'lucide-angular';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-ready-notification',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ready-notification.component.html',
  styleUrls: ['./ready-notification.component.css']
})
export class ReadyNotificationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() reservation!: Reservation;
  @ViewChild('confettiCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  showConfetti = true;
  private animationId: number | null = null;
  private confettiPieces: any[] = [];
  
  readonly CheckCircle2 = CheckCircle2;
  readonly Sparkles = Sparkles;
  readonly ArrowRight = ArrowRight;

  ngOnInit(): void {
    setTimeout(() => {
      this.showConfetti = false;
    }, 5000);
  }

  ngAfterViewInit(): void {
    if (this.showConfetti) {
      this.initConfetti();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initConfetti(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Crear 500 piezas de confetti
    for (let i = 0; i < 500; i++) {
      this.confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 5 + 5,
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }

    this.animateConfetti(ctx, canvas);
  }

  private animateConfetti(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.confettiPieces.forEach(piece => {
      ctx.save();
      ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
      ctx.restore();

      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.rotation += piece.rotationSpeed;

      if (piece.y > canvas.height) {
        piece.y = -10;
        piece.x = Math.random() * canvas.width;
      }
    });

    if (this.showConfetti) {
      this.animationId = requestAnimationFrame(() => this.animateConfetti(ctx, canvas));
    }
  }

  getTypeName(): string {
    const types: any = {
      duo: '💙 Mesa Dúo',
      cuarteto: '💜 Mesa Cuarteto',
      grupal: '💗 Mesa Grupal'
    };
    return types[this.reservation.type] || '';
  }
}
