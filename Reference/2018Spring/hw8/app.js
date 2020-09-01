const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');

// const api = require('./routes/api');
const routes = require('./routes/api');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', routes);
// app.use('/api', api);

app.use((req, res, next) => {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    next(err);
    // res.render('error.html', {
    //     title: 'ng express starter',
    //     message: err.message,
    //     error: {}
    // });
});

module.exports = app;