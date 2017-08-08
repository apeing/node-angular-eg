const express = require('express');
const app = express();

app.use(require('serve-favicon')(__dirname + '/favicon.ico'));
app.use(require('cookie-parser')());
app.use(require('compression')());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = {
    "db" : {
    "host": "localhost:27017",
    "name": "bigdata",
    "username": "bigdata",
    "password": "123456",
    "options": {
        "server": {
            "poolSize": 10,
            "socketOptions": {
                "keepAlive": 1
            }
        }
    }
}};
require('./app/lib/mongoose.js')(config.db);

var path = require('path');
app.use(express.static(path.join(__dirname, './public')));

app.use('/', require('./router.js'));

module.exports = app;