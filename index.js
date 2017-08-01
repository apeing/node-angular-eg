const express = require('express');
const app = express();

app.use(require('serve-favicon')(__dirname + '/favicon.ico'));
app.use(require('cookie-parser')());
app.use(require('compression')());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var path = require('path');
app.use(express.static(path.join(__dirname, './public')));

module.exports = app;