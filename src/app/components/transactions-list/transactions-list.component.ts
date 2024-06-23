import { Component, inject } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  private transactionService = inject(TransactionService);

  transactions$ = this.transactionService.transactions$;

  identify(_: number, item: Transaction): string {
    return item.id;
  }
}
