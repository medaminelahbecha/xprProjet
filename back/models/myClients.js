var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


var MyClientSchema = new mongoose.Schema({
    fname:    { type: String, required: true},
    lname:    { type: String, required: true},
    email:    { type: String, required: true, unique: 'Email \"{VALUE}\", est déja utiliser.' },
    active:   { type: Boolean , default : true},
    demo:     { type: Boolean , default : true},
    mat_fis:  { type: String },
    size:     { type: String },
    subdomaine:{type: String, required: true, unique: 'Domaine \"{VALUE}\", est déja utiliser.', default: ' ',},
    verified: {type: Boolean, default: false}
  }, {timestamps: true});

  MyClientSchema.plugin(beautifyUnique, {
   defaultMessage: "Une erreur c\'est produit: "
});


MyClientSchema.pre('save', function(next) {
  var myClient = this;
  bcrypt.hash(myClient.password, null , null , function(err,hash){
    if(err) return next(err);
      myClient.password = hash;
      next();
  });
});
 
module.exports = MyClientSchema;
  
 
