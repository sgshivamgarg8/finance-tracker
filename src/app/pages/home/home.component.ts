import { Component, inject } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private transactionService = inject(TransactionService);

  showAddTransactionCard = false;

  addTransaction() {
    this.showAddTransactionCard = true;
  }
}
