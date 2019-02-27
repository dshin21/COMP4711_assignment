var express = require("express");
var mysql = require("mysql");
var app = express();
// app.use(express.logger());

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-03.cleardb.net",
  user: "b54bd99ba59371",
  password: "2d211ca1",
  database: "heroku_bb4f7a09a393d7b"
});
// mysql://b54bd99ba59371:2d211ca1@us-cdbr-iron-east-03.cleardb.net/heroku_bb4f7a09a393d7b?reconnect=true
connection.connect();

app.get("/", function(request, response) {
  var sql_create_db =
    "CREATE DATABASE IF NOT EXISTS comp4711_asn (name VARCHAR(255), score VARCHAR(255))";
  connection.query(sql_create_db, function(err, res) {});

  var sql_create_table =
    "CREATE TABLE IF NOT EXISTS players (name VARCHAR(255), score VARCHAR(255))";
  connection.query(sql_create_table, function(err, res) {});

  connection.query("SELECT * from players", function(err, rows, fields) {
    if (err) {
      console.log("error: ", err);
      throw err;
    }
    response.send(rows);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
