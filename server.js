const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const connection = mysql.createConnection({
  host: "us-cdbr-iron-east-03.cleardb.net",
  user: "b54bd99ba59371",
  password: "2d211ca1",
  database: "heroku_bb4f7a09a393d7b"
});

let app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

app.set("port", process.env.PORT || 5000);

app.get("/players", function(req, res) {
  connection.query("SELECT * FROM players", function(error, results, fields) {
    if (error) res.send(error);
    else
      return res.json({
        data: results
      });
  });
});

app.get("/players/add", function(req, res) {
  var sql_create_db =
    "CREATE DATABASE IF NOT EXISTS comp4711_asn (name VARCHAR(255), score VARCHAR(255))";
  connection.query(sql_create_db, function(err, res) {});

  var sql_create_table =
    "CREATE TABLE IF NOT EXISTS players (name VARCHAR(255), score VARCHAR(255))";
  connection.query(sql_create_table, function(err, res) {});

  const { name, score } = req.query;

  connection.query(
    `INSERT INTO players (name, score) VALUES('${name}','${score}')`,
    (error, results) => {}
  );
});

app.get("/players/delete", function(req, res) {
  connection.query(
    `DELETE FROM players WHERE name=""`,
    (error, results) => {}
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(app.get("port"), function() {
  console.log("listening");
});
