const MyClientSchema = require('../models/myClients');
const express = require('express');
const router = express.Router();
const passport  = require('passport') ; 
const config = require('../config/dbconfig');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const conn = mongoose.createConnection(config.database, { useNewUrlParser: true,  useUnifiedTopology: true });
const MyClient = conn.model('myClients', MyClientSchema);
let transport =nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "oussamahassanisimplon@gmail.com",
    pass: "ou_2s_ma200"
  }
});

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});


router.post('/register', function(req, res, next) {
  console.log("bodu register" , req.body)
  if(req.body.subdomaine.toLowerCase() == "admin" || req.body.subdomaine.toLowerCase() == "www"){
    res.json({success:false, msg : req.body.subdomaine+" est réservé"});
    return;
  }
  var regex = /^[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]$/;
  if(!regex.test(req.body.subdomaine) && req.body.subdomaine.length < 2){
    res.json({success:false, msg : req.body.subdomaine+" est invalide"});
    return;
  }
  console.log("client", req.body);
    var myClient = new MyClient(req.body);
    console.log("db name",myClient.db.name);
    myClient.save(function(err,data){
        if(err){
            res.json({success:false, msg : err});
            return;
        }else{
          const dbUrl = req.body.subdomaine.toLowerCase().trim();
          console.log(dbUrl)
          let newconn = mongoose.createConnection('mongodb+srv://oussama:oussama@cluster0-memm7.mongodb.net/'+dbUrl+'?retryWrites=true&w=majority' , { useNewUrlParser: true,  useUnifiedTopology: true });
          console.dir('created_________________________ '+dbUrl);
          ///structure
        var userSchema = require('../models/user');
        const userModel = newconn.model('user',userSchema);
         const user = {
          fname :req.body.fname,
          lname:  req.body.lname,
          email:  req.body.email,
          active:  true,
         }
        let configVariable = new userModel(user);
        console.log("db name2",configVariable.db.name);
        configVariable.save(function(err,data){
          if(err){
             res.json({success:false, msg : err});
         }else{
      
   
        //prepare email body text
        var Body = "<html>";
         Body += "<div style='background: rgb(204,204,204); padding:20px'>";
         Body += "<div style='box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>"; 
           Body += "<img src='https://www.keejob.com/media/recruiter/recruiter_21064/logo-21064-20200615-102257.png' width=150 style='margin:auto;display: block'>"; 
           Body+=  "<h3>Bonjour <span style='text-transform: capitalize;'>"+ req.body.lname+' ' + req.body.fname  +"</span></h3>  <p>Nous sommes <strong>très heureux de vous aider à simplifier la gestion de votre cabinet.</strong></p>" ;
            Body+= "<p>Nous vous invitons à paramétrer  votre compte dès votre premier  accès:</p>";
            Body+= "<ul><li><strong>Ajoutez vos plant comptable</strong></li><li><strong>Connectez vos utilisateur</strong></li>";   
            Body+=  "<a href='http://"+dbUrl+".localhost.com.tn/password/?"+data._id+"' style='text-decoration: none;'>  <button style='display:block;border: none;outline:none;background: none;padding:10px; background-color:#FF4519;color:white;border-radius:10px; margin:auto'><strong>Je paramètre mon compte !</strong></button>  </a>"; 
            Body+=   "<p>A partir de votre setting, suivez notre guide d’utilisation, qui vous permettra d’optimiser votre utilisation </p><p> Notre service clients est disponible pour toutes questions sur<span style='text-decoration: underline;color:blue'>contact@xpr.com.tn</span> </p>";
           Body += "<p><a href='http://"+dbUrl+".localhost.com.tn:3000/password/?"+data._id+"' style='text-decoration: none;'> Cliquer ici </a>pour confirmer votre mail et accéder à votre plâtform</p>";
        Body += "<p>Bonne journée</p>  </div></div>";
        Body += "</html>";
                
        var mailOptions = { 
                            headers: {
                                "x-priority": "1",
                                "x-msmail-priority": "High",
                                importance: "high"
                             },
                            from: 'oussamahassanisimplon@gmail.com', 
                            to: req.body.email, 
                            subject: "XPR", html: Body };
                            transport.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ success:false, msg: err.message }); }
            res.cookie(data._id).json({success:true, msg :"Compte créé avec succès."});
          });
    
  } 
});

let organisationSchema = require('../models/organisation');
const organisationel = newconn.model('organisation',organisationSchema);
let organisation = {
  Nom : req.body.subdomaine,
  Mat_fiscal:'',
  Email_facture:'',
  Adresse:'tunsia',
  Payes:'tunisia',
  Devis:'DT',
  Nom_banque:'',
  Rib_banc:'',
}
let organisations = new organisationel(organisation);
organisations.save(function(err,data){
  if(err)
  res.send(err)
  else
  res.status(200).cookie('organisation',data._id)
  
    }
);
    }
})
})

router.post('/reSend', function(req, res, next) {
  MyClient.findOne({email: req.body.email}, (err, client) =>{
    if(err) throw err ;
    else {
    if(!client){
        return res.json({success : false, msg : "L'email entré ne correspond à aucun compte"});
    }
    else {
              //prepare email body text
              var Body = "<html>";
              Body += "<h1>L'equipe xpr vous remercie pour votre confiance</h1>"
              Body += "<a href='http://"+client.subdomaine+".localhost.com.tn/password/?"+data._id+">Cliquer ici </a>pour confirmer votre mail et accéder à votre plâtform";
              Body += "<br/><br/><br/><br/>";
              Body += "</html>";
               var mailOptions = { 
                headers: {
                    "x-priority": "1",
                    "x-msmail-priority": "High",
                    importance: "high"
                 },
                from: 'oussamahassanisimplon@gmail.com', 
                to: client.email, 
                subject: "XPR", html: Body };
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { return res.status(500).send({ success:false, msg: err.message }); }
                    res.json({success:true, msg :"Un email de vérification a été envoyé à " + client.email + '.'});
                  });
        }

  }
});
})
  
module.exports = router ;
