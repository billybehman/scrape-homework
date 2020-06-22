var express = require("express")

var exphbs = require('express-handlebars');

var app = express()

var mongoose = require("mongoose")

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });


require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes")(app);

app.engine("handlebars", exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");





app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

module.exports = app;
