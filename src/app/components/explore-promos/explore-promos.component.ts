import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star, QrCode, Heart } from 'lucide-angular';
import { ReservationService } from '../../services/reservation.service';

interface Promo {
  id: string;
  bar: string;
  titulo: string;
  tipo: 'descuento' | 'evento' | 'after' | '2x1';
  detalle: string;
  porcentaje?: number;
  hora?: string;
  destacado?: boolean;
}

@Component({
  selector: 'app-explore-promos',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './explore-promos.component.html',
  styleUrls: ['./explore-promos.component.css']
})
export class ExplorePromosComponent {
  private reservationService = inject(ReservationService);

  readonly Star = Star;
  readonly QrCode = QrCode;
  readonly Heart = Heart;

  categoria = signal<'todas' | 'descuento' | 'evento' | 'after' | '2x1'>('todas');

  promos: Promo[] = [
    { id: 'bar-azul-1', bar: 'BluePulse', titulo: '2x1 Shots Inicio de Noche', tipo: '2x1', detalle: 'Aplica hasta las 10:30 PM', hora: '21:00', destacado: true },
    { id: 'bar-azul-2', bar: 'BluePulse', titulo: 'After Oficial', tipo: 'after', detalle: 'Traslado directo + descuento cover', hora: '02:00' },
    { id: 'bar-rojo-1', bar: 'RedRoom', titulo: '15% en tu primera ronda', tipo: 'descuento', detalle: 'Solo mesas registradas', porcentaje: 15 },
    { id: 'bar-rojo-2', bar: 'RedRoom', titulo: 'DJ Invitado Internacional', tipo: 'evento', detalle: 'Line up sorpresa', hora: '23:30', destacado: true },
    { id: 'bar-pink-1', bar: 'PinkWave', titulo: 'After Glow Party', tipo: 'after', detalle: 'Pulseras fluorescentes incluidas', hora: '01:30' },
    { id: 'bar-green-1', bar: 'GreenBeat', titulo: '2x1 Cócteles Verdes', tipo: '2x1', detalle: 'Lista limitada', hora: '21:30' }
  ];

  favorites = computed(() => this.reservationService.favorites());

  filtered = computed(() => {
    const cat = this.categoria();
    if (cat === 'todas') return this.promos;
    return this.promos.filter(p => p.tipo === cat);
  });

  setCategoria(c: 'todas' | 'descuento' | 'evento' | 'after' | '2x1'): void {
    this.categoria.set(c);
  }

  toggleFav(bar: string): void {
    this.reservationService.toggleFavorite(bar);
  }

  irAlBar(promo: Promo): void {
    // Simular salto a escaneo QR directo
    this.reservationService.setStep('scan');
  }

  volverHome(): void {
    this.reservationService.setStep('home');
  }
}
