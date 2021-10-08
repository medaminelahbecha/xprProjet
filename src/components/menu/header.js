import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../style/menu.css";
import { useTranslation } from 'react-i18next'
import { logout } from "../../utils";
import { Modal } from "react-bootstrap";
import LanguageSelector from "./lang"
const  Header = (props)  => {
  const log_out = () => {
    console.log('logout')

    logout();
    window.location.href = "/login";
  };
    const { t, i18n } = useTranslation()

    return (
      <div>
        <header className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse d-flex justify-content-between">
            <Link to="/" className="brand-link">
              <img className="brand" src="/template/img/xpr1.png" alt="XPR" />
            </Link>
            <ul className="navbar-nav ">
              <li class="nav-item col">
                <Link to="/feedback" className="nav-link">
               <span >
               <i className="fas fa-info-circle fa-2x" style={{ Color:"blue"}}></i>
               </span>
                 
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/scaner" className="nav-link ">
                  <img
                    src="/template/img/plus.png"
                    className="rounded-circle"
                    alt="Plus"
                  />
                  {t('Navbar.AjouterDocuments')}
                </Link>
              </li>
              <li className="nav-link "><LanguageSelector/></li>
              <li
                className="nav-item dropdown  user user-menu "
                style={{ top: "18px" }}
              >
                <div className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="/template/img/user2-160x160.jpg"
                    className="user-image"
                    alt="User"
                  />
                  <span>
                    {props.user.fname} {props.user.lname}
                  </span>
                </div>

                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <div className="dropdown-divider"></div>
                  <Link to="/profil" className="dropdown-item">
                    <i className="fas fa-id-card "></i>
                    {t('Navbar.Profile')}
                  
                  </Link>

                  <span className="dropdown-item">
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={log_out}
                      className="fas fa-power-off mr-2 "
                    >
                      {t('Navbar.logout')}
                   
                    </i>
                  </span>
                </div>
              </li>

            
              
            </ul>
          </div>
        </header>
      </div>
    );
  }

const mapStateToProps = function (store) {
  console.log("mapToStateProps", store.organisation.Orgn);
  return {
    user: store.user.Userconnected,
  };
};
export default connect(mapStateToProps, null)(Header);
