import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, QrCode, MapPin, Handshake } from 'lucide-angular';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-home-landing',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.css']
})
export class HomeLandingComponent {
  private reservationService = inject(ReservationService);

  readonly QrCode = QrCode;
  readonly MapPin = MapPin;
  readonly Handshake = Handshake;

  goScan(): void {
    this.reservationService.setStep('scan');
  }

  goExplore(): void {
    this.reservationService.setStep('explore');
  }

  goAlly(): void {
    this.reservationService.setStep('ally');
  }
}
