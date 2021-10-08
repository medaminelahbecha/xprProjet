const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const organisationShema = new mongoose.Schema({
    Nom : {type:String,required:false,unique:false},
    Mat_fiscal:{type:String,required:false,unique:false},
    Nbremployer:{type:String,required:false,unique:false},
    Email_facture:{type:String,required:false,unique:true},
    Adresse:{type:String,required:false,unique:false},
    Payes:{type:String,required:false,unique:true},
    Devis:{type:String,required:false,unique:false},
    Nom_banque:{type:String,required:false,unique:true},
    Rib_banc:{type:String,required:false}},{timestamps:true})


    organisationShema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit userShema'})
module.exports = organisationShema;