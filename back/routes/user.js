const config = require('../config/dbconfig');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt-nodejs');
router.route("/registeruser").post((req, res) => {
const user = req.body
   try{

 
  console.log("b",global.App.clientModel)
  const newUser = new global.App.clientModel[(req.subdomains[1])].User(user)
    newUser.save()
      .then(() => res.status(200).json("User added!"))
      .catch(err => res.status(200).json("Error: " + err));
   }
  
   catch(err)
   {
   console.log(err)
   }
  });
  router.post('/auth', (req, res, next) => {
    console.log(req.body)
      const email = req.body.email ;
      const password = req.body.password ;
          global.App.clientModel[(req.subdomains[1])].User.findOne({email:email}, (err, user) =>{
          if(err) console.log(err + global.App.clientModel[(req.subdomains[1])]) ;
          if(!user){
              return res.json({success : false, msg : "L ' email entré ne correspond à aucun compte"});
          }
          bcrypt.compare(password,user.password, (err, isMatch) => { 
          if(isMatch){
            // global.App.clientModel[(req.subdomains[1])].Groupe.find({"_id" : {$in : user.permissions} }, { _id: 0, permissions: 1 }).sort('-updatedAt').exec(function (err, groupes) {
            //   if (err) return next(err);
              
            delete user.password;
            let userToken = new global.App.clientModel[(req.subdomains[1])].User(user);
            let finalToken = userToken.toJSON()
            delete finalToken.password;
            finalToken.isClient = false;
            finalToken.subdomain = req.subdomains[1];
             const token = jwt.sign(finalToken, 'secret', {
                  expiresIn: 28800 
              });
              res.json({
                  grade: user.grade,
                  success : true,
                  token : 'XPRS '+token
              })
           // });
          }
          else{
              return res.json({success : false, msg : "Mot de passe incorrect"}); 
          }
          });

          
      });
   });
  
   router.route("/:id").patch((req,res,next) => {
    if(req.body.password){
      bcrypt.hash(req.body.password, null , null , function(err,hash){
          if(err) return next(err);
            req.body.password = hash;
    global.App.clientModel[(req.subdomains[1])].User.findByIdAndUpdate(req.params.id,req.body , function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          res.status(200).send(docs); 
      }
     } )
    })} 
  else
  global.App.clientModel[(req.subdomains[1])].User.findByIdAndUpdate(req.params.id,req.body , function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
     
        res.status(200).send(docs); 
    } })
  })
  router.route("/getone/:id").get((req,res,next) => {
    global.App.clientModel[(req.subdomains[1])].User.findById(req.params.id,function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          res.status(200).send(docs); 
      } })
  })
router.route("/veriflogin").post((req,res,next) => {
  global.App.clientModel[(req.subdomains[1])].User.findOne(req.body,function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
      if(!docs){
        return res.json({success : false, msg : "L ' email entré ne correspond à aucun compte"});
    }
     else {  //prepare email body text
      console.log(req.session.Client.subdomain)      
      let   Body = "<html>";
         Body += "<div style='background: rgb(204,204,204); padding:20px'>";
         Body += "<div style='box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>"; 
    
         Body+=  "<h3>Bonjour <span style='text-transform: capitalize;'>"+ docs.lname+' ' + req.body.fname  +"</span></h3>  <p>Nous sommes <strong>très heureux de vous aider à simplifier la gestion de votre cabinet.</strong></p>" ;
            Body+= "<p>Nous vous invitons à paramétrer  votre compte dès votre premier  accès:</p>";  
            Body+=  "<a href='http://.localhost.com.tn/password/?"+docs._id+"' style='text-decoration: none;'>  <button style='display:block;border: none;outline:none;background: none;padding:10px; background-color:#FF4519;color:white;border-radius:10px; margin:auto'><strong>Je paramètre mon compte !</strong></button>  </a>"; 
            Body+=   "<p>A partir de votre setting, suivez notre guide d’utilisation, qui vous permettra d’optimiser votre utilisation </p><p> Notre service clients est disponible pour toutes questions sur<span style='text-decoration: underline;color:blue'>contact@xpr.com.tn</span> </p>";
           Body += "<p><a href='http://.localhost.com.tn:3000/password/?"+docs._id+"' style='text-decoration: none;'> Cliquer ici </a>pour confirmer votre mail et accéder à votre plâtform</p>";
        Body += "<p>Bonne journée</p>  </div></div>";
        Body += "</html>";
                
        // let mailOptions = { 
        //                     headers: {
        //                         "x-priority": "1",
        //                         "x-msmail-priority": "High",
        //                         importance: "high"
        //                      },
        //                     from: 'oussamahassanisimplon@gmail.com', 
        //                     to: req.body.email, 
        //                     subject: "XPR", html: Body };
        //                     transport.sendMail(mailOptions, function (err) {
        //     if (err) { return res.status(500).send({ success:false, msg: err.message }); }
        //     res.status(200).json({success:true, msg :"email a eté envoiyer , consulter votre boite."});
        //   });
    
    
    }
   } })
  })
module.exports = router ;