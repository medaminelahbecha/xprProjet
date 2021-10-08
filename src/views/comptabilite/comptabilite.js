import React from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
const  Comptabilite = (props) => {
  const { t, i18n } = useTranslation()
    return (
      <div>
        <Header />
        <Menu />
        <div className="parametre">
          <p className="connexion">
              <br/>
            <b>   {t('Comptabilite.titel')}   </b>
          </p>
          <hr className="hr1" />
          <div className="col-sm-11">
            <div className="row text-center">
              <div className="col-sm-4">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="/export"
                >
                  <i className="fa fa-file-alt fa-2x"></i>
                  <br />
                  <br />
                  {t('Comptabilite.exportecreture')}
                
                </Link>
              </div>

              <div className="col-sm-4">
                <Link
                  className="btn btn-block btn-lg btn-outline-primary setting-index-btn"
                  to="donnecomptabilite"
                >
                  <i className="fa fa-calendar fa-2x"></i>
                  <br />
                  <br />
                  {t('Comptabilite.donnercomptabiliter')}
                
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}
export default Comptabilite
