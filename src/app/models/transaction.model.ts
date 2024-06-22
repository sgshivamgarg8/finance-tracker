export interface Transaction {
  amount: number;
  description: string;
  type: TransactionType;
  date: Date;
  id: string;
}

export enum TransactionType {
  expense = 'expense',
  income = 'income',
}
