import React, { useEffect , useState } from "react";
import { NavLink } from "react-router-dom";
import {getonepermission} from '../../api/permission'
import { useTranslation } from 'react-i18next'

import {decodetoken} from '../../utils'
import "../../style/menu.css";
import { TokenExpiredError } from "jsonwebtoken";

 const Menu = (props) => {
const [permission, setpermissionstate] = useState([])
    const getpersmission =  () =>  {
      let token = decodetoken()
      if (token){
      if(token.role == 'admin')
      setpermissionstate(["collecte", "Parametre","Comptabilité","Rapport","stockage"])
      if(token.permission!=="" && token.role!=="admin"){
      console.log(token)
      getonepermission(token.permission)
      .then(res => { console.log(res.data) ; setpermissionstate( res.data.Premission) })
      .catch(err => console.log(err))
      }
    }
  }
    useEffect(() => {
      getpersmission()
    }, [])


  const { t, i18n } = useTranslation()

    return (
      <div>
        <div>

          <aside
            className="main-sidebar elevation-4 sidebar-light-lightblue "
            style={{ position: "absolute" }}
            data-widget="pushmenu"
          >
            <div className="sidebar">
              <div className="user-panel mt-3 pb-3 mb-3 d-flex"></div>

              <nav className="mt-1">
                <ul
                  className="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                 <li className="nav-item has-treeview ">
                    <NavLink to="/dashboard"  activeClassName="active" className="nav-link">
                      <i className="nav-icon fas fa-tachometer-alt"></i>
                      <p>  {t('Menu.Dashboard')} </p>
                    </NavLink>
                  </li>
                  {permission.includes('stockage') && 
                  <li className="nav-item has-treeview">
                    <NavLink to="piececomptable" activeClassName="active" className="nav-link">
                      <i className="nav-icon fas fa-copy"></i>
                      <p> {t('Menu.piececompatble')}</p>
                    </NavLink>
                  </li>
                  }
                  {permission.includes('Rapport') &&
                  <li className="nav-item has-treeview">
                    <NavLink to="/mesdeclaration" activeClassName="active" className="nav-link">
                      <i className="nav-icon fas fa-clipboard"></i>
                      <p> {t('Menu.declaration')} </p>
                    </NavLink>
                  </li>
                           }
                 {permission.includes('Comptabilité') &&
                  <li className="nav-item has-treeview">

                    <NavLink to="/comptabilite" className="nav-link">
                      <i className="nav-icon fas fa-newspaper"></i>
                      <p>  {t('Menu.comptabilite')}</p>
                    </NavLink>
                  </li>
                        }
                  {permission.includes('Parametre') && <li className="nav-item ">
                    <NavLink to="/parametre" activeClassName="active" className="nav-link">
                      <i className="nav-icon fas fa-cog"></i>
                      <p> {t('Menu.Parametre')} </p>
                    </NavLink>
                  </li> }
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    );
  
}
export default  Menu