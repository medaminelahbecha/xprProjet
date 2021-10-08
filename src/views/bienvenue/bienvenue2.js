import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import "../../style/views.css";
import {Updateorganisation} from '../../action/organisation'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../../components/menu/lang'
const  Bienvenue2  = (props) =>  {
  const { t, i18n } = useTranslation()
  const [Mat_fiscal, setState] = useState('')

 const  handleChange = (event) =>
  {
    setState(event.target.value)
  }
 const  handelsubmit = (event) => {
    event.preventDefault();
    if (Mat_fiscal.length > 0){
      let data = {
        _id :  localStorage.getItem('organisation'),
        Mat_fiscal: Mat_fiscal
      }
      props.Updateorganisation(data)
    }
    props.history.push("/bienvenue3")
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
            <span><LanguageSelector/></span>
          </nav>
          <form className="card-body" onSubmit={handelsubmit}>
            <p className="connexion">
              <b>  {t('Bienvenue2.titel')}  </b>
            </p>
            <br />
            <p style={{ textAlign: "center" }}>
              <b>
              {t('Bienvenue2.description')}
               
              </b>
            </p>
            <br />
            <p style={{ marginLeft: "240px" }}  className="email pl-5">
              <b>  {t('Bienvenue2.matfiscal')} </b>
            </p>
            <br />
            <div className="input-group m-auto">
              <input type="text" className="form-control" name="Mat_fiscal" onChange={handleChange} />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-newspaper"></span>
                </div>
              </div>
            </div>

            <br />
            <br />
            <div className="row">
              <div className="col-4">
                  <button type="submit" className="login-btn">
                  {t('Bienvenue2.btn')} 
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
 export default connect (null , mapdispatchtoprops)(Bienvenue2)