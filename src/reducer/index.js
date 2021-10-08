import { combineReducers } from "redux";
import { Clients } from "./client";
import { Fournisseurs } from "./fournissuer";
import { Users } from "./user";
import { Organisation } from "./organisation";
import { Factures } from "./facture";
import { Plans } from "./plancomptable";
import { Exercice } from "./exercice";
import { Permission } from "./permission";
import { Feedback } from "./feedback";
const allReducers = combineReducers({
  client: Clients,
  facture: Factures,
  fournisseur: Fournisseurs,
  user: Users,
  plans: Plans,
  exercice: Exercice,
  organisation: Organisation,
  Permission: Permission,
  feedback: Feedback,
});

export default allReducers;
