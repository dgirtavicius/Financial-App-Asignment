import { Component, OnInit } from '@angular/core';

import { TransactionService } from "../../shared/transaction.service";
import { Monthly } from "../../shared/monthly.model";

@Component({
  selector: 'app-monthly-transactions',
  templateUrl: './monthly-transactions.component.html',
  styleUrls: ['./monthly-transactions.component.css'],
  providers: [TransactionService]
})

export class MonthlyTransactionsComponent implements OnInit {

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.refreshMonthlyBalances()
  }

  refreshMonthlyBalances(){
    this.transactionService.getMonthlyData().subscribe((res)=>{
      this.transactionService.monthlyBalances = res as Monthly[];
    })
  }

}
