export interface Transaction {
    amount: number;
    description: string;
    type: TransactionType;
    date: Date;
    id: number;
}

export enum TransactionType {
    expense,
    income
}