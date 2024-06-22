import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { TransactionType } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  private transactionService = inject(TransactionService);

  totalIncome$ = this.transactionService.transactions$.pipe(
    map((transactions) =>
      transactions.filter((txn) => txn.type === TransactionType.income),
    ),
    map((transactions) => transactions.map((txn) => txn.amount)),
    map((transactions) => transactions.reduce((acc, val) => acc + val, 0)),
  );

  totalExpense$ = this.transactionService.transactions$.pipe(
    map((transactions) =>
      transactions.filter((txn) => txn.type === TransactionType.expense),
    ),
    map((transactions) => transactions.map((txn) => txn.amount)),
    map((transactions) => transactions.reduce((acc, val) => acc + val, 0)),
  );
}
