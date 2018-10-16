import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { TransactionFormComponent } from './transactions/transaction-form/transaction-form.component';
import { MonthlyTransactionsComponent } from './transactions/monthly-transactions/monthly-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionFormComponent,
    MonthlyTransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
