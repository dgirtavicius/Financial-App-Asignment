const express = require('express');
const mongoose = require('mongoose');
const roundTo = require('round-to');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const Calculations = require('../Callculations/calculations');
const { Transaction } = require('../models/transaction');

//Month index and name array for formatting monthly data to pass to Angular
const months = [
    {
        MonthIndex:1,
        MonthName:'January'
    },
    {
        MonthIndex:2,
        MonthName:'February'
    },
    {
        MonthIndex:3,
        MonthName:'March'
    },
    {
        MonthIndex:4,
        MonthName:'April'
    },
    {
        MonthIndex:5,
        MonthName:'May'
    },
    {
        MonthIndex:6,
        MonthName:'June'
    },
    {
        MonthIndex:7,
        MonthName:'July'
    },
    {
        MonthIndex:8,
        MonthName:'August'
    },
    {
        MonthIndex:9,
        MonthName:'September'
    },
    {
        MonthIndex:10,
        MonthName:'October'
    },
    {
        MonthIndex:11,
        MonthName:'November'
    },
    {
        MonthIndex:12,
        MonthName:'December'
    }
    ];

//Get monthly data
router.get('/monthly/', (req, res, next) => {
    Transaction.find((err, docs) => {
        if(err){
            console.log('Error when retrieving monthly balance :' + JSON.stringify(err, undefined, 2))
        }else{
            res.send(Calculations.getMonthly(docs, months));
        }
    });
});

//Get total current balance
router.get('/bal', (req, res, next) => {
   Transaction.find((err, docs) => {
       if(err){
           console.log('Error when accessing transaction list :' + JSON.stringify(err, undefined, 2))
       }else{
           let currentBalance = Calculations.getTotalIncome(docs) + Calculations.getTotalExpense(docs);
           res.send(roundTo.up(currentBalance,2).toString());
       }
   });
});

//Get all transactions
router.get('/', (req, res, next) => {
    Transaction.find((err, docs) => {
        if(err){
            console.log('Error when retrieving transaction list :' + JSON.stringify(err, undefined, 2))
        }else{
            res.send(docs), console.log('Transactions retrieved successfully!');
        }
    });
});

//Post a transaction
router.post('/', (req, res, next) => {
    const trans = new Transaction({
        transactionType: Calculations.getTransactionType(req.body.transactionAmount),
        taxType: Calculations.getTaxType(Calculations.getTransactionType(req.body.transactionAmount)),
        transactionDate: new Date(),
        transactionDescription: req.body.transactionDescription,
        transactionAmount: req.body.transactionAmount,
        taxAmount: req.body.taxAmount,
        totalAmount: req.body.totalAmount
    });
    if(req.body.transactionDate){
        trans.transactionDate = req.body.transactionDate;
    }
    //Calculate and set tax amount to transaction
    trans.taxAmount = Calculations.getTaxAmount(trans.transactionAmount, Calculations.getTaxPercentage(trans.transactionType));
    //Calculate and set total amount to transaction
    trans.totalAmount = Calculations.getTotalAmount(trans.transactionAmount, trans.taxAmount);
    //Save and send transaction data to mongo db
    trans.save((err, doc) => {
        if(err){
            console.log('Error when creating transaction :' + JSON.stringify(err, undefined, 2))
        }else{
            res.send(doc), console.log('Transactions created successfully!');
        }
    });
});

//Get certain transaction based on id
router.get('/:id', (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send(`Transaction with given id:${req.params.id} was not found`)
    }
    Transaction.findById(req.params.id, (err, doc) => {
        if(err){
            console.log('Error when fetching transaction :' + JSON.stringify(err, undefined, 2))
        }else{
            res.send(doc), console.log('Transactions fetched successfully!');
        }
    });
});

//Update a certain transaction based on id
router.put('/:id', (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send(`Transaction with given id:${req.params.id} was not found`)
    }
    const trans = ({
        transactionType: Calculations.getTransactionType(req.body.transactionAmount),
        taxType: Calculations.getTaxType(Calculations.getTransactionType(req.body.transactionAmount)),
        transactionDate: req.body.transactionDate,
        transactionDescription: req.body.transactionDescription,
        transactionAmount: req.body.transactionAmount,
        taxAmount: req.body.taxAmount,
        totalAmount: req.body.totalAmount
    });
    //Calculate and set tax amount to transaction
    trans.taxAmount = Calculations.getTaxAmount(trans.transactionAmount, Calculations.getTaxPercentage(trans.transactionType));
    //Calculate and set total amount to transaction
    trans.totalAmount = Calculations.getTotalAmount(trans.transactionAmount, trans.taxAmount);

    Transaction.findByIdAndUpdate(req.params.id, {$set : trans}, (err, doc) => {
        if(err){
            console.log('Error when updating transaction :' + JSON.stringify(err, undefined, 2))
        }else{
            res.send(doc), console.log('Transactions updated successfully!');
        }
    });
});

//Delete certain transaction based on id
router.delete('/:id', (req, res, next) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send(`Transaction with given id:${req.params.id} was not found`)
    }
    Transaction.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            console.log('Error when deleting transaction :' + JSON.stringify(err, undefined, 2))
        }else{
            res.send(doc), console.log('Transactions deleted successfully!');
        }
    });
});

module.exports = router;