import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, TransactionType } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  transactions: Transaction[] = [];

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
