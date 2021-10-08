const express = require('express');
const router = express.Router();

router.route("/").get(function(req, res, next) {

    global.App.clientModel[(req.subdomains[1])].Plancomptable.find(function (err, plan) {
      if (err) return next(err);
   res.json(plan);
    });
  });
  
  router.route('/getone/:id').get(function(req, res, next) {
    
    global.App.clientModel[(req.subdomains[1])].Plancomptable.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  router.delete('/delete/:id', function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Plancomptable.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
module.exports = router ;