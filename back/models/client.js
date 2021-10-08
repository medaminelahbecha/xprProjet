const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const clientSchema   = new mongoose.Schema({
    fname : {type:String,required:false,unique:false},
    lname:{type:String,required:false,unique:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    sexe :{type:String,required:false},
    role:{type:String,required:true},
    organisation:{type:String,required:true}}
    ,{timestamps:true})

    clientSchema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit user shema'})
 clientSchema.pre('save', function(next) {
        let client = this;
        bcrypt.hash(client.password, null , null , function(err,hash){
          if(err) return next(err);
          client.password = hash;
            next();
        });
      });
module.exports = clientSchema