import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private modalService = inject(NgbModal);

  openAddTransactionModal(content: any): void {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  onTransactionAdd(): void {
    this.modalService.dismissAll();
  }
}
