const express = require('express');
const router = express.Router();
router.route("/register").post(function(req, res, next) {
    let clnt = req.body
    console.log(clnt)
    try{
        const newclnt =  global.App.clientModel[(req.subdomains[1])].Client()
        newclnt.name = req.body.name ;
        newclnt.devise=req.body.devise;
        newclnt.comptetva_deductible =req.body.comptetva_deductible;
        newclnt.collecter=req.body.collecter;
        newclnt.code =req.body.code;
        newclnt.type=req.body.type;
        newclnt.souscategory=req.body.souscategory;
        newclnt.save()
            .then(() => res.status(200).json("client a eté ajouter!"))
            .catch(err => res.status(200).json("Error: " + err));
         }
         catch(err)
         {
         console.log(err)
         }
  });

router.route("/update/:id").patch(function(req, res, next) {
  console.log(req.body)
    global.App.clientModel[(req.subdomains[1])].Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  router.route("/").get(function(req, res, next) {
  
    global.App.clientModel[(req.subdomains[1])].Client.find(function (err, Client) {
      if (err) return next(err);
   res.json(Client);
    });
  });
  
  router.route('/getone/:id').get(function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Client.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  router.delete('/delete/:id', function(req, res, next) {
    global.App.clientModel[(req.subdomains[1])].Client.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json({msg : 'Client a eté suprimer'});
    });
  });

  router.get('/getlastes/:type' ,  function(req,res, next) {
    console.log(req.params.type)
     global.App.clientModel[(req.subdomains[1])].Client.find({type :req.params.type}).limit(1).sort({$natural:-1}).exec(function (err, last) {
       if (err) return next(err);
       res.json({lastclient : last});
     })
  })

module.exports = router ;