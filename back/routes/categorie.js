const express = require('express');
const router = express.Router();
let async = require('async');
router.route("/addcategory").post((req, res) => {
  const cat = req.body
     try{
    const newCat = new global.App.clientModel[(req.subdomains[1])].Categorie(cat)
    newCat.save()
        .then(() => res.status(200).json("category added!"))
        .catch(err => res.status(200).json("Error: " + err));
     }
     catch(err)
     {
     console.log(err)
     }
    });
router.route("/").get(function(req, res, next) {

    global.App.clientModel[(req.subdomains[1])].Categorie.find().sort( { code_categorie: 1 }).exec (function (err, plan) {
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
  router.patch('/many',function(req, res, next) {
    let payload = req.body
    if(req.subdomains[1]!==undefined) {
    global.App.clientModel[(req.subdomains[1])].Categorie.bulkWrite(
      payload.map((souscat) => {
          return {
              updateOne: {
                  filter: { code_categorie:souscat.code_sous_categorie? souscat.code_sous_categorie.toString().substr(0,2) : 10  },
                  update: {
                        $push:{sous_categorie : souscat
                  },
                  upsert: true
              }
          }
      }}), {}, (err, result) => {
          if (err) {
              console.log({ success: false, msg: err })
          } else {
              res.json(result)
          }
     
     
  })
}
})


module.exports = router ;