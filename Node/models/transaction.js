const mongoose = require('mongoose');
const dateFormat = require('dateformat');

let Transaction = mongoose.model('Transaction',{
    transactionType : {type: String, default: 'expense'},
    taxType : {type: String},
    transactionDate : {type: Date, default: new Date()},
    transactionDescription : {type: String, required: true},
    transactionCurrency : {type: String, default: '\u20AC'},
    transactionAmount : {type: Number, default: 0.00, required: true},
    taxAmount : {type: Number},
    totalAmount : {type: Number}
});

module.exports = {Transaction};