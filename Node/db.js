const mongoose = require('mongoose');

//Connection to local mongo database using mongoose
mongoose.connect('mongodb://localhost:27017/db',
    { useNewUrlParser: true },
    console.log('Mongo database connection successful!')
);

module.exports = mongoose;