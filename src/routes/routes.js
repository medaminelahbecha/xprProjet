import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import Login from "../views/login";
import Register from "../views/register";
import Home from "../views/home";
import Bienvenue1 from "../views/bienvenue/bienvenue1";
import Bienvenue2 from "../views/bienvenue/bienvenue2";
import Bienvenue3 from "../views/bienvenue/bienvenue3";
import Bienvenue4 from "../views/bienvenue/bienvenue4";
import Organisation from "../views/parametres/organisation";
import AcceUtilisateur from "../views/parametres/aceeUtilisateur";
import RoleEtPermission from "../views/parametres/rolePermission";
import LoginForget from "../views/Forgetpassword";
import Parametre from "../views/parametres/parametre";
import Profil from "../views/profil";
import Password from "../views/password";
import Scaner from "../views/facture/scanerfacture";
import DetailFacture from "../views/facture/detaillsFacture";
import PieceComptable from "../views/facture/pieceComptable";
import Categorie from "../views/categorie";
import Dashboard from "../views/dashboard";
import Declaration from "../views/declaration ";
import DateExercice from "../views/parametres/dateExercice";
import PlanComptable from "../views/parametres/planComptable";
import ClientFournissur from "../views/parametres/clientFournisseur";
import Notfound from "../components/notfound";
import PrivateRoute from "./privateRoutes";
import Comptabilite from "../views/comptabilite/comptabilite";
import EcritureComptable from "../views/comptabilite/ecritureComptable";
import donnesComptablitite from "../views/comptabilite/donnesComptablitite";
import Feedback from "../views/feedback";

export default function createRoutes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Dashboard} />
        <PrivateRoute exact path="/comptabilite" component={Comptabilite} />
        <PrivateRoute exact path="/export" component={EcritureComptable} />
        <Route path="/login" component={Login} />
        <Route path="/LoginForget" component={LoginForget} />
        <Route path="/register" component={Register} />
        <Route path="/bienvenue1" exact component={Bienvenue1} />
        <Route path="/bienvenue2" exact component={Bienvenue2} />
        <Route path="/bienvenue3" exact component={Bienvenue3} />
        <Route path="/bienvenue4" exact component={Bienvenue4} />
        <PrivateRoute path="/organisation" component={Organisation} />
        <PrivateRoute path="/acceutilisateur" component={AcceUtilisateur} />
        <PrivateRoute path="/rolePermission" component={RoleEtPermission} />
        <PrivateRoute path="/parametre" component={Parametre} />
        <PrivateRoute path="/profil" component={Profil} />
        <Route path="/password" component={Password} />
        <PrivateRoute path="/scaner" component={Scaner} />
        <PrivateRoute path="/DetailFacture" component={DetailFacture} />
        <PrivateRoute path="/piececomptable" component={PieceComptable} />
        <PrivateRoute path="/categorie" component={Categorie} />
        <PrivateRoute path="/dateexrcice" component={DateExercice} />
        <PrivateRoute path="/planComptable" component={PlanComptable} />
        <PrivateRoute path="/clientFournisseur" component={ClientFournissur} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/mesdeclaration" component={Declaration} />
        <PrivateRoute exact path="/feedback" component={Feedback} />
        <PrivateRoute
          exact
          path="/donnecomptabilite"
          component={donnesComptablitite}
        />
        <Route path="/404" component={Notfound} />
        <Redirect exact path="***" to="/404" />
      </Switch>
    </Router>
  );
}
