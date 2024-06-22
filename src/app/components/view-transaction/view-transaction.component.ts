import { Component, Input, inject } from '@angular/core';
import { Transaction, TransactionType } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss'],
})
export class ViewTransactionComponent {
  @Input({ required: true }) transaction!: Transaction;

  private transactionService = inject(TransactionService);

  eTransactionType = TransactionType;

  deleteIcon = faTrash;

  remove(id: string): void {
    this.transactionService.removeTransaction(id);
  }
}
