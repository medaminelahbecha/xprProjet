const express = require("express");
const router = express.Router();
aws = require("aws-sdk"); // ^2.2.41
multer = require("multer"); // "multer": "^1.1.0"
//multerS3 = require('multer-s3'); //"^1.4.1"
const config = require("../config/config");
const Facture = require("../models/scanfacture");
const textractScan = require("../middelware/textract");
aws.config.update({
  accessKeyId: config.awsAccesskeyID,
  secretAccessKey: config.awsSecretAccessKey,
  region: config.awsRegion,
});

s3 = new aws.S3();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  // storage: multerS3({
  //     s3: s3,
  //     bucket: 'textract-console-eu-west-1-5349f000-c8fe-423f-a6fb-6ec3bb31f312',
  //     key: function (req, file, cb) {
  //         console.log(file.originalname);
  //         cb(null, Date.now()+'.'+file.originalname); //use Date.now() for unique file keys
  //     }
  // }),
  storage: storage,
  onFileUploadComplete: function (file) {
    console.log(file.originalname + " uploaded to " + file.uploadname);
  },
}).single("file");

router.post("/upload", function (req, res, next) {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(501).json({ error: err });
    } else {
      let result = await textractScan("../public/" + req.file.originalname);
      if (result) {
        const newfact = new Facture();
        newfact.client = result.client;
        newfact.date_creation = result.date;
        newfact.montant_tva = result.tva;
        newfact.montant_ttc = result.ttc;
        newfact
          .save()
          .then(() => res.status(200).json("facture added!"))
          .catch((err) => res.status(200).json("Error: " + err));
      }
      console.log(req.file.originalname);
      console.log(result);
    }

    // res.json({originalname:req.file.originalname, uploadname:req.file.key});
  });
});
// router.route("/update/:id").put(function (req, res, next) {
//   console.log(global.App.clientModel[req.subdomains[1]]);
//   global.App.clientModel[req.subdomains[1]].Scanfacture.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     function (err, post) {
//       if (err) return next(err);
//       res.json(post);
//     }
//   );
// });
// router.route("/").get(function (req, res, next) {
//   global.App.clientModel[req.subdomains[1]].Scanfacture.find(function (
//     err,
//     scanfact
//   ) {
//     if (err) return next(err);
//     res.json(scanfact);
//   });
// });

// router.route("/getone/:id").get(function (req, res, next) {
//   global.App.clientModel[req.subdomains[1]].Scanfacture.findById(
//     req.params.id,
//     function (err, post) {
//       if (err) return next(err);
//       res.json(post);
//     }
//   );
// });

// router.delete("/delete/:id", function (req, res, next) {
//   global.App.clientModel[req.subdomains[1]].Scanfacture.findByIdAndRemove(
//     req.params.id,
//     function (err, post) {
//       if (err) return next(err);
//       res.json(post);
//     }
//   );
// });

module.exports = router;
