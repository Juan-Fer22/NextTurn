import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { ReadyNotificationComponent } from './components/ready-notification/ready-notification.component';
import { HomeLandingComponent } from './components/home-landing/home-landing.component';
import { ExplorePromosComponent } from './components/explore-promos/explore-promos.component';
import { AllySignupComponent } from './components/ally-signup/ally-signup.component';
import { ReservationService } from './services/reservation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    QrScannerComponent,
    ReservationFormComponent,
    WaitingRoomComponent,
    ReadyNotificationComponent,
    HomeLandingComponent,
    ExplorePromosComponent,
    AllySignupComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private reservationService = inject(ReservationService);
  
  step = computed(() => this.reservationService.step());
  reservation = computed(() => this.reservationService.reservation());
}
