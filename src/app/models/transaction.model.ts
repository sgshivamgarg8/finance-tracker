export interface Transaction {
  amount: number;
  description: string;
  type: TransactionType;
  date: string;
  id: string;
  category: string;
}

export enum TransactionType {
  expense = 'expense',
  income = 'income',
}
