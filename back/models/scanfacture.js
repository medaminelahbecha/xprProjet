const mongoose = require("mongoose");

const beautifyUnique = require("mongoose-beautiful-unique-validation");
const categorieSousShema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    client: { type: String, required: false },
    mat_fiscal: { type: String, required: false },
    libelle: { type: String, required: true },
    numero: { type: String, required: false },
    methode_payement: { type: String, required: false },
    categorie: { type: String, required: true },
    date_creation: { type: String, required: false },
    devise: { type: String, required: false },
    montant_ht: { type: String, required: false },
    Tva: { type: String, required: false },
    montant_tva: { type: String, required: false },
    montant_ttc: { type: String, required: false },
  },
  { timestamps: true }
);

categorieSousShema.plugin(beautifyUnique, {
  defaultMessage: "une erreur c`est produit categorieShema",
});
module.exports = categorieSousShema;
