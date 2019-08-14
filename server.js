﻿const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'site-data';

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './')));

mongoose.connect("mongodb://localhost:27017/site-data", { useNewUrlParser: true }, { useUnifiedTopology: true });

MongoClient.connect(url, function(err, client) {
	if (err) console.log('Fail')
	const db = client.db(dbName);
	console.log("Good connected to server");
	client.close();
});

app.post('/add-order', (req, res) => {
    const fs = require('fs');
    fs.appendFile('./orders.txt', JSON.stringify(req.body) + '\n', () => {
        res.send('Ваші дані прийнято. Дякуємо за покупку.');
    });
});
app.post('/call-me', (req, res) => {
    const fs = require('fs');
    fs.appendFile('.call-me.txt', JSON.stringify(req.body.number) + '\n', () => {
        res.send('Ваші дані прийнято. Зачекайте трохи, ми з вами звяжемося.');	
    })
});
app.post('/login', (req, res) => {
    if (req.body.login == 'admin' && req.body.password == 'admin') {
        res.send('true');
    } else res.send('false');
});
app.post('/addItem', (req, res) => {
    const fs = require('fs');
    const html = JSON.stringify(req.body.html);
    fs.appendFile('./items.html', html.slice(1, html.length - 1), () => {
        res.send('true');
    });
});
app.post('/saveItems', (req, res) => {
    const fs = require('fs');
    const html = JSON.stringify(req.body.html);
    fs.unlinkSync('./items.html');
    fs.appendFile('./items.html', html.slice(1, html.length - 1), () => {
        res.send('true');
    });
});
app.listen(process.env.port || 80, process.env.IP || '10.156.0.3');