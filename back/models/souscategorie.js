const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const categorieSousShema = new mongoose.Schema({
   
    code_categorie:{type:String,required:true},
    code_sous_categorie :{type:String,required:false},
    sous_categorie:{type:String,required:false},
    color_sous_categorie : {type : String , required:false}
    },{timestamps:true})


    categorieSousShema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit categorieShema'})
module.exports = categorieSousShema;