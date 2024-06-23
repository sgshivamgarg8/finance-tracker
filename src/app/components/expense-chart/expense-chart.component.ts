import { Component, inject } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { map } from 'rxjs';
import { TransactionType } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent {
  private txnService = inject(TransactionService);

  txnDataByDate$ = this.txnService.transactions$.pipe(
    map((transactions) =>
      transactions.filter((txn) => txn.type === TransactionType.expense),
    ),
    map((txns) => {
      return Array.from(
        txns.reduce(
          (m, { date, amount }) => m.set(date, (m.get(date) || 0) + amount),
          new Map(),
        ),
        ([date, amount]) => ({ date, amount }),
      );
    }),
    map((txns) => {
      console.log(txns);
    }),
  );

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Expense' }],
  };
}
