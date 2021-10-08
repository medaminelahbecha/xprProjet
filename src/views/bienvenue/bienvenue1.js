import React, { Component } from "react";
import { Link  } from "react-router-dom";
import {Updateorganisation , getonorganisation} from '../../action/organisation'
import "../../style/views.css";
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next';
 class Bienvenue1 extends Component {
   componentDidMount(){
     this.props.getonorganisation()
   }
  constructor(props) {
    super(props);
    this.state = {
      Nom:''
    };
   

  }
  handleChange = (event) =>
  {
    this.setState({Nom : event.target.value})
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if(this.props.Orgn.length > 0)
    localStorage.setItem('organisation',this.props.Orgn[0]._id)
}
  handelsubmit = (event) => {
    event.preventDefault();

    if (this.state.Nom.length > 0){
     let data = {
       _id :  localStorage.getItem('organisation'),
       Nom : this.state.Nom
     }
      this.props.Updateorganisation(data)
    }
    this.props.history.push("/bienvenue2")
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
          <div className="card-body">
            <p className="connexion">
              <b>{this.props.t('Bienvenue1.titel') }</b>
            </p>
            <br />
            <p style={{ textAlign: "center" }}>
              <b>{this.props.t('Bienvenue1.organisation_question') } </b>
            </p>
            <br />
            <form onSubmit={this.handelsubmit}>
            <p style={{ marginLeft: "240px" }} className="email pl-5">
              <b>{this.props.t('Bienvenue1.Nomorganisation') } </b>
            </p>
            <br />
            <div className="input-group m-auto">
              <input type="text" className="form-control" name='organisation' onChange={this.handleChange}/>
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-university"></span>
                </div>
              </div>
            </div>

            <br />
            <br />

            <div className="row">
              <div className="col-4">
                  <button type="submit" className="login-btn">
                  {this.props.t('Bienvenue1.btn') }
                  </button>
              </div>
            </div>
            </form>
          </div>
        </body>
      </div>
    );
  }
}
const  mapdispatchtoprops = (disptach) => ({
  Updateorganisation : (obj) => disptach(Updateorganisation(obj)),
  getonorganisation : () => disptach(getonorganisation())
 
 })

export default connect(store => store.organisation ,mapdispatchtoprops)(withTranslation('')(Bienvenue1))