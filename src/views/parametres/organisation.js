import React, { useState, useMemo, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import Select from "react-select";
import countryList from "react-select-country-list";
import Payes from  '../../utils/payes'
//import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next'
import { connect } from "react-redux";
import {
  Updateorganisation,
  getonorganisation,
} from "../../action/organisation";
import { devises } from "./deviseList";

function Organisation(props) {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState({ label: "Tunisia", value: "TN" });
  const options = useMemo(() => countryList().getData(), []);
  const [defaultorgn, setdefaultorgn] = useState({
    Rib_banc: "",
    Adresse: "",
    Nom_banque: "",
    Mat_fiscal: "",
    Nom: "",
    Email_facture: "",
  });
  useEffect(() => {
    props.getonorganisation();
  }, []);
  useEffect(() => {
    if (props.orgn.length > 0) setdefaultorgn(props.orgn[0]);
  }, [props.orgn]);
  const changeHandler = (event) => {
    console.log(event.target)
     let name = event.target.name;
     let value = event.target.value;
     setdefaultorgn({ ...defaultorgn, [name]: value });
  };
  const changeHandlerselect = event => {
  console.log(event.target.value)
   setdefaultorgn({ ...defaultorgn  ,Payes : event.target.value })
  };
  // const { register, handleSubmit, errors } = useForm();
  const onSubmit = (event) => {
    event.preventDefault();
    let id = props.orgn[0]._id;
    let organisation = Object.assign(defaultorgn, { _id: id });
    props.Updateorganisation(organisation);
  };

  return (
    <div>
      <Header />
      <Menu />

      <form onSubmit={onSubmit}>
        <div className="parametre">
          <p className="connexion">
            <b>{t('organisation.titel')} </b>
          </p>
          <div className="organisation-body">
            <p
              style={{
                textAlign: "center",
                fontFamily: "Roboto",
                fontSize: "25px",
              }}
            >
              <b>{t('organisation.Detail')} </b>
            </p>
            <br />
            <hr className="hr1" />
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="organisation-Label">
                  {t('organisation.nomest')}
                  </label>
                  <input
                    name="Nom"
                    type="text"
                    className="form-control"
                    onChange={changeHandler}
                    defaultValue={defaultorgn.Nom}
                  />
                </div>

                <div className="form-group">
                  <label className="organisation-Label">
                  {t('organisation.emailfact')} 
                  </label>
                  <input
                    name="Email_facture"
                    type="text"
                    onChange={changeHandler}
                    defaultValue={defaultorgn.Email_facture}
                    className="form-control"
                    //ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="organisation-Label">
                  {t('organisation.matfiscal')}   
                  </label>
                  <input
                    name="Mat_fiscal"
                    type="text"
                    onChange={changeHandler}
                    defaultValue={defaultorgn.Mat_fiscal}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="organisation-Label">
                  {t('organisation.adressfact')}  
                  </label>
                  <input
                    name="Adresse"
                    type="text"
                    onChange={changeHandler}
                    className="form-control"
                    value={defaultorgn.Adresse}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="organisation-Label">{t('organisation.Pays')}  </label>
                  <Payes
                    name="Payes"
                    className="form-control"
                    onChange={changeHandlerselect}
                    value={defaultorgn.Payes}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="organisation-Label">{t('organisation.Devise')}  </label>
                  <input
                    list="or-devise"
                    name="Devis"
                    onChange={changeHandler}
                    className="form-control"
                    value={defaultorgn.Devis}
                    style={{ width: "100%" }}
                  />
                  <datalist id="or-devise">
                    {devises.map((el, index) => {
                      return (
                        <option key={index} value={el.devise}>
                          {el.pays} ({el.devise})
                        </option>
                      );
                    })}
                  </datalist>
                </div>
              </div>

              <br />
              <br />
              <div className="row">
                <div className="col-4">
                  <button className="organisation-btn">
                    <span style={{ color: "white" }}>
                      <b>{t('organisation.save')}  </b>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = function (store) {
  return {
    orgn: store.organisation.Orgn,
  };
};
const mapdispatchtoprops = (disptach) => ({
  getonorganisation: () => disptach(getonorganisation()),
  Updateorganisation: (obj) => disptach(Updateorganisation(obj)),
});
export default connect(mapStateToProps, mapdispatchtoprops)(Organisation);
