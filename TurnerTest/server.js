'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge";

var app = express();
//app.set('port', process.env.PORT || 1337);

var port = process.env.PORT || 3000;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    next();
});

app.get('/:title', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("dev-challenge");
        var query = {
            TitleName: { $regex: ".*" + req.params.title + ".*", $options: 'i' }
        };
        dbo.collection("Titles").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

app.listen(port);


/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/
