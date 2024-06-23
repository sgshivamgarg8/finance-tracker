import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Observable, map } from 'rxjs';
import { TransactionType } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss'],
})
export class ExpenseChartComponent {
  private txnService = inject(TransactionService);
  private router = inject(Router);

  barChartData$: Observable<ChartConfiguration<'bar'>['data']> =
    this.txnService.transactions$.pipe(
      map((transactions) =>
        transactions.filter((txn) => txn.type === TransactionType.expense),
      ),
      map((txns) => {
        return Array.from(
          txns.reduce(
            (m, { date, amount }) => m.set(date, (m.get(date) || 0) + amount),
            new Map(),
          ),
          ([date, amount]) => ({ date: new Date(date).toDateString(), amount }),
        );
      }),
      map((txns: { date: string; amount: number }[]) => {
        const obj: ChartConfiguration<'bar'>['data'] = {
          datasets: [],
        };

        obj.labels = txns.map((txn) => txn.date);
        const data = txns.map((txn) => txn.amount);
        obj.datasets = [
          {
            data: data,
            label: 'Expense',
            hoverBackgroundColor: '#006bb7',
            barThickness: 20,
          },
        ];

        return obj;
      }),
    );

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    backgroundColor: '#006bb7',
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    indexAxis: 'y',
  };
}
