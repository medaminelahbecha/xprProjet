import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { Modal } from "react-bootstrap";
import { Popconfirm } from "antd";
import { useToasts } from "react-toast-notifications";
import {Getallpermission} from '../../action/permission'
import Pagination from '../../components/pagination'
import {Registeruser,Getalluser,deleteUser,getoneauthuser,UpdateUser } from "../../action/useraction";
import { connect } from "react-redux";
import {decodetoken} from '../../utils'
import { useTranslation } from 'react-i18next'
 function AceeUtilisateur(props) {
  const [smShow, setSmShow] = useState(false);
  const [update, setupdate ] = useState(false);
  const { addToast } = useToasts();
  const { t, i18n } = useTranslation()
  const acceUtilisateur = [
    { id: "1", email: " azizchahed@xpr.tn", role: "Employe" },
    { id: "2", email: " amine@esprit.tn", role: "Propriétaire" },
  ];
  const initialFormState = {
    id: null,
    email: "",
    role: "",
  };

  const [users, setUsers] = useState(acceUtilisateur);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [userA, setUserA] = useState(currentUser);
  const [state, setstate] = useState({pageLimit: "",
  totalPages:"",
  currentPage: "",
  startIndex: "",
  endIndex: ""})
  useEffect(() => {
    props.Getalluser()
    props.Getallpermission()
    if (localStorage.getItem('jwt')) {
      let Iduser = decodetoken()._id;
      props.getoneauthuser(Iduser);
      }
      else{
     let  iduser = localStorage.getItem('iduseradmin')
     props.getoneauthuser(iduser);
      }
  }, []);
  useEffect(() => {
     if(props.Users.length > 0)
      setUsers(props.Users);
  }, [props.Users , props.Userconnected]);
  const addUser = () => {
    if (user.permission !='' || user.permission!= undefined) {
    user.id = users.length + 1;
    setUsers([...users, user]);
    addToast("Utilisateur ajouter", {
      appearance: "info",
      autoDismiss: true,
    });
    let objectuser  = user
    if(props.Userconnected != "")
   Object.assign(objectuser , {sender:props.Userconnected.email})
    props.Registeruser(objectuser)
  }
  else 
  addToast("Permission required", {
    appearance: "error",
    autoDismiss: true,
  });
}

  const deleteUser = (id) => {
    setEditing(false);
    props.deleteUser(id)
    setUsers(users.filter((user) => user._id !== id));
    addToast("Utilasateur suprimé", {
      appearance: "success",
      autoDismiss: true,
    });
  };
  const onChangePage = data => {
    setstate({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };
  const updateUser = () => {
    setEditing(false);
    props.UpdateUser(userA)
  const newuser =   users.filter((user) => user._id !== userA._id)
    addToast("Utilisateur modifier", {
      appearance: "info",
      autoDismiss: true,
    });
   setUsers([...newuser ,userA])
  };

  const editRow = (user) => {
    setEditing(true);

    setUserA({
      _id: user._id,
      email: user.email,
      role: user.role,
      permission:user.permission
    });
  };
  const handelupdatechange = (event) => {
    const { name, value } = event.target;
    setUserA({ ...userA, [name]: value });
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const getnamestatue = ( id) => {
    if(id !== undefined){
    const permission = props.permission.find(el => el._id == id)
    if (permission!== undefined)
    return permission.Role
    }
  }
  let rowsPerPage = [];
  rowsPerPage = users.slice(state.startIndex, state.endIndex + 1)
  return (
    <div>
      <Header />
      <Menu />
      <div className="parametre">
        <p className="connexion">
          <b> {t('AceeUtilisateur.titel')}</b>
        </p>
        <div className="organisation-body">
          <hr className="hr1" />
          <br />
          <div className="card">
            <div className="card-header">
              <button
                onClick={() => setSmShow(true)}
                className="accee-btn"
                style={{ alignContent: "end" }}
              >
                <span style={{ color: "white" }}>
                  <b> {t('AceeUtilisateur.addnew')} </b>
                </span>
              </button>
            </div>

            <div className=" p-0">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ widht: " 10px" }}>{t('AceeUtilisateur.showuser_id')} </th>
                    <th>{t('AceeUtilisateur.showuser_Email')} </th>
                    <th>{t('AceeUtilisateur.showuser_Permission')} </th>
                    <th style={{ widht: " 40px" }}>{t('AceeUtilisateur.showuser_Statuts')} </th>
                    <th style={{ widht: " 40px" }}>{t('AceeUtilisateur.showuser_Actions')} </th>
                  </tr>
                </thead>
                {users.map((user,index) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          <span className="fas fa-envelope"></span>
                          {user.email}
                        </td>
                        <td>{user.permission ? getnamestatue(user.permission) : 'admin'}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            onClick={() => {
                              setupdate(true);
                              editRow(user);
                            }}
                            className="btn btn-success btn-sm rounded-0"
                            type="button"
                          >
                            <i className="fa fa-edit"></i>
                          </button>

                          {users.length >= 1 ? (
                            <Popconfirm
                              title="Sure to delete?"
                              onConfirm={() => deleteUser(user._id)}
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
                    </tbody>
                    
                  );
                })}
              </table>
              <Pagination
                        totalRecords={users.length}
                        pageLimit={state.pageLimit || 5}
                        initialPage={1}
                        pagesToShow={5}
                        onChangePage={onChangePage}
                      />
            </div>
          </div>
        </div>
        <Modal
          show={smShow}
          onHide={() => setSmShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();

              addUser();

              setUser(initialFormState);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <b>{t('AceeUtilisateur.modeladd_titel')} </b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label">{t('AceeUtilisateur.modeladd_Email')}</label>
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label">{t('AceeUtilisateur.modeladd_Role')} </label>
                   
                    {props.permission.length > 0 ? 
                     <select
                     name="permission"
                     className="form-control"
                     value={user.permission}
                     onChange={handleInputChange}
                     style={{ width: "100%" }}
                   >
                     <option value=''>{t('AceeUtilisateur.modeladd_select')}</option>
                    {props.permission.map(el => {

                      return (
                          <option value={el._id}>{el.Role}</option>
                      )
                    })}</select>: <p> {t('AceeUtilisateur.modeladd_selectpermission')}</p>}
                    
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <button
                      onClick={() => {
                        setSmShow(false);
                      }}
                      className="accee-btn"
                      style={{ alignContent: "end" }}
                    >
                      <span style={{ color: "white" }}> {t('AceeUtilisateur.modeladd_btnadd')} </span>
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </form>
        </Modal>
    {/* update user */}
        <Modal
          show={update}
          onHide={() => setupdate(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();

              updateUser();
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <b>  {t('AceeUtilisateur.modelupdate_titel')}</b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label"> {t('AceeUtilisateur.modelupdate_titel')}</label>
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      value={userA.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label"> {t('AceeUtilisateur.modelupdate_Role')}</label>
                   
                    {props.permission.length > 0 ? 
                     <select
                     name="permission"
                     className="form-control"
                     value={userA.permission}
                     onChange={handelupdatechange}
                     style={{ width: "100%" }}
                   >
                     <option value=''>{t('AceeUtilisateur.modeladd_select')} </option>
                    {props.permission.map(el => {

                      return (
                          <option value={el._id}>{el.Role}</option>
                      )
                    })}</select>: <p> {t('AceeUtilisateur.modeladd_selectpermission')}</p>}
                    
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <button
                      onClick={() => {
                        setSmShow(false);
                      }}
                      className="accee-btn"
                      style={{ alignContent: "end" }}
                    >
                      <span style={{ color: "white" }}> {t('AceeUtilisateur.btnupdatemodal')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </form>
        </Modal>
      </div>
    </div>
  );
}
const mapStateToProps = function (store) {
  console.log("mapToStateProps", store.user.Userconnected);
  return {
    Userconnected: store.user.Userconnected,
    Users : store.user.Users , 
    permission : store.Permission.Permission

  };
}
export default connect(mapStateToProps, {Getallpermission,UpdateUser,Registeruser,Getalluser,deleteUser,getoneauthuser })(AceeUtilisateur);
