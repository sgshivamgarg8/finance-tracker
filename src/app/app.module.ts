import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbModalModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEditTransactionComponent } from './components/add-edit-transaction/add-edit-transaction.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { ViewTransactionComponent } from './components/view-transaction/view-transaction.component';
import { HomeComponent } from './pages/home/home.component';
import { SummaryComponent } from './components/summary/summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { ExpenseChartComponent } from './components/expense-chart/expense-chart.component';
import { ChartsComponent } from './pages/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    ViewTransactionComponent,
    AddEditTransactionComponent,
    HomeComponent,
    SummaryComponent,
    ExpenseChartComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModalModule,
    NgbTooltipModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
