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

    const newTxns = [...this.transactions$.value, transaction];

    this.localStorageService.setItem(
      TRANSACTIONS_ARRAY_LOCAL_STORAGE_KEY,
      newTxns,
    );
  }
}
