//Model for transaction
export class Transaction {
  _id: string;
  transactionType: string;
  taxType: string;
  transactionDate: string;
  transactionDescription: string;
  transactionCurrency: string;
  transactionAmount: number;
  taxAmount: number;
  totalAmount: number;
}
