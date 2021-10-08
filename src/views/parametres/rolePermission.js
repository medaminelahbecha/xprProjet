import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { Popconfirm } from "antd";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next'
import { Getallpermission,Updatepermission ,deletepermission,postpermission } from "../../action/permission";
//import { Getallpermission, postpermission,deletepermission,Updatepermission } from "../../action/permission";
function RolePermission(props) {
  const { t, i18n } = useTranslation()
  const [smShow, setSmShow] = useState(false);
  const [updateform, setupdateform] = useState(false);
  const { addToast } = useToasts();

  const roleList = [
    { id: "1", Role: "proprietaire", Description: "acce complet" },
    {
      id: "2",
      Role: "employe",
      Description:
        "Peut visualiser seulement ses propres documents. Ne peut pas valider	",
    },
  ];
  const initialFormState = {
    Role: "",
    Description: "",
    collect: "",
    parametre: "",
    comptabilite: "",
    rapport: "",
    stockage: "",
  };

  const [roles,setRoles ] = useState(roleList);
  const [currentRole, setCurrentRole] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  const [role, setRole] = useState(initialFormState);

  useEffect(() => {
props.Getallpermission()
   }, [])
  useEffect(() => {
   if(props.Permission.length>0) {
     setRoles(props.Permission)
   }
  }, [props.Permission]);
  const addRole = () => {
    let tab = [] ;
if(role.collect == "true")
  tab.push("collecte")
if(role.parametre == "true")
tab.push("Parametre")
if(role.comptabilite == "true")
tab.push("Comptabilité")
if(role.rapport == "true")
tab.push("Rapport")
if(role.stockage == "true")
tab.push("stockage")
let object = Object.assign(role,{Premission : tab})
    props.postpermission(object)
    setRoles([...roles, role]);
    addToast("role ajouter", {
      appearance: "info",
      autoDismiss: true,
    });
  };

  const deleteRole = (id) => {
    setEditing(false);
    props.deletepermission(id)
    setRoles(roles.filter((role) => role._id !== id));
    addToast("role suprimé", {
      appearance: "info",
      autoDismiss: true,
    });
  };

  const updateRole = () => {
    setEditing(false);
let tab = [] ;
if(currentRole.collect == true)
  tab.push("collecte")
if(currentRole.parametre == true)
tab.push("Parametre")
if(currentRole.comptabilite == true)
tab.push("Comptabilité")
if(currentRole.rapport == true)
tab.push("Rapport")
if(currentRole.stockage == true)
tab.push("stockage")
 let obj = Object.assign(currentRole,{Premission : tab})
 props.Updatepermission(obj)
    addToast("role modifier", {
      appearance: "info",
      autoDismiss: true,
    });
    setupdateform(false)
  };
  const handleInputChangeedit = (event) => {
    let { name, value } = event.target;
    console.log(value , typeof value)
    if(value =='true') value=true;
    if (value =='false') value=false
    setCurrentRole({ ...currentRole, [name]: value });
  };
  const editRow = (role) => {
    setEditing(true);
    setupdateform(true)
    console.log(role , role.Premission.includes("stockage"))
    setCurrentRole({
      _id: role._id,
      Role: role.Role,
      Description: role.Description,
      collect: role.Premission.includes('collecte'),
      parametre:role.Premission.includes('Parametre'),
      comptabilite:role.Premission.includes('Comptabilité'),
      rapport:role.Premission.includes('Rapport'),
      stockage:role.Premission.includes('stockage')     
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setRole({ ...role, [name]: value });
  };
  return (
    <div>
      <Header />
      <Menu />
      <div className="parametre">
        <p className="connexion">
          <b>{t('RolePermission.titel')}  </b>
        </p>
        <div className="organisation-body">
          <hr className="hr1" />
          <br />
          <div className="card">
            <div className="card-header">
              <button
                className="accee-btn"
                style={{ alignContent: "end" }}
                onDoubleClick={() =>setSmShow(false)}
                onClick={() => setSmShow(true)}
              >
                <span style={{ color: "white" }}>
                  <b>{t('RolePermission.btnadd')} </b>
                </span>
              </button>
            </div>

            <div className=" p-0">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ widht: " 10px" }}>{t('RolePermission.tab_Name')} </th>
                    <th>{t('RolePermission.tab_Description')} </th>

                    <th style={{ widht: " 40px" }}>{t('RolePermission.tab_Actions')}   </th>
                  </tr>
                </thead>
               
                    <tbody>
                    {roles.map((role) => {
                  return (
                      <tr>
                        <td>{role.Role}</td>
                        <td>{role.Description}</td>

                        <td>
                          <button
                            className="btn btn-success btn-sm rounded-0"
                            type="button"
                            onDoubleClick={() =>setupdateform(false)}
                            onClick={() => {
                              editRow(role);
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </button>

                          {roles.length >= 1 ? (
                            <Popconfirm
                              title="Sure to delete?"
                              onConfirm={() => deleteRole(role._id)}
                            >
                              <button
                                className="btn btn-danger btn-sm rounded-0"
                                type="button"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </Popconfirm>
                          ) : null}
                        </td>
                      </tr>
              
                  );
                })}
              </tbody>
              </table>
            </div>
          </div>

          {smShow ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();

                addRole(role);

                setRole(initialFormState);
              }}
            >
              <div style={{ border: "9px solid rgba(214, 214, 214, 0.2)" }}>
                <p className="role">
                  <b>{t('RolePermission.addmodal_titel')} </b>
                </p>
                <hr className="hr1" />
                <div className="row justify-content-md-center">
                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.addmodal_Nom')} </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Role"
                        value={role.Role}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.addmodal_adddocument')} </label>
                      <select
                        className="form-control"
                        name="collect"
                        value={role.collect}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                      >
                        <option value="false">Pas d'accès</option>
                        <option value="true">accé</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.addmodal_Parametre')}  </label>
                      <select
                        className="form-control"
                        name="parametre"
                        value={role.parametre}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                      >
                        <option value="false">Pas d'accès</option>
                        <option value="true">accé</option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.addmodal_Rapport')}   </label>
                      <select
                        className="form-control"
                        name="rapport"
                        value={role.rapport}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                      >
                        <option value="false">Pas d'accès</option>
                        <option value="true">accé</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-md-center">
                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel"> {t('RolePermission.addmodal_piececomptable')}</label>
                      <select
                        className="form-control"
                        name="stockage"
                        value={role.stockage}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                      >
                        <option value="false">Pas d'accès</option>
                        <option value="true">accé</option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">
                      {t('RolePermission.addmodal_macomptable')}
                    
                      </label>
                      <select
                        className="form-control"
                        name="comptabilite"
                        value={role.comptabilite}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                      >
                        <option value="false">Pas d'accès</option>
                        <option value="true">accé</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.addmodal_Description')} </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Description"
                        value={role.Description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="organisation-btn"
                  style={{ alignSelf: "center" }}
                >
                  <span style={{ color: "white" }}>
                    <b> {t('RolePermission.addmodal_Enregistrer')} </b>
                  </span>
                </button>
              </div>
            </form>
          ) : null}
          {/* update permission */ }
          {updateform && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                updateRole();
              }}
            >
              <div style={{ border: "9px solid rgba(214, 214, 214, 0.2)" }}>
                <p className="role">
                  <b> {t('RolePermission.updatemodal_titel')}  </b>
                </p>
                <hr className="hr1" />
                <div className="row justify-content-md-center">
                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.updatemodal_Nom')} </label>
                      <input
                        type="text"
                        className="form-control"
                        name="Role"
                        value={currentRole.Role}
                        onChange={handleInputChangeedit}
                      />
                    </div>
                  </div>

                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.updatemodal_adddocument')}  </label>
                      <select
                        className="form-control"
                        name="collect"
                        value={currentRole.collect}
                        onChange={handleInputChangeedit}
                        style={{ width: "100%" }}
                      >
                        <option value={false}>Pas d'accès</option>
                        <option value={true}>accé</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.updatemodal_Parametre')}  </label>
                      <select
                        className="form-control"
                        name="parametre"
                        value={currentRole.parametre}
                        onChange={handleInputChangeedit}
                        style={{ width: "100%" }}
                      >
                        <option value={false}>Pas d'accès</option>
                        <option value={true}>accé</option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.updatemodal_Rapport')} </label>
                      <select
                        className="form-control"
                        name="rapport"
                        value={currentRole.rapport}
                        onChange={handleInputChangeedit}
                        style={{ width: "100%" }}
                      >
                        <option value={false}>Pas d'accès</option>
                        <option value={true}>accé</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-md-center">
                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.updatemodal_piececomptable')} </label>
                      <select
                        className="form-control"
                        name="stockage"
                        value={currentRole.stockage}
                        onChange={handleInputChangeedit}
                        style={{ width: "100%" }}
                      >
                        <option value={false}>Pas d'accès</option>
                        <option value={true}>accé</option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-lg-3">
                    <div className="form-group">
                      <label className="roleLabel">
                      {t('RolePermission.updatemodal_macomptable')}
                    
                      </label>
                      <select
                        className="form-control"
                        name="comptabilite"
                        value={currentRole.comptabilite}
                        onChange={handleInputChangeedit}
                        style={{ width: "100%" }}
                      >
                        <option value={false}>Pas d'accès</option>
                        <option value={true}>accé</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-md-center">
                  <div className="col col-lg-6">
                    <div className="form-group">
                      <label className="roleLabel">{t('RolePermission.updatemodal_Description')}</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Description"
                        value={currentRole.Description}
                        onChange={handleInputChangeedit}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="organisation-btn"
                  style={{ alignSelf: "center" }}
                >
                  <span style={{ color: "white" }}>
                    <b>{t('RolePermission.updatemodal_Enregistrer')}</b>
                  </span>
                </button>
              </div>
            </form>
          ) }
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = function (store) {
  return {
    Permission: store.Permission.Permission,
  };
}
export default connect( mapStateToProps, {Getallpermission,deletepermission ,postpermission, Updatepermission})(RolePermission)