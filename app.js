const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const testRouter = require("./app/test/router")
const infoRouter = require("./app/info/router")
const spotRouter = require("./app/spot/router")
const priceRouter = require("./app/price/router")

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRouter);
app.use('/info', infoRouter);
app.use('/spot', spotRouter)
app.use('/price', priceRouter)

module.exports = app;
