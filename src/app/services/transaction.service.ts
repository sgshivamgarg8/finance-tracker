import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Transaction, TransactionType } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  getTransactions(): Observable<Transaction[]> {
    const transactions: Transaction[] = [
      {
        id: 1,
        amount: 10.99,
        date: new Date('08/22/2024'),
        description: 'Milk',
        type: TransactionType.expense,
      },
      {
        id: 2,
        amount: 30000,
        date: new Date('06/01/2023'),
        description: 'Rent',
        type: TransactionType.expense,
      },
      {
        id: 3,
        amount: 1500,
        date: new Date('06/05/2022'),
        description: 'Groceries',
        type: TransactionType.expense,
      },
      {
        id: 4,
        amount: 4500,
        date: new Date('06/01/2024'),
        description: 'Shopping',
        type: TransactionType.expense,
      },
      {
        id: 5,
        amount: 15000,
        date: new Date('06/01/2024'),
        description: 'Ads',
        type: TransactionType.income,
      },
      {
        id: 6,
        amount: 89000,
        date: new Date('05/30/2024'),
        description: 'Salary',
        type: TransactionType.income,
      },
    ];

    return of(transactions).pipe(
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
      })
    );
  }
}
