const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const methodOverride = require('method-override');

const burgerRoutes = require('./controllers/burgers_controller.js')

const app = express();
var port = process.env.PORT || 3000;

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handlerbars engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// serves up static assets
app.use(express.static('public'));

// include the burger routes from the controller
app.use(burgerRoutes);

app.listen(port, function() {
  console.log("listening on port", port);
});