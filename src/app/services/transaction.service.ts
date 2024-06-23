import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '../models/transaction.model';
import { LocalStorageService } from './local-storage.service';
import { TRANSACTIONS_ARRAY_LOCAL_STORAGE_KEY } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  private localStorageService = inject(LocalStorageService);

  transactions$ = this.localStorageService.getItem<Transaction[]>(
    TRANSACTIONS_ARRAY_LOCAL_STORAGE_KEY,
  );

  addTransaction(transactionData: Omit<Transaction, 'id' | 'date'>): void {
    const transaction: Transaction = {
      ...transactionData,
      id: uuidv4(),
      date: new Date(Date.now()),
    };

    const newTransactions = [transaction, ...this.transactions$.value];

    this.localStorageService.setItem(
      TRANSACTIONS_ARRAY_LOCAL_STORAGE_KEY,
      newTransactions,
    );
  }

  editTransaction(
    transactionData: Omit<Transaction, 'id' | 'date'>,
    id: string,
  ): void {
    const txns = this.transactions$.value;
    const index = txns.findIndex((txn) => txn.id === id);
    const txn = txns[index];
    txns[index] = { ...txn, ...transactionData };

    this.localStorageService.setItem(
      TRANSACTIONS_ARRAY_LOCAL_STORAGE_KEY,
      txns,
    );
  }

  removeTransaction(id: string): void {
    const transactions = this.transactions$.value;

    const index = transactions.findIndex((txn) => txn.id === id);

    transactions.splice(index, 1);

    this.localStorageService.setItem(
      TRANSACTIONS_ARRAY_LOCAL_STORAGE_KEY,
      transactions,
    );
  }
}
