const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const organisationShema = new mongoose.Schema({
    Role: { type: String, required: true, unique: 'Nom required \"{VALUE}\", est déja utiliser'},
    Premission : {type :Array},
    Active : {type : Boolean , default : true},
    Description:{type:String,required:false}},{timestamps:true})


    organisationShema.plugin(beautifyUnique,{defaultMessage:'une erreur c`est produit userShema'})
module.exports = organisationShema;