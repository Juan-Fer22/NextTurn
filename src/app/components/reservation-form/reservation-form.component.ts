import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Users, PartyPopper } from 'lucide-angular';
import { ReservationService } from '../../services/reservation.service';
import { Reservation, ReservationType, RESERVATION_TYPES } from '../../models/reservation.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  private reservationService = inject(ReservationService);
  
  name = '';
  people = 2;
  celebration = '';
  
  readonly Users = Users;
  readonly PartyPopper = PartyPopper;
  readonly RESERVATION_TYPES = RESERVATION_TYPES;

  get barCode(): string {
    return this.reservationService.barCode();
  }

  getReservationType(numPeople: number): ReservationType {
    if (numPeople <= 2) return 'duo';
    if (numPeople <= 4) return 'cuarteto';
    return 'grupal';
  }

  get currentType(): ReservationType {
    return this.getReservationType(this.people);
  }

  get currentTypeData() {
    return RESERVATION_TYPES[this.currentType];
  }

  incrementPeople(): void {
    this.people++;
  }

  decrementPeople(): void {
    if (this.people > 1) {
      this.people--;
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.name) return;

    const type = this.getReservationType(this.people);
    const typeData = RESERVATION_TYPES[type];

    const reservation: Reservation = {
      name: this.name,
      people: this.people,
      celebration: this.celebration,
      type,
      color: typeData.color,
      waitTime: typeData.waitTime,
      diceRolls: this.people
    };

    this.reservationService.setReservation(reservation);
  }
}
