import { Injectable, signal, computed } from '@angular/core';
import { Reservation } from '../models/reservation.model';

// Extensión del flujo de la aplicación incluyendo pantallas previas (landing, explorar, aliados)
export type AppStep = 'home' | 'explore' | 'ally' | 'scan' | 'form' | 'waiting' | 'ready';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  // Paso inicial ahora es 'home' para mostrar landing
  private stepSignal = signal<AppStep>('home');
  private reservationSignal = signal<Reservation | null>(null);
  private barCodeSignal = signal<string>('');
  // Favoritos (ids/nombres de bares marcados por el usuario en explorar)
  private favoritesSignal = signal<string[]>([]);
  // Solicitudes de aliados (simple almacenamiento local de formularios enviados)
  private allyRequestsSignal = signal<{ nombre: string; bar: string; contacto: string; fecha: Date }[]>([]);

  // Computed signals (read-only)
  step = computed(() => this.stepSignal());
  reservation = computed(() => this.reservationSignal());
  barCode = computed(() => this.barCodeSignal());
  favorites = computed(() => this.favoritesSignal());
  allyRequests = computed(() => this.allyRequestsSignal());

  setStep(step: AppStep): void {
    this.stepSignal.set(step);
  }

  setBarCode(code: string): void {
    this.barCodeSignal.set(code);
    this.setStep('form');
  }

  setReservation(reservation: Reservation): void {
    this.reservationSignal.set(reservation);
    this.setStep('waiting');
  }

  markReady(): void {
    this.setStep('ready');
  }

  // Favoritos
  toggleFavorite(bar: string): void {
    const current = this.favoritesSignal();
    if (current.includes(bar)) {
      this.favoritesSignal.set(current.filter(b => b !== bar));
    } else {
      this.favoritesSignal.set([...current, bar]);
    }
  }

  // Registrar solicitud de aliado (solo local, sin backend)
  registerAllyRequest(data: { nombre: string; bar: string; contacto: string }): void {
    const list = this.allyRequestsSignal();
    this.allyRequestsSignal.set([...list, { ...data, fecha: new Date() }]);
  }

  reset(): void {
    this.stepSignal.set('home');
    this.reservationSignal.set(null);
    this.barCodeSignal.set('');
    this.favoritesSignal.set([]);
  }
}
