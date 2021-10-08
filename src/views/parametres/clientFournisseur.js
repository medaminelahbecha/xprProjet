import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { Modal } from "react-bootstrap";
import { Popconfirm } from "antd";
import Pagination from '../../components/pagination'
import {
  Getallclient,
  deleteclient,
  UpdateClient,
  postclient,
  getlastclient
} from "../../action/clientaction";
import {Getallcat} from '../../action/plancomptable'
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {devises} from "./deviseList"
import { useTranslation } from 'react-i18next'
function FournisseurClient(props) {
  const { t, i18n } = useTranslation()
  const [smShow, setSmShow] = useState(false);
  const { addToast } = useToasts();
const [state, setstate] = useState({pageLimit: "",
  totalPages:"",
  currentPage: "",
  startIndex: "",
  endIndex: ""})
  const initialFormState = {
    _id: "",
    name: "",
    souscategory: "701000",
    type: "client",
    code: "1",
    collecter:"436700",
    comptetva_deductible:"436600",
    pourcent_tva:'19',
    devise: "euro",

  };

  const [fournisseurs, setFournisseurs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [search, setsearch] = useState([]);
  const [four, setFour] = useState(initialFormState);

  useEffect(() => {
    props.Getallclient();
    props.Getallcat();
    props.getlastclient('client')
  }, []);
  useEffect(() => {
    if (props.client.length > 0) {
      setFournisseurs(props.client.reverse());
      }
      console.log()
      if(props.lastclient.length > 0)
      setFour({...four , code:Number(props.lastclient[0].code) +1})  
    
      
  }, [props.client , props.lastclient]);
  const onChangePage = data => {
    setstate({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };
  const addFournisseur = () => {
    console.log(editing);
    if (editing === true) {
      let fours = fournisseurs.filter((el) => el._id !== four._id);
      console.log(fours);
      props.UpdateClient(four);
      setEditing(false);
      setFournisseurs([...fours, four]);
    } else {
      props.postclient(four);
      four.id = fournisseurs.length + 1;
      setFournisseurs([...fournisseurs, four]);
    }
    addToast("fournisseur ajouter", {
      appearance: "info",
      autoDismiss: true,
    });
  };

  const deleteFournisseur = (id) => {
   
    props.deleteclient(id);
    setFournisseurs(
      fournisseurs.filter((fournisseur) => fournisseur._id !== id)
    );

    addToast("fournisseur suprimé", {
      appearance: "info",
      autoDismiss: true,
    });
  };

  const updateFournisseur = (id, updateFournisseur) => {
    setEditing(false);

    setFournisseurs(
      fournisseurs.map((fournisseur) =>
        fournisseur.id === id ? updateFournisseur : fournisseur
      )
    );
  };

  const editRow = (fourniseur) => {
    setEditing(true);

    setFour({
      _id: fourniseur._id,
      name: fourniseur.name,
      type: fourniseur.type,
      sousgaterogy: fourniseur.sousgaterogy,
      collecter: fourniseur.collecter,
      comptetva_deductible: fourniseur.comptetva_deductible,
      code: fourniseur.code,
      devise: fourniseur.devise,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFour({ ...four, [name]: value });
    if ( name=="type"){
    console.log(value)
     props.getlastclient(value)
    }
  };
  const searchfournissuer = (event) => {
  let soucategory =  fournisseurs.filter(el => el.souscategory !== undefined);
  const resultcategory = soucategory.filter(el => el.souscategory.toLowerCase().includes(event.target.value))
   let result =  fournisseurs.filter((el) =>el.name.includes(event.target.value) ||el.code.includes(event.target.value)   );
    setsearch(result.concat(resultcategory));

  }
  let rowsPerPage = [];
  rowsPerPage =  search.length > 0 ? search  : fournisseurs.slice(state.startIndex, state.endIndex + 1)

  return (
    <div>
      <Header />
      <Menu />
      <div className="parametre">
        <p className="connexion">
          <b>  {t('FournisseurClient.titel')} </b>
        </p>
        <hr className="hr1" />

        <div className="row text-right">
          <div className="col">
            <button
              type="submit"
              className="accee-btn"
              onClick={() => {
                setSmShow(true);
              }}
            >
              <span style={{ color: "white" }}>
                <b>{t('FournisseurClient.Ajouter')} </b>
              </span>
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col col-lg-2">
            <a
              className=" btn btn-outline-secondary"
              role="button"
              data-mdb-toggle="dropdown"
            >
              <i className="nav-icon fas fa-cog"></i>
              {t('FournisseurClient.Actions')}  
            </a>
          </div>
          <div className="col-md-4 d-flex">
              <input className="form-control mr-sm-2" onChange={searchfournissuer} type="search" />
              <button
                className="btn btn-outline-secondary my-2 my-sm-0"
                type="submit"
              >
               {t('FournisseurClient.Search')}  
              </button>

          </div>
        </div>
        <br />
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th style={{ paddingLeft: " 10px" }}> {t('FournisseurClient.Type')}  </th>

              <th style={{ paddingLeft: " 10px" }}>{t('FournisseurClient.Nom')}</th>
              <th style={{ paddingLeft: " 10px" }}>{t('FournisseurClient.Categorie')} </th>
              <th style={{ paddingLeft: " 10px" }}>{t('FournisseurClient.Devise')} </th>

              <th style={{ paddingLeft: " 10px" }}>{t('FournisseurClient.Action')} </th>
            </tr>
          </thead>
          <tbody>
            {rowsPerPage.map((fou) => {
              return (
                <tr key={fou.id}>
                  <td>
                    {" "}
                    <input type="checkbox" />
                  </td>
                  <td>{fou.type}</td>
                  <td>
                    {fou.name} ({fou.code})
                  </td>
                  <td>{fou.souscategory}</td>
                  <td>{fou.devise}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSmShow(true);
                        editRow(fou);
                      }}
                      className="btn btn-success btn-sm rounded-0"
                      type="button"
                    >
                      <i className="fa fa-edit"></i>
                    </button>
{/* 
                    {fournisseurs.length >= 1 ? (
                      <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => deleteFournisseur(fou._id)}
                      >
                        <button
                          className="btn btn-danger btn-sm rounded-0"
                          type="button"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </Popconfirm>
                    ) : null} */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
            totalRecords={fournisseurs.length}
            pageLimit={state.pageLimit || 5}
            initialPage={1}
            pagesToShow={5}
            onChangePage={onChangePage}
          />
        <Modal
          show={smShow}
          onHide={() => {setSmShow(false) ;
            setEditing(false) ;
           } }
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addFournisseur(four);
              setFour(initialFormState);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <b>{t('FournisseurClient.modaltitel')} </b>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('FournisseurClient.modal_labelNom')} </label>
                      <input
                        onChange={handleInputChange}
                        value={four.name}
                        type="text"
                        className="form-control"
                        required
                        name="name"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('FournisseurClient.modal_labelType')} </label>
                      <select
                        onChange={handleInputChange}
                        value={four.type}
                        className="form-control"
                        required
                        style={{ width: "100%" }}
                        name="type"
                      >
                        <option value="DEFAULT" disabled>
                        {t('FournisseurClient.modal_optiondefaultvalue')}  
                        </option>
                        <option value="client"> {t('FournisseurClient.modal_optionClient')} </option>
                        <option value="fournisseur"> {t('FournisseurClient.modal_optionFournissur')}  </option>
                      </select>
                    </div>
                  </div>           
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('FournisseurClient.modal_labelcode')} </label>
                      <input
                        value={four.code}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        required
                        disabled
                        name="code"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">{t('FournisseurClient.modal_labelCatégorie')} Catégorie</label>
                      <select
                        value={four.categorie}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        style={{ width: "100%" }}
                        name="souscategory"
                      >
                        <option value="DEFAULT" disabled>
                        {t('FournisseurClient.modal_labelCatégorie')}  
                        </option>
                       {props.category.filter(el => {
                         if(four.type == 'fournisseur')
                       return  el.code_categorie<=62 && el.code_categorie >=60
                       else
                       return el.code_categorie ==70
                       
                      }).map(el => el.sous_categorie.map(el =>{return (
                        <option value={el.code_sous_categorie}>
                        {el.code_sous_categorie + "-"+ el.sous_categorie}
                      </option>
                       )}))}
                      </select>
                    </div>
                  </div>
                </div>
                {four.type == 'client' ?
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">
                      {t('FournisseurClient.modal_label_Cmpttvacollectee')}  
                      </label>
                      <input
                        value={four.collecter}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        required
                        name="collecter"
                      />
                    </div>
                  </div>
                </div> 

               :
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">
                      {t('FournisseurClient.modal_label_Cmptdeductible')}    
                      </label>
                      <input
                       list="deductible-list"
                        value={four.comptetva_deductible}
                        onChange={handleInputChange}
                        type="text"
                        className="form-control"
                        required
                        name="comptetva_deductible"
                      />
                       <datalist id="deductible-list" >
                       {props.category.filter(el => el.code_categorie ==43).map(cat => cat.sous_categorie.map(el =>{return (
                        <option value={el.code_sous_categorie}>
                        {el.code_sous_categorie + "-"+ el.sous_categorie}
                        </option>
                       )}
                       ))

                       }
                      </datalist>
                    </div>
                  </div>
                </div>
}
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">  {t('FournisseurClient.modal_labeldevise')}    </label>
                      <input
                        list="devise-list"
                        value={four.devise}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        style={{ width: "100%" }}
                        name="devise"
                      />
                      <datalist id="devise-list">
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
                  <div className="col">
                    <div className="form-group">
                      <label className="organisation-Label">  {t('FournisseurClient.modal_labeltvapourcent')} </label>
                      <input
                         type="number"
                         min='0'
                        value={four.pourcent_tva}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        style={{ width: "100%" }}
                        name="pourcent_tva"
                      />
                      </div></div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <button
                      className="fournisseur-btn"
                      style={{ alignContent: "end" }}
                    >
                      <span style={{ color: "white" }}> {editing ?  t('FournisseurClient.modal_btnedit') :  t('FournisseurClient.modal_btnadd') }</span>
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
  return {
    client: store.client.Client,
    lastclient: store.client.lastclient,
    category: store.plans.cat 
  };
};
export default connect(mapStateToProps, {
  Getallclient,
  deleteclient,
  UpdateClient,
  postclient,
  Getallcat,
  getlastclient
})(FournisseurClient);
