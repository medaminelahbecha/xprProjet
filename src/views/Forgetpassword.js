
import React, { Component } from "react";
import { connect } from 'react-redux'
//import M from "materialize-css";
import {Forgetlogin} from '../action/useraction'
import "../style/views.css";
import { Link} from "react-router-dom";
import "../style/views.css";
import { withTranslation } from 'react-i18next';
const initialState = {
  
  email:'',
  confirmemail:'',
  message:''

  };

 class LoginForget extends Component {
  
  constructor(props) {
    super(props);
    this.state = initialState;
   

  }


handleChange = (event) => {
  let name = event.target.name;
  let value = event.target.value;
  this.setState({[name] : value})

}

handelsubmit = (event) => {

 event.preventDefault();
 if (this.state.email === this.state.confirmemail){
  this.props.Forgetlogin({email :this.state.email})
  this.setState(initialState);
 }

console.log(this.state)


}
componentWillReceiveProps(nextProps) {
  this.setState({message :nextProps.user.Userconnected.msg })
console.log(nextProps.user.Userconnected.msg)
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
          </nav>

        <form onSubmit={this.handelsubmit}>
        
          <div className="card-body">
          <p>{this.state.message}</p>
            <p className="connexion">
              <b>{this.props.t('LoginForget.titel')} </b>
            </p>
          
            <p className="email pl-5">{this.props.t('LoginForget.Email')}</p>
            <div className="input-group m-auto">
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email} onChange={this.handleChange}
               
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group pl-5">
       
            </div>
            <p className="email mr-2">{this.props.t('LoginForget.confirmEmail')}</p>
            <div className="input-group m-auto">
              <input
                type="text"
                className="form-control"
                name="confirmemail"
                value={this.state.confirmemail}  onChange={this.handleChange} 
               
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
             
            </div>
            <br />

            <p>
            
            </p>
            <br />
            <div className="row">
              <div className="col-4">
                <button type="submit" className="login-btn">
                {this.props.t('LoginForget.send')}  
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
const  mapdispatchtoprops = (disptach) => ({
  Forgetlogin : (obj) => disptach(Forgetlogin(obj))
 
 })
 const mapStateToProps = function (store) {
  return {
      user: store.user
  };
}
export default connect(mapStateToProps,mapdispatchtoprops)( withTranslation('')( withTranslation('')(LoginForget)))