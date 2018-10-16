import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Transaction } from "./transaction.model";
import { Balance } from "./balance.model";
import { Monthly} from "./monthly.model";

@Injectable()
export class TransactionService {
  selectedTransaction: Transaction;
  transactions: Transaction[];
  currentBalance: Balance;
  monthlyBalances: Monthly[];

  readonly baseURL = 'http://localhost:3000/transactions/';

  constructor(private http: HttpClient) { }

  postTransaction(trans: Transaction){
    return this.http.post(this.baseURL, trans);
  }

  getMonthlyData(){
    return this.http.get(this.baseURL + 'monthly');
  }

  getAllTransaction(){
    return this.http.get(this.baseURL);
  }

  getCurrentBalance(){
    return this.http.get(this.baseURL + 'bal');
  }

  putTransaction(trans: Transaction){
    return this.http.put(this.baseURL + `${trans._id}`, trans);
  }

  deleteTransaction(_id: string){
    return this.http.delete(this.baseURL + `${_id}`);
  }
}
