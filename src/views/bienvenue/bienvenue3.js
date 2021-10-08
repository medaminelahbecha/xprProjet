import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Updateorganisation} from '../../action/organisation'
import "../../style/views.css";
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
const  Bienvenue3 = (props) => {
  const { t, i18n } = useTranslation()
  const [Nbremployer, setState] = useState('')

 const handleChange = (event) =>
  {
    setState( event.target.value)
  }
 const handelsubmit = (event) => {
    event.preventDefault();
    if (Nbremployer.length > 0){
      let data = {
        _id :  localStorage.getItem('organisation'),
        Nbremployer : Nbremployer
      }
      props.Updateorganisation(data)
    }
    props.history.push("/bienvenue4")
   }

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
          <form onSubmit={handelsubmit} className="card-body">
            <p className="connexion">
              <b>  {t('Bienvenue3.titel')} </b>
            </p>
            <br />
            <p style={{ textAlign: "center" }}>
              <b> {t('Bienvenue3.description')}
              
              </b>
            </p>
            <br />
            <p style={{ marginLeft: "240px" }} className="email pl-5">
              <b>{t('Bienvenue3.nbremployer')}</b>
            </p>
            <br />
            <div className="input-group m-auto">
              <input type="text" className="form-control" name="nbremployer" onChange={handleChange} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user-circle"></span>
                </div>
              </div>
            </div>

            <br />
            <br />
            <div className="row">
              <div className="col-4">
                  <button type="submit" className="login-btn">
                  {t('Bienvenue3.btn')}
                 
                  </button>
              </div>
            </div>
          </form>
        </body>
      </div>
    );
  }

const  mapdispatchtoprops = (disptach) => ({
  Updateorganisation : (obj) => disptach(Updateorganisation(obj))
 
 })

 export default connect (null , mapdispatchtoprops)(Bienvenue3)