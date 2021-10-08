const express = require('express');
const router = express.Router();

router.route("/").get(function(req, res, next) {

    global.App.clientModel[(req.subdomains[1])].Categorie.find({sous_categorie: { $exists: true } } , function (err, plan) {
      if (err) return next(err);
   res.json(plan);
    });
  });
  router.route("/update/:id").patch(function(req, res, next) {
    console.log(req.body)
    global.App.clientModel[(req.subdomains[1])].Categorie.updateOne({_id:req.params.id , "sous_categorie._id":req.body._idsoucat },{$set: {
      "sous_categorie.$.sous_categorie": req.body.sous_categorie,
      "sous_categorie.$.code_sous_categorie": req.body.code_sous_categorie}}, function (err, post) {
      if (err) return console.log(err);
     else
      res.json({msg:'sous category est modifier'});
      }
    )
  });
  router.route("/updatesoucat/:id").patch(function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Categorie.updateOne(
      { _id: req.params.id,"sous_categorie._id": req.body.id },
      { $set: { "sous_categorie.$.code_sous_categorie" : req.body.code_sous_categorie ,
         "sous_categorie.$.sous_categorie": req.body.sous_categorie }},function (err, plan) {
        if (err) return next(err);
     res.json(plan);
      }); 
  });
  router.route("/add/:id").patch(function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Categorie.updateOne(
      { _id: req.params.id },
      { $push:  {sous_categorie :req.body}},function (err, plan) {
        if (err) return next(err);
     res.json(plan);
      }); 
  });
  router.route('/getone/:id').get(function(req, res, next) {
    
    global.App.clientModel[(req.subdomains[1])].Categorie.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  router.delete('/delete/:id', function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Categorie.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
module.exports = router ;