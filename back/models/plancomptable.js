const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const planShema = new mongoose.Schema({
   
    codeclient:{type:String,required:true,default:'411'},
    codefournisseur :{type:String,required:false,default:'401'},
    codesalarier:{type:String,required:false, default:'421'},
    codeachat:{type:String,required:true,default:'AC'},
    codevente :{type:String,required:false,default:'VT'}},
     {timestamps:true})


    planShema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit categorieShema'})
module.exports = planShema;