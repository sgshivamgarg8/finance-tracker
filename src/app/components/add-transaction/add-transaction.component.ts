import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Transaction, TransactionType } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  transactionTypeOptions = [
    { key: 'expense', name: 'Expense' },
    { key: 'income', name: 'Income' },
  ];

  addTransactionForm = this.fb.group({
    amount: new FormControl<number>(0, { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    type: new FormControl<string>('expense', { nonNullable: true }),
  });

  onSave(): void {
    const formValues = this.addTransactionForm.getRawValue();

    const data: Omit<Transaction, 'id' | 'date'> = {
      amount: formValues.amount,
      description: formValues.description,
      type:
        formValues.type === 'expense'
          ? TransactionType.expense
          : TransactionType.income,
    };

    this.transactionService.addTransaction(data);
  }
}
