import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup, resendmail } from "../action/useraction";
import "react-phone-input-2/lib/style.css";
import { connect } from "react-redux";

const initialState = {
  sendForm: false,
  fname: "",
  lname: "",
  email: "",
  password: "",
  subdomaine: "",
};
let objectemail = "";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    //this.setState(nextProps);
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value.replace(/\s+/g, '').toLowerCase() });
  };

  handelsubmit = (event) => {
    event.preventDefault();
    objectemail = this.state.email
   this.props.signup(this.state);
    console.log(this.state);
    this.setState(initialState);
    this.setState({ sendForm: true });
  };
  resned = () => {
    this.props.resendmail({ email: objectemail });
  };
  render() {
    return (
      <div>
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

        {!this.state.sendForm ? (
          <>
            {" "}
            <form onSubmit={this.handelsubmit}>
              <div className="card-body">
                <p className="connexion">
                  <b>S'inscrire</b>
                </p>

                <p className="email pl-5">Nom de l'organisation</p>
                <div className="input-group m-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.subdomaine}
                    name="subdomaine"
                    onChange={this.handleChange}
                  />

                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-university"></span>
                    </div>
                  </div>
                </div>

                <p className="email pl-5">Nom</p>
                <div className="input-group m-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.fname}
                    name="fname"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user-circle"></span>
                    </div>
                  </div>
                </div>
                <p className="email pl-5">Prénom</p>
                <div className="input-group m-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.lname}
                    name="lname"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user-circle"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3"></div>

                <br />
                <p className="email pl-5">Email</p>
                <div className="input-group m-auto">
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    className="form-control"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-4">
                    <button type="submit" className="login-btn">
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="centre_v_et_h">
            {this.props.user.length === 0 ? (
              <div>
                <i icon="loading" />{" "}
                <h3 className="text-center text-info">Envoi en cours..</h3>
              </div>
            ) : (
              <div>
                <h3 className="mt-n2 text-center text-success">
                  {" "}
                  <span className="fas fa-check" />
                  Merci de nous avoir choisi ! Un email a été envoyé à , merci
                  de vérifier votre boite mail pour continuer.{" "}
                </h3>
                <h5 className="text-center">
                  Cliquer
                  <i className="now-ui-icons loader_gear spin"></i>
                  <i className="now-ui-icons ui-1_check"></i>
                  <span
                    style={{ color: "#0000EE", cursor: "pointer" }}
                    onClick={this.resend}
                  >
                    {" "}
                    ici
                  </span>{" "}
                  pour renvoyer
                </h5>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = function (store) {
  return {
    user: store.user.message,
  };
};
const mapdispatchtoprops = (disptach) => ({
  signup: (obj) => disptach(signup(obj)),
  resendmail: (obj) => disptach(resendmail(obj)),
});
export default connect(mapStateToProps, mapdispatchtoprops)(Register);
