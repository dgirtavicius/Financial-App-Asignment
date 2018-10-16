const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Connecting to mongo db through index.js
const mongoose = require('./db.js');
const transactionController = require('./controller/transactionController.js');

let app = express();
app.use(bodyParser.json());

//Combine url for Node and Angular to use same URL
app.use(cors({ origin: 'http://localhost:4200' }));

//Node app URL
app.listen(3000, () => console.log(`Server started on port : 3000`))

app.use('/transactions', transactionController);