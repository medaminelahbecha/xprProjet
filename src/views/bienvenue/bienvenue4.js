import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import "../../style/views.css";
import { useTranslation } from 'react-i18next'
const Bienvenue4  = () => {
  const { t, i18n } = useTranslation()
    return (
      <div>
        <body>
          <nav className="navbar navbar-dark bg-light">
            <Link className="navbar-brand" to="#">
              <img
                src="/template/img/xpr1.png"
                width="188"
                height="30px"
                alt=""
              />
            </Link>
          </nav>
          <div className="card-body">
            <p className="connexion">
              <b> {t('Bienvenue4.merci')} </b>
            </p>
            <br />
            <p style={{ textAlign: "center" }}>
              <b> {t('Bienvenue4.organisationlabel')}   </b>
            </p>

            <p style={{ marginLeft: "310px" }} className="email">
              <b>  {t('Bienvenue4.organisationvalue')} </b>
            </p>

            <p style={{ textAlign: "center" }}>
              <b>{t('Bienvenue4.status')} </b>
            </p>
            <br />

            <hr />
            <br />
            <br />
            <div className="row">
              <div className="col-4">
                <Link to="/">
                  <button type="submit" className="login-btn">
                  {t('Bienvenue4.btn')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }

export default Bienvenue4