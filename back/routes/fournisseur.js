const express = require('express');
const router = express.Router();

router.route("/update/:id").post(function(req, res, next) {
    let fournisseur = req.body
    try{
        const newFournissuer =  global.App.clientModel[(req.subdomains[1])].Fournisseur(fournisseur)
        newFournissuer.save()
            .then(() => res.status(200).json("founisseur a eté ajouter!"))
            .catch(err => res.status(200).json("Error: " + err));
         }
         catch(err)
         {
         console.log(err)
         }
  });

router.route("/update/:id").put(function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Fournisseur.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  router.route("/").get(function(req, res, next) {
  
    global.App.clientModel[(req.subdomains[1])].Fournisseur.find(function (err, scanfact) {
      if (err) return next(err);
   res.json(scanfact);
    });
  });
  
  router.route('/getone/:id').get(function(req, res, next) {
    
    global.App.clientModel[(req.subdomains[1])].Fournisseur.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  router.delete('/delete/:id', function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Fournisseur.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json({msg : 'fournissuer a eté suprimer'});
    });
  });

module.exports = router ;