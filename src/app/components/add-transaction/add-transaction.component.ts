import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

  @Output() addTransaction = new EventEmitter<void>();

  transactionTypeOptions = [
    { key: 'expense', name: 'Expense' },
    { key: 'income', name: 'Income' },
  ];

  addTransactionForm = this.fb.group({
    amount: new FormControl<number | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    type: new FormControl<string>('expense', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSave(): void {
    const formValues = this.addTransactionForm.getRawValue();

    if (formValues.amount === null || formValues.description === null) {
      throw new Error(
        `amount or description is null, amount: ${formValues.amount}, description: ${formValues.description}`,
      );
    }

    const data: Omit<Transaction, 'id' | 'date'> = {
      amount: formValues.amount,
      description: formValues.description,
      type:
        formValues.type === 'expense'
          ? TransactionType.expense
          : TransactionType.income,
    };

    this.transactionService.addTransaction(data);

    this.addTransactionForm.reset();

    this.addTransaction.emit();
  }

  onKeyDownAmount(event: KeyboardEvent) {
    const specialKeys: string[] = [
      'Backspace',
      'Tab',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
      'Del',
      'Delete',
    ];

    // Allow special keys
    if (specialKeys.includes(event.key)) {
      return;
    }

    // Restrict all keys other than numbers
    if (!(event.key >= '0' && event.key <= '9')) {
      event.preventDefault();
    }
  }
}
