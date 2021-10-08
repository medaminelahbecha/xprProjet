import React, { Component } from "react";
import Header from "../components/menu/header";
import Menu from "../components/menu/menu";
import { getoneauthuser, UpdateUser } from "../action/useraction";
import { connect } from "react-redux";
import {decodetoken} from '../utils'
import { withTranslation } from 'react-i18next';
class Profil extends Component {
  componentDidMount() {
    if (localStorage.getItem('jwt')) {
    let Iduser = decodetoken()._id;
    this.props.getoneauthuser(Iduser);
    }
    else{
   let  iduser = localStorage.getItem('iduseradmin')
   this.props.getoneauthuser(iduser);
    }
 
   
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handelsubmit = (event) => {
    event.preventDefault();
    let user = Object.assign(this.state, {
      _id: decodetoken()._id,
    });
    this.props.UpdateUser([user]);
    console.log(user);
  };
  render() {
    if (
      this.props.user.date_naissance !== undefined && this.props.user.date_naissance !== null  &&
      this.props.user.date_naissance.length > 0
    )
      this.props.user.date_naissance = new Date(this.props.user.date_naissance)
        .toISOString()
        .substr(0, 10);

    return (
      <div>
        <Header />
        <Menu />
        <div className="card-body">
          <p className="role">
            <b>{this.props.t('Profil.titel') } </b>
          </p>
          <hr className="hr1" />
          <div className="row">
            <div
              className="image"
              style={{
                marginTop: "4cm",
              }}
            >
              <img
                src="/template/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>

            <div
              className="card text-center"
              style={{
                border: "6px solid rgba(214, 214, 214, 0.2)",
                marginLeft: "6cm",
                marginTop: "-8cm",
                minHeight: "12cm",
              }}
            >
              <form onSubmit={this.handelsubmit}>
                <div className="row justify-content-md-center">
                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="profilLabel">{this.props.t('Profil.Nom') } </label>
                      <input
                        onChange={this.handleChange}
                        name="fname"
                        type="text"
                        required
                        defaultValue={this.props.user.fname}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="profilLabel">{this.props.t('Profil.Prenom') }</label>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        name="lname"
                        defaultValue={this.props.user.lname}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="profilLabel">{this.props.t('Profil.Email') }</label>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        name="email"
                        defaultValue={this.props.user.email}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="profilLabel">{this.props.t('Profil.Role') }</label>
                      <input 
                      type="text"
                      name="role"
                      disabled
                      defaultValue={this.props.user.role ? this.props.user.role : 'admin'}
                      className="form-control"
                      />
          
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="profilLabel">{this.props.t('Profil.Sexe') }</label>
                      <select
                        className="form-control"
                        required
                        style={{ width: "100%" }}
                        onChange={this.handleChange}
                        name="sexe"
                        defaultValue={this.props.sexe}
                      >
                        <option value="DEFAULT" disabled>
                        {this.props.t('Profil.Sexe_default') }
                        </option>
                        <option value="Femme">{this.props.t('Profil.Sexe_option1') } </option>
                        <option value="Homme">{this.props.t('Profil.Sexe_option2') }</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="login-btn">
                  <span style={{ color: "white" }}>
                    <b>{this.props.t('Profil.save') }</b>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = function (store) {
  return {
    user: store.user.Userconnected,
  };
};

const mapdispatchtoprops = (disptach) => ({
  getoneauthuser: (obj) => disptach(getoneauthuser(obj)),
  UpdateUser: (obj) => disptach(UpdateUser(obj)),
});
export default connect(mapStateToProps, mapdispatchtoprops)(withTranslation('')(Profil));
