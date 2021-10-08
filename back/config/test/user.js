const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const userShema = new mongoose.Schema({
    fname : {type:String,required:false,unique:false},
    lname:{type:String,required:false,unique:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    sexe :{type:String,required:false},
    responsable:{type:String,required:false},
    subdomaine:{type:String,required:true}},{timestamps:true})


    userShema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit user shema'})
module.exports =userShema;

