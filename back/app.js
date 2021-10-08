const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/dbconfig");
const session = require("express-session");
const clientListener = require("./middelware/clientListener");
const setclientdb = require("./middelware/setclientdb");
const initmodels = require("./middelware/initmodels");
const cros = require("cors");
//const bodyParser  = require('body-parser')
const morgan = require("morgan");
app.use(express.json());
global.App = {
  clients: [],
  activdb: "",
  clientdbconn: [],
  clientModel: [],
};
app.use(cookieParser());
app.use(session({ resave: true, secret: "secret", saveUninitialized: true }));
app.get("/", (req, res) => {
  res.send("runig");
});
// const conn = mongoose
//   .createConnection(config.database, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => console.log("amine"));
app.use(clientListener());
app.use(setclientdb());
app.use(initmodels());
app.use(cros({ credentials: true, origin: true }));
app.use(morgan("combined"));
const allroute = require("./routes")(app);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
