var exp = require('express');
var app = exp();

app.get("/", function(req, res) {
	res.render("main.ejs");
})