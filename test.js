// TODO:
// unlimited trials
// matrix
// max size: 7x7
// rotate right
// if right n+1 x n+1, n-1 if wrong
//score
// terminate if: (score == 0 || <0) || uer press terminate
// confirm if they will really terminate
// -1 if wrong, +1 if win
// summary.html
// RESTART btn
// get user's name -> score + name -> db -> leaderboard.html

var express = require("express");
var hbs = require("express-handlebars");
var path = require("path");

var app = express();

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/"
    })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "views")));

const cardHelper = require("./helpers/helper.js");

app.get("/", (req, res) => {
    var name = "hello";
    res.render("index.hbs", {
        name,
        cardHelper
    });
});

app.listen(3000);
