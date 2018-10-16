const roundTo = require('round-to');

    //Get transaction type of expense or income based on transaction amount
    getTransactionType = (transactionAmount) => {
        let transactionType;
        if (transactionAmount < 0) {
            transactionType = 'expense';
        } else if (transactionAmount >= 0) {
            transactionType = 'income';
        } else {
            transactionType = '';
        }
        return transactionType.toString();
    };

    //Get tax type based on transaction type VAT tax for expense, income tax for income
    getTaxType = (transactionType) => {
        let taxType;
        if(transactionType === 'income'){
            taxType = 'Income tax, 15%';
        }else if(transactionType === 'expense'){
            taxType = 'VAT tax, 21%'
        }else{
            taxType = '';
        }
        return taxType;
    };

    //Get tax percentage based on transaction type
    getTaxPercentage = (transactionType) => {
        let taxPercentage;
        if (transactionType === 'expense') {
            taxPercentage = 0.21;
        } else if (transactionType === 'income') {
            taxPercentage = 0.15;
        } else {
            taxPercentage = 0;
        }
        return taxPercentage.toPrecision();
    };

    //Get tax amount from transaction amount and tax percentage
    getTaxAmount = (transactionAmount, taxPercentage) => {
        let taxAmount;
        taxAmount = transactionAmount * taxPercentage;
        return roundTo.up(taxAmount, 2);
    };

    //Get total amount of transaction amount and tax amount
    getTotalAmount = (transactionAmount, taxAmount) => {
        return transactionAmount + taxAmount;
    };

    //Get total income from array of transactions
    getTotalIncome = (transactions) => {
        let incomeSum = 0;
        for(let i = 0; i < transactions.length; i++){
            if (transactions[i].transactionAmount >= 0) {
                incomeSum += transactions[i].totalAmount;
            }
        }
        return roundTo.up(incomeSum, 2);
    };

    //Get total expense from array of transactions
    getTotalExpense = (transactions) => {
        let expenseSum = 0;
        for(let i = 0; i < transactions.length; i++){
            if (transactions[i].transactionAmount < 0) {
                expenseSum += transactions[i].totalAmount;
            }
        }
        return roundTo.up(expenseSum, 2);
    };

    /*
    Get monthly data: month name, month income, month expenses, balance and array of transactions of that month,
    Based on transaction array and month array
     */
    getMonthly = (transactions, months) => {
        let mapOfTotalPerMonth = months.map(x => {
            let selectedMonthBalance =
                {
                    monthName : '',
                    incomeAmount : 0,
                    expenseAmount : 0,
                    balanceAmount : 0,
                    transactionArray : []
                };
            for(let i = 0; i < transactions.length; i++){
                let currentYear = new Date().getFullYear()
                if((transactions[i].transactionDate.getMonth()+1) === x.MonthIndex && transactions[i].transactionDate.getFullYear() === currentYear){
                    selectedMonthBalance.balanceAmount += transactions[i].totalAmount;
                    selectedMonthBalance.transactionArray.push(transactions[i]);
                }
                if((transactions[i].transactionDate.getMonth()+1) === x.MonthIndex && transactions[i].totalAmount >= 0 && transactions[i].transactionDate.getFullYear() === currentYear){
                    selectedMonthBalance.incomeAmount += transactions[i].totalAmount;
                }
                if((transactions[i].transactionDate.getMonth()+1) === x.MonthIndex && transactions[i].totalAmount < 0 && transactions[i].transactionDate.getFullYear() === currentYear){
                    selectedMonthBalance.expenseAmount += transactions[i].totalAmount;
                }
            }
            selectedMonthBalance.monthName = x.MonthName;
            return selectedMonthBalance;
        });
        return mapOfTotalPerMonth;
    };

    module.exports= {
        getTaxAmount,
        getTaxType,
        getTaxPercentage,
        getTransactionType,
        getTotalAmount,
        getTotalExpense,
        getTotalIncome,
        getMonthly
    };
