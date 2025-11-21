import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Handshake, Send, ArrowLeft } from 'lucide-angular';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-ally-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './ally-signup.component.html',
  styleUrls: ['./ally-signup.component.css']
})
export class AllySignupComponent {
  private reservationService = inject(ReservationService);

  readonly Handshake = Handshake;
  readonly Send = Send;
  readonly ArrowLeft = ArrowLeft;

  nombre = '';
  bar = '';
  contacto = '';
  enviado = false;

  enviar(): void {
    if (!this.nombre || !this.bar || !this.contacto) return;
    this.reservationService.registerAllyRequest({ nombre: this.nombre, bar: this.bar, contacto: this.contacto });
    this.enviado = true;
    setTimeout(() => this.reservationService.setStep('home'), 1200);
  }

  volver(): void {
    this.reservationService.setStep('home');
  }
}
