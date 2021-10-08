const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
let bcrypt = require('bcrypt-nodejs');
const userShema = new mongoose.Schema({
  
    fname :{type: String, required: true},
    lname:    { type: String, required: true},
    email:    { type: String, required: true, unique: 'Email \"{VALUE}\", est déja utiliser.' },
    active:   { type: Boolean , default : true},
    password:   { type: String , default : true,default:''},
    date_naissance:   { type: Date , default : true,default:''},
    adresse : {type: String , default : true,default:''},
    sexe : {type: String , default : true,default:''}
}, {timestamps: true});

    userShema.plugin(beautifyUnique, {
   defaultMessage: "Une erreur c\'est produit: "
 });
 userShema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, null , null , function(err,hash){
      if(err) return next(err);
        user.password = hash;
        next();
    });
  });
 


    module.exports = userShema;

