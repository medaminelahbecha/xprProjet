const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const categorieShema = new mongoose.Schema({
   
    code_categorie:{type:String,required:true},
    name_categorie :{type:String,required:false},
    color_categorie : {type : String , required:false}
    },{timestamps:true})


    categorieShema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit categorieShema'})
module.exports = categorieShema;