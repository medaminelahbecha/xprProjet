const express = require('express');
const router = express.Router();

 router.route("/:id").patch((req,res,next) => {
  
  global.App.clientModel[(req.subdomains[1])].Organisation.findByIdAndUpdate(req.params.id,req.body , function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        res.status(200).send(docs); 
    } })
  })
  router.route('/').get((req,res,next) => {
  console.log(global.App.clientModel[(req.subdomains[1])])
    global.App.clientModel[(req.subdomains[1])].Organisation.findOne(function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          res.status(200).send(docs); 
      } })
    })

module.exports = router ;