const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "comp4711_asn_test"
});

let app = express();
app.use(cors());

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
    "CREATE DATABASE IF NOT EXISTS comp4711_asn_test (name VARCHAR(255), score VARCHAR(255))";
  connection.query(sql_create_db, function(err, res) {
    console.log("Database created");
  });

  var sql_create_table =
    "CREATE TABLE IF NOT EXISTS players (name VARCHAR(255), score VARCHAR(255))";
  connection.query(sql_create_table, function(err, res) {
    console.log("Table created");
  });

  const { name, score } = req.query;

  connection.query(
    `INSERT INTO players (name, score) VALUES('${name}','${score}')`,
    (error, results) => {}
  );
});

app.listen(3001, () => {
  console.log("Go to http://localhost:3001/players to see players");
});
