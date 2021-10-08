import React, { Component } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
  const Parametre = () =>   {
    const { t, i18n } = useTranslation()
    return (
      <div>
        <Header />
        <Menu />
        <div className="parametre">
          <p className="connexion">
            <b>{t('Parametre.titel')} </b>
          </p>
          <hr className="hr1" />
            <div className="row text-center mt-4 mb-4">
              <div className="col-sm-3">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="/clientFournisseur"
                >
                  <i className="fa fa-user-circle fa-2x"></i>
                  <br />
                  <br />
                  {t('Parametre.FournisseurClient')}
                 
                </Link>
              </div>
              <div className="col-sm-3">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="/categorie"
                >
                  <i className="fa fa-sitemap fa-2x"></i>
                  <br />
                  <br />
                 {t('Parametre.categories')}
                </Link>
              </div>

              <div className="col-sm-3">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="dateexrcice"
                >
                  <i className="fa fa-calendar fa-2x"></i>
                  <br />
                  <br />
                  {t('Parametre.dateexercices')}
              
                </Link>
              </div>

              <div className="col-sm-3">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="/rolePermission"
                >
                  <i className="fa fa-file-invoice fa-2x"></i>
                  <br />
                  <br />
                  {t('Parametre.permissionetrole')}
              
                
                </Link>
              </div>
              </div>
              <div className="row text-center mt-8" > 
              <div className="col-sm-3">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="/planComptable"
                >
                  <i className="fa fa-university fa-2x"></i>
                  <br />
                  <br />
                  {t('Parametre.Plancomptable')}
                 
                </Link>
              </div>

              <div className="col-sm-3">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="/organisation"
                >
                  <i className="fa fa-cogs fa-2x"></i>
                  <br />
                  <br />
                  {t('Parametre.Organisation')}
               
                </Link>
              </div>

              <div
                className="col-sm-3 col-centered"
                style={{ alignSelf: "center" }}
              >
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="/acceutilisateur"
                >
                  <i className="nav-icon fas fa-user-friends"></i>
                  <br />
                  <br />
                  {t('Parametre.AceesUtilisateurs')}
              
                </Link>
              </div>
            </div>
         
        </div>
      </div>
    );
  }

  export default Parametre
