const express = require("express");
const router = require("./router");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const jwt = require("./jwt");

require("dotenv").config();
const port = 3000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.loggedUser = jwt.authenticateToken(req.cookies.authToken);
  next();
});
app.use("/", router);
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
