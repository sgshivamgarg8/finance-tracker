import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private router = inject(Router);

  private modalService = inject(NgbModal);

  openAddTransactionModal(content: unknown): void {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  onTransactionSave(): void {
    this.modalService.dismissAll();
  }

  navigateToCharts() {
    this.router.navigate(['charts']);
  }
}
