import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, TransactionType } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  transactions: Transaction[] = [
    {
      id: uuidv4(),
      amount: 10.99,
      date: new Date('08/22/2023'),
      description: 'Milk',
      type: TransactionType.expense,
    },
    {
      id: uuidv4(),
      amount: 30000,
      date: new Date('06/01/2023'),
      description: 'Rent',
      type: TransactionType.expense,
    },
    {
      id: uuidv4(),
      amount: 1500,
      date: new Date('06/05/2022'),
      description: 'Groceries',
      type: TransactionType.expense,
    },
    {
      id: uuidv4(),
      amount: 4500,
      date: new Date('06/01/2024'),
      description: 'Shopping',
      type: TransactionType.expense,
    },
    {
      id: uuidv4(),
      amount: 15000,
      date: new Date('06/01/2024'),
      description: 'Ads',
      type: TransactionType.income,
    },
    {
      id: uuidv4(),
      amount: 89000,
      date: new Date('05/30/2024'),
      description: 'Salary',
      type: TransactionType.income,
    },
  ];

  transactions$ = new BehaviorSubject<Transaction[]>(this.transactions);

  addTransaction(transactionData: Omit<Transaction, 'id' | 'date'>): void {
    const transaction: Transaction = {
      ...transactionData,
      id: uuidv4(),
      date: new Date(Date.now()),
    };

    const newTxns = [...this.transactions$.value, transaction];

    this.transactions$.next(newTxns);
  }
}
