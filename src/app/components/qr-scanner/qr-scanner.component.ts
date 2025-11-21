import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, QrCode, Scan } from 'lucide-angular';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent {
  private reservationService = inject(ReservationService);
  
  isScanning = false;
  readonly QrCode = QrCode;
  readonly Scan = Scan;

  handleSimulateScan(): void {
    this.isScanning = true;
    // Simular escaneo para el MVP
    setTimeout(() => {
      this.reservationService.setBarCode('BAR-001-DEMO');
      this.isScanning = false;
    }, 1500);
  }
}
