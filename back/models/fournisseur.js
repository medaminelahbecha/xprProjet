const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const fournisseurShema = new mongoose.Schema({
    Nom : {type:String,required:false,unique:false},
    Devise:{type:String,required:false,unique:false},
    codejournale:{type:String,required:true,unique:true},
    sousgaterogy:{type:String,required:true}},{timestamps:true})


    fournisseurShema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit userShema'})
module.exports = fournisseurShema;
