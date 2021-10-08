const Clientsshema = require("../config/test/user");
const mongoose = require("mongoose");
const config = require("../config/dbconfig");
const conn = mongoose.createConnection(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = conn.model("inscriptions", Clientsshema);
let basedomain = config.baseDomain;
let allowedSubs = { admin: true, www: true, cabinetxpr: true };
allowedSubs[basedomain] = true;
function clientlistener() {
  return function (req, res, next) {
    console.dir("look at my sub domain  " + req.subdomains[1]);

    if (
      req.subdomains[1] in allowedSubs ||
      typeof req.subdomains[1] == "undefined" ||
      (req.session.Client && req.session.Client.name === req.subdomains[1])
    ) {
      console.log("did not search database for " + req.subdomains[1]);
      if (req.subdomains[1] == "cabinetxpr") {
        req.session.Client = {
          name: "cabinetxpr",
          subdomaine: "xpr",
        };
      }
      return next();
    } else {
      User.findOne({ subdomaine: req.subdomains[1] }, function (err, client) {
        if (!err) {
          if (!client) {
            //res.send(client);

            res.status(403).send("Sorry! you cant see that.");
          } else {
            console.log("searched database for " + req.subdomains[1]);

            req.session.Client = client;
            return next();
          }
        } else {
          console.log(err);
          return next(err);
        }
      });
    }
  };
}

module.exports = clientlistener;
