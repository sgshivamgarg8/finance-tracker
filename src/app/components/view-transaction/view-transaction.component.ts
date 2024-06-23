import { Component, Input, inject } from '@angular/core';
import { Transaction, TransactionType } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import {
  faTrash,
  faEdit,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss'],
})
export class ViewTransactionComponent {
  @Input({ required: true }) transaction!: Transaction;
  private modalService = inject(NgbModal);

  private transactionService = inject(TransactionService);

  eTransactionType = TransactionType;

  deleteIcon = faTrash;
  editIcon = faEdit;

  onDeleteClick(id: string): void {
    this.transactionService.removeTransaction(id);
  }

  /** open form modal on edit click */
  onEditClick(content: any): void {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  onTransactionSave(): void {
    this.modalService.dismissAll();
  }

  getCategory(key: string): {
    key: string;
    name: string;
    icon: IconDefinition;
  } {
    const option = this.transactionService.categoryOptions.find(
      (option) => option.key === key,
    );

    if (option === null || option === undefined) {
      throw new Error(`option not found with key, ${key}`);
    }

    return option;
  }
}
