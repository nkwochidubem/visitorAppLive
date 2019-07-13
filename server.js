/* eslint-disable no-console */
let express = require('express');
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
app.use(express.static(path.join(__dirname, './public')));
app.use('/api', router);


// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});



// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});

