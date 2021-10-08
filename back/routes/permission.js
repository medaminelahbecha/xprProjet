const express = require('express');
const router = express.Router();

router.route("/postpermission").post((req, res) => {
    const Permiss= req.body
       try{
      const newPermission = new global.App.clientModel[(req.subdomains[1])].Permission(Permiss)
        newPermission.save()
          .then(() => res.status(200).json("Permission added!"))
          .catch(err => res.status(200).json("Error: " + err));
       }
       catch(err)
       {
       console.log(err)
       }
      });
  router.route("/").get(function(req, res, next) {
  
      global.App.clientModel[(req.subdomains[1])].Permission.find(function (err, Permiss) {
        if (err) return next(err);
     res.json(Permiss);
      });
    });
    
    router.route('/getone/:id').get(function(req, res, next) {
      
      global.App.clientModel[(req.subdomains[1])].Permission.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    });
    
    router.delete('/delete/:id', function(req, res, next) {
      global.App.clientModel[(req.subdomains[1])].Permission.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    });
    router.patch('/update/:id', function(req, res, next) {
      global.App.clientModel[(req.subdomains[1])].Permission.findByIdAndUpdate(req.params.id,req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    });

module.exports = router ;