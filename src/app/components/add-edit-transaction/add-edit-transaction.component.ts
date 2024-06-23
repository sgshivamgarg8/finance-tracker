import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DateObj } from 'src/app/models/date.model';
import { Transaction, TransactionType } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { AppDate } from 'src/app/utils/date.class';

type TransactionForm = {
  amount: FormControl<string | null>;
  description: FormControl<string | null>;
  type: FormControl<string>;
  category: FormControl<string>;
  date: FormControl<DateObj>;
};

@Component({
  selector: 'app-add-edit-transaction',
  templateUrl: './add-edit-transaction.component.html',
  styleUrls: ['./add-edit-transaction.component.scss'],
})
export class AddEditTransactionComponent implements OnInit {
  private fb = inject(FormBuilder);
  public transactionService = inject(TransactionService);

  /** To be passed to edit the txn */
  @Input() isEdit = false;

  /** Must be passed if edit mode is true */
  @Input() id?: string;

  /** Emit the event on txn save */
  @Output() save = new EventEmitter<void>();

  transactionTypeOptions = [
    { key: 'expense', name: 'Expense' },
    { key: 'income', name: 'Income' },
  ];

  addTransactionForm!: FormGroup<TransactionForm>;

  calendarIcon = faCalendar;

  ngOnInit(): void {
    let defaultValues: {
      amount: string | null;
      description: string | null;
      type: string;
      category: string;
      date: DateObj;
    } = {
      amount: null,
      description: null,
      type: 'expense',
      category: 'general',
      date: AppDate.getDateObjFromDate(new Date()),
    };

    if (this.isEdit) {
      if (this.id === null || this.id === undefined) {
        throw new Error('id is null or undefined');
      }

      const txns = this.transactionService.transactions$.value;
      const txn = txns.find((txn) => txn.id === this.id);

      if (txn === null || txn === undefined) {
        throw new Error(`Transaction not found with id ${this.id}`);
      }

      defaultValues.amount = txn.amount.toString();
      defaultValues.description = txn.description;
      defaultValues.type = txn.type;
      defaultValues.date = AppDate.getDateObjFromDate(new Date(txn.date));
    }

    this.addTransactionForm = this.fb.group({
      amount: new FormControl<string | null>(defaultValues.amount, [
        Validators.required,
      ]),
      description: new FormControl<string | null>(defaultValues.description, [
        Validators.required,
      ]),
      type: new FormControl<string>(defaultValues.type, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      category: new FormControl(defaultValues.category, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      date: new FormControl(defaultValues.date, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSave(): void {
    const formValues = this.addTransactionForm.getRawValue();

    if (formValues.amount === null || formValues.description === null) {
      throw new Error(
        `amount or description is null, amount: ${formValues.amount}, description: ${formValues.description}`,
      );
    }

    const data: Omit<Transaction, 'id'> = {
      amount: parseInt(formValues.amount),
      description: formValues.description,
      type:
        formValues.type === 'expense'
          ? TransactionType.expense
          : TransactionType.income,
      category: formValues.category,
      date: AppDate.getDateFromDateObj(formValues.date).toISOString(),
    };

    if (this.isEdit) {
      if (this.id === null || this.id === undefined) {
        throw new Error('id is null or undefined');
      }

      this.transactionService.editTransaction(data, this.id);
    } else {
      this.transactionService.addTransaction(data);
    }

    this.addTransactionForm.reset();

    this.save.emit();
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
