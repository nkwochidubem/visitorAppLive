/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const dataBaseConfig = require('./database/db');
const router = require('./src/config/routes');
const app = express();
mongoose.Promise = global.Promise;

// mongodb local connection mongodb://localhost/visitor-list mongodb+srv://nkwochidubem:<password>@cluster0-puljv.azure.mongodb.net/test
mongoose.connect(dataBaseConfig.db, { useNewUrlParser: true }  , err => {
    if (err) throw err;
    console.log(`Successfully connected to database.`);
});

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, '../public/')));
app.use('/api', router);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.message = 'invalid route';
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});

