import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { TransactionService } from "../../shared/transaction.service";
import { Transaction } from "../../shared/transaction.model";
import { Balance } from "../../shared/balance.model";
import { MonthlyTransactionsComponent } from "../monthly-transactions/monthly-transactions.component";

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers: [TransactionService, MonthlyTransactionsComponent]
})

export class TransactionFormComponent implements OnInit {

  constructor(private transactionService: TransactionService, private monthlyTransactionComponent: MonthlyTransactionsComponent) { }

  ngOnInit() {
    this.refreshTransactionList();
    this.resetForm();
    this.getTotalCurrentBalance();
    this.monthlyTransactionComponent.refreshMonthlyBalances()
  }

  //When adding expenses turns the amount negative if its positive and if its negative leaves it negative
  addExpense(){
    if(this.transactionService.selectedTransaction.transactionAmount < 0){
      this.transactionService.selectedTransaction.transactionAmount *= 1;
    }else {
      this.transactionService.selectedTransaction.transactionAmount *= -1;
    }
  }

  //When adding income turns amount positive if its negative and leaves it positive if its positive
  addIncome(){
    if(this.transactionService.selectedTransaction.transactionAmount >= 0){
      this.transactionService.selectedTransaction.transactionAmount *= 1;
    }else {
      this.transactionService.selectedTransaction.transactionAmount *= -1;
    }
  }

  //Refreshes transaction list
  refreshTransactionList(){
    this.transactionService.getAllTransaction().subscribe((res) => {
      this.transactionService.transactions = res as Transaction[];
    })
  }

  //Resets form
  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }else{
        this.transactionService.selectedTransaction = {
          _id: "",
          transactionType: "",
          taxType: "",
          transactionDate: "",
          transactionDescription: "",
          transactionCurrency: "",
          transactionAmount: null,
          taxAmount: null,
          totalAmount: null
      }
    }
  }

  getTotalCurrentBalance(){
    this.transactionService.getCurrentBalance().subscribe((res) =>{
      this.transactionService.currentBalance = res as Balance;
    })
  }

  onSubmit(form: NgForm){
    if(form.value._id === "" || form.value._id === null){
      this.transactionService.postTransaction(form.value).subscribe( (res) => {
        this.monthlyTransactionComponent.refreshMonthlyBalances()
        this.refreshTransactionList();
        this.resetForm(form);
        this.getTotalCurrentBalance();
      });
    }else{
      this.transactionService.putTransaction(form.value).subscribe((res)=>{
        this.monthlyTransactionComponent.refreshMonthlyBalances()
        this.refreshTransactionList();
        this.resetForm(form);
        this.getTotalCurrentBalance();
      });
    }
  }

  onEdit(trans: Transaction) {
    this.transactionService.selectedTransaction = trans;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this record ?') === true) {
      this.transactionService.deleteTransaction(_id).subscribe((res) => {
        this.monthlyTransactionComponent.refreshMonthlyBalances()
        this.refreshTransactionList();
        this.resetForm(form);
        this.getTotalCurrentBalance();
      });
    }
  }

}
