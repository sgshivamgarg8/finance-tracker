import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  private transactionService = inject(TransactionService);

  transactions$ = this.transactionService.transactions$.pipe(
    map((transactions) => {
      // Sort the transactions by date, latest at first
      return transactions.sort((a, b) => {
        if (a.date === b.date) {
          return 0;
        } else if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      });
    }),
  );

  identify(_: number, item: Transaction): string {
    return item.id;
  }
}
