import { Component, Input } from '@angular/core';
import { Transaction, TransactionType } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.scss']
})
export class ViewTransactionComponent {
  @Input({required: true}) transaction!: Transaction;

  eTransactionType = TransactionType;
}
