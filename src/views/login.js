import React, { Component } from "react";
import { connect } from "react-redux";
import { Loginn } from "../action/useraction";
import "../style/views.css";
import { Link } from "react-router-dom";
import "../style/views.css";
import LanguageSelector from '../components/menu/lang'
import { withTranslation } from 'react-i18next';
const initialState = {
  email: "",
  password: "",
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handelsubmit = (event) => {
    event.preventDefault();
    this.props.Loginn(this.state);
    console.log(this.state , this.props);
    this.setState(initialState);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.success === true) 
    this.props.history.push("/");

  }
  render() {
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

          <form onSubmit={this.handelsubmit}>
           
            <div className="card-body">
            
              <p className="connexion">
                <b>  {this.props.t('Login.titel')} </b>
              </p>
              <p className="input-group">{this.props.user.msg}</p>
              <p className="email pl-5">  {this.props.t('Login.Emaillabel')} </p>
              <div className="input-group m-auto">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-2"></div>
              <p className="email pl-5">  {this.props.t('Login.Passwordlabel')} </p>
              <div className="input-group m-auto">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3"></div>
              <br />

              <p>
                <Link to="/LoginForget">
                {this.props.t('Login.donthavaacount')}  
                </Link>
              </p>
              <br />
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="login-btn">
                  {this.props.t('Login.buttonlogin')}  
                  </button>
                </div>
              </div>
            </div>
          </form>
        </body>
      </div>
    );
  }
}

const mapStateToProps = function (store) {

  return {
    user: store.user.message,
  };
};
export default connect(mapStateToProps, {Loginn})(  withTranslation('')(Login));
