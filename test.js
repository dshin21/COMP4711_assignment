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

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, 'views')))

app.get("/", (req, res) => {
    var name = "hello";
    res.render("index.hbs", {
        name
    });
});

app.listen(3000);
