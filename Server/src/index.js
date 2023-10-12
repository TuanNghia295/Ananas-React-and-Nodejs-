const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3002;

const route = require("./routes");
const db = require("./config/db");

// Connect to db
db.connect();

// HTTP logger
// app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, "public")));

const handlebars = exphbs.create({
  helpers: {
    sum: (a, b) => a + b,
  },
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cors());

// Templates engine
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

// Route init
route(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
