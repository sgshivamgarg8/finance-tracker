import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { ViewTransactionComponent } from './components/view-transaction/view-transaction.component';
import { HomeComponent } from './pages/home/home.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    ViewTransactionComponent,
    AddTransactionComponent,
    HomeComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModalModule,
    NgbTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
