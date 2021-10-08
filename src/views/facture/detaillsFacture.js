import React, { useState , useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { connect } from 'react-redux'
import {UpdateFacture} from '../../action/factureaction'
import {Getallcat , addsouscategory} from '../../action/plancomptable'
import {Getallclient , postclient , getlastclient} from '../../action/clientaction'
import { useToasts } from "react-toast-notifications";
import { Modal, Card, Accordion, Button } from "react-bootstrap";
import {devises} from '../parametres/deviseList'
import {getallfacture} from '../../api/facture'
import { useTranslation } from 'react-i18next'
function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}

 const  DetailsFacture = (props) =>   {
   const [state, setState] = useState( {
    _id : props.location.state[0]._id ?props.location.state[0]._id : ''  ,
    idclient: props.location.state[0].idclient ?props.location.state[0].idclient : ''  ,
    client : props.location.state[0].client? props.location.state[0].client : '',
    type : props.location.state[0].type? props.location.state[0].type : '',
    // mat_fiscal : this.props.location.state[0].mat_fiscal? this.props.location.state[0].mat_fiscal : '',
    // libelle :  this.props.location.state[0].libelle? this.props.location.state[0].libelle : '',
    numero : props.location.state[0].numero? props.location.state[0].numero : '',
    methode_payement :  props.location.state[0].methode_payement? props.location.state[0].methode_payement : '',
    categorie :  props.location.state[0].categorie? props.location.state[0].categorie : '',
    date_creation : props.location.state[0].date_creation? props.location.state[0].date_creation : '',
    devise  : props.location.state[0].devise? props.location.state[0].devise : '',
    montant_ht : props.location.state[0].montant_ht? props.location.state[0].montant_ht : '',
    Tva : props.location.state[0].Tva? props.location.state[0].Tva : '',
    montant_tva :props.location.state[0].montant_tva? props.location.state[0].montant_tva : '',
    montant_ttc :props.location.state[0].montant_ttc? props.location.state[0].montant_ttc : '',
   image : props.location.state[0].image ? props.location.state[0].image :'',
   code_facture: props.location.state[0].code_facture ? props.location.state[0].code_facture :'' ,
   nature:props.location.state[0].nature ? props.location.state[0].nature:'',
   timbre:props.location.state[0].timbre ? props.location.state[0].timbre:0.600,
   validation:props.location.state[0].validation ? props.location.state[0].validation:false,
   showsouscategory: false,
 
   datasupecteuse : false , 
   fournisseurmanquant : false,
   clientmanquant : false
})
  const [modalfourniseur, setfournisseur] = useState(false)
  const { t, i18n } = useTranslation()
const check_data = () => {
  getallfacture()
  .then(res => {

    let check = res.data.filter(el =>  el.type== state.type && el.numero == state.numero && el.date_creation == state.date_creation )
    if(check.length > 1)
    setState({...state,datasupecteuse : true})
  })
}
const check_client = () => {
 if(state.idclient == '' && state.type=="fournisseur" )
 setState({fournisseurmanquant : true})
 if(state.idclient == '' && state.type=="client")
 setState({...state,clientmanquant : true})
}
useEffect(() => {
  props.Getallclient()
  props.Getallcat()
  check_data()
  check_client()
  props.getlastclient(state.type)
  if(state.nature=='') {
    
   state.type=='client' ? setState({...state,nature : 'revenus'}) : setState({...state,nature : 'charge'})
  }
}, [])
useEffect(() => {
  if (props.lastclient.length >0 ) {
    setState({...state,codeclient : (Number(props.lastclient[0].code) +1) })
   
   }
}, [props.lastclient])

  const handelchange = (event) => {
    console.log("event",event)
   let name = event.target.name;
   let value = event.target.value;
  setState({...state,[name]  : value})
 }
 const  onsubmitinformation = (event) => {
    props.addToast('facture enregistrer' ,{
      appearance: "info",
      autoDismiss: true});
    event.preventDefault()
    event.stopPropagation()
    if(state.idclient){
    let client = props.client.filter(el=> el._id == state.idclient)[0].name
   Object.assign(state,{client:client})
    }
  
props.UpdateFacture(state)
  }
  // const handelchange = (event) => {
  //   let name = event.target.name;
  //   let value = event.target.value;
  //   setState({...state, [name]: value });
  // };

 const  handleModal = ()  => {
  setfournisseur(!modalfourniseur)
 
 
    setState({...state,deviseclient : "TND"})
    console.log("click")
    if(state.type=='fournisseur' )
    setState({...state, comptetva_deductible: '436600'})
    else
    setState({...state, collecter: '436700'})
  }
  const handleModalsouscategorie = () =>  {
    setState({...state, showsouscategory: !state.showsouscategory });
  }
  const validerdocument = () => {
    let verification = {};
    verification = state ;
    delete verification['code_categorie'];
    delete verification['code_sous_categorie'];
    delete verification['color_sous_categorie'];
    delete verification['sous_categorie'];
    delete verification['showsouscategory'];
    console.log(verification)
    let tabofvalue = Object.values(verification)
    if(tabofvalue.every(el => el !=='')){
let client = props.client.filter(el=> el._id == state.idclient)[0].name
 Object.assign(state , {validation: true , client:client})
 props.UpdateFacture(state)
 props.addToast('facture verifier' ,{
  appearance: "info",
  autoDismiss: true});
 props.history.push("/piececomptable")
    }
    else
    props.addToast('Remplir tout les champs' ,{
      appearance: "error",
      autoDismiss: true});
  }
 
  const submitsouscategorie = (event) => {
 
    event.preventDefault();
    if(state.code_categorie !== "") {
    let cat = props.category.filter(el => el.code_categorie == state.code_categorie)
        
    let obj = {
      _id:  cat[0]._id,
      color: state.color_sous_categorie,
      code_sous_categorie: state.code_sous_categorie,
      sous_categorie  : state.sous_categorie ,
      
    };
    handleModalsouscategorie()
    props.addsouscategory(obj)
    props.addToast('category ajouter' ,{
      appearance: "info",
      autoDismiss: true});
      props.Getallcat()
  }
  };
  const submitclientform  = (event) => {
    event.preventDefault();
    if(state.typeclient == undefined)
    setState({...state,typeclient : state.type})
    let obj = {
    name:state.clientname,
    type: state.type,
    code: state.codeclient ,
    collecter : state.collecter,
    comptetva_deductible :state.comptetva_deductible,
    devise:state.deviseclient ,
    souscategory : state.sousgaterogy
    };
    props.postclient(obj)
    setState({...state, showfournisseur: !state.showfournisseur });
    props.addToast('client ajouter' ,{
      appearance: "info",
      autoDismiss: true});
     props.Getallclient()
  }
                  const changestate = (event) => {
    const client = props.client.filter(el => el._id ==event.target.value )
    if (client.length > 0) 
    setState({...state,categorie :client[0].souscategory , Tva : client[0].pourcent_tva , client : client[0].name ,devise : client[0].devise ,idclient:event.target.value   })
    console.log(event)


  }

    return (
      <div>
        <Header />
        <Menu />
    
      
          {state.validation ? 
              <div className="container card-facture"> 
              <div className="row">
              <span className="col-md-6">
                          <i className="fa fa-user "></i>
                          {state.type} {" "}
                        </span>
                        <span className="col-md-6">
                        {props.location.state[0].idclient &&props.client.length>0  && props.client.filter(el =>el._id == props.location.state[0].idclient)[0].name}
                        </span>
                        </div>
                        <div className="row">
                        <span className="col-md-6">
                          <i className="fa fa-dollar-sign "></i>  {t('DetailsFacture.validation_montantht')}  
                        </span>
                      <span className="col-sm-6">
                       {state.montant_ht}
                      </span>
                    </div>
                    <div className="row">
                    <span className="col-md-6">
                          <i
                            className="fa fa-address-card"
                          ></i>
                           {t('DetailsFacture.validation_matfiscal')}  
                       
                        </span>
                        <span className="col-sm-6">
                       {state.mat_fiscal}
                      </span>
                      </div>
                      <button  className="btn btn-primary " onClick={() => {
                        setState({...state,validation :false }) }} > {t('DetailsFacture.validation_editdocument')} </button>
              </div>
                :
                <div
                className="factureDetails"
                style={{ backgroundColor: "rgba(4, 85, 166, 0.7)" }}
              >
          <div className="container"> 

            <div className="row">
              <div className="col-5">
                <div className="card-facture">
                  <br />
                  {state.clientmanquant &&<label
                  
                      className="btn-facture text-center"
                      style={{ color: "white" }}
                    >
                      {t('DetailsFacture.nnvalidation_cmanquant')}
                   
                    </label> 
                        }
                  {state.fournisseurmanquant &&
                    <label
                     
                      className="btn-facture text-center"
                      style={{ color: "white" }}
                    >
                       {t('DetailsFacture.nnvalidation_fmanquant')}
                     
                    </label>
                          }
                   {state.datasupecteuse &&   <label
                     
                      className="btn-facture text-center"
                      style={{ color: "white" }}
                    >
                       {t('DetailsFacture.nnvalidation_Duplicata')}
                     
                    </label>
                        }
                  <form onSubmit={onsubmitinformation}>
                    <label className="col col-form-label text-center">
                    {t('DetailsFacture.nnvalidation_ID')} {state.code_facture}
                    </label>

                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-user "></i>
                          {state.type}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <select value={state.idclient} name='idclient' onChange={changestate} className="input-facture">
                         <option value=""> {t('DetailsFacture.nnvalidation_selectionervotre')}{ state.type} </option>
                         {props.client.filter(el => el.type == state.type).map((client , index) => {
                           return (
                             <option key={index} value={client._id}>{client.name}</option>
                           )})}
                        </select>
                        <i className="fas fa-plus-circle text-success cursor-pointer" onClick={handleModal}></i>

                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-keyboard "></i>  {t('DetailsFacture.nnvalidation_Type')} 
                        </span>
                      </div>
                      <div className="col-sm-6">

                        <select name="nature" onChange={handelchange} className="input-facture" value={state.nature}>
                        <option value="">{t('DetailsFacture.nnvalidation_nature1')} </option>
                          <option value="charge">{t('DetailsFacture.nnvalidation_nature1')} </option>
                          <option value="revenus">{t('DetailsFacture.nnvalidation_nature2')} </option>
                        </select>

                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    {/* <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i
                            className="fa fa-address-card
 "
                          ></i>
                          Matricule fiscal {this.state.type}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          onChange={this.handelchange}
                          className="input-facture"
                          name="mat_fiscal"
                          value={this.state.mat_fiscal}
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div> */}
                    {/* <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-edit "></i> Libellé
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          onChange={this.handelchange}
                          className="input-facture"
                          name="libelle"
                          value={this.state.libelle}
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div> */}
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-fingerprint "></i>{t('DetailsFacture.nnvalidation_numfact')}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          onChange={handelchange}
                          className="input-facture"
                          name="numero"
                          value={state.numero}
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-sitemap " ></i>{t('DetailsFacture.nnvalidation_Catégorie')}
                        </span>
                      </div>
                      <div className="col-sm-6">
                      <select name="categorie" className="input-facture"   value={state.categorie}  onChange={handelchange}  >
                          <option value=""> {t('DetailsFacture.nnvalidation_selectCategorie')} </option>
                       {props.category.map(el =>  {return(
                       <optgroup style={{background:el.color}} label={el.code_categorie + "-" + el.name_categorie}>
                         {el.sous_categorie.map(soucat => {return (

                      <option  style={{background:el.color}} value={soucat.code_sous_categorie}>{soucat.code_sous_categorie + "-" + soucat.sous_categorie
                         }</option>
                      )})
                         }
                      </optgroup> )
                       })
                        }
                      </select>       
                      <i className="fas fa-plus-circle text-success cursor-pointer"  onClick={() => {
                  handleModalsouscategorie();
                }}></i>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-calendar-alt "></i>{t('DetailsFacture.nnvalidation_Date')} 
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          onChange={handelchange}
                          className="input-facture"
                          name="date_creation"
                          value={state.date_creation}
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-dollar-sign "></i> {t('DetailsFacture.nnvalidation_Devise')} 
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          list="list-devise"
                          type="text"
                          onChange={handelchange}
                          className="input-facture"
                          name="devise"
                          value={state.devise}
                        />
                       <datalist id="list-devise">
                          {devises.map((el, index) => {
                            return (
                              <option key={index} value={el.devise}>
                                {el.pays} ({el.devise})
                              </option>
                            );
                          })}
                        </datalist> 
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-dollar-sign "></i> {t('DetailsFacture.nnvalidation_mht')} 
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="number"
                          step="0.001"
                          min = "0"
                          onChange={handelchange}
                          className="input-facture"
                          name="montant_ht"
                          value={state.montant_ht}
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-percentage "></i> {t('DetailsFacture.nnvalidation_tva')} 
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="number"
                          step="0.001"
                          min="0"
                          onChange={handelchange}
                          className="input-facture"
                          value={state.Tva}
                          name="Tva"
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-dollar-sign "></i> {t('DetailsFacture.nnvalidation_mtva')} 
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="number"
                          step="0.001"
                          min = "0"
                          onChange={handelchange}
                          className="input-facture"
                          value={state.montant_tva}
                          name="montant_tva"
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-briefcase "></i> {t('DetailsFacture.nnvalidation_Timbre')}   {" "}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input type="text" value={state.timbre} name="timbre" onChange={handelchange} className="input-facture" />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-dollar-sign "></i>  {t('DetailsFacture.nnvalidation_mttc')}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          onChange={handelchange}
                          className="input-facture"
                          value={state.montant_ttc}
                          name="montant_ttc"
                        />
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="input-group-prepend ">
                        <span className="text-input-groupe">
                          <i className="fa fa-briefcase "></i> {t('DetailsFacture.nnvalidation_methode')}  {" "}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <select
                          type="text"
                          onChange={handelchange}
                          name="methode_payement"
                          value = {state.methode_payement}
                          className="input-facture"
                        >
                          <option value="">  {t('DetailsFacture.nnvalidation_typemethode')}</option>
                          <option name="cheque"> {t('DetailsFacture.nnvalidation_methodecheque')}</option>
                          <option name="espece"> {t('DetailsFacture.nnvalidation_methodeespace')}</option>
                          <option name="virementBancaire">
                          {t('DetailsFacture.nnvalidation_methodevirement')}
                          </option>
                          <option name="credit">
                          {t('DetailsFacture.nnvalidation_methodeCredit')}
                          </option>
                        </select>
                        <img src="/template/img/Vector.png" />
                      </div>
                    </div>
                 
                    <div className="form-group">

                      <button
                        className="btn btn-success"
                        style={{ alignSelf: "center" }}
                      >
                        <span style={{ color: "white" }}>
                          <i className="fa fa-save "></i>
                        </span>
                      </button>
                    </div>
                  </form>
                  <button
                    className="validfacture-btn"
                    onClick={validerdocument}
                  >
                    <span style={{ color: "white" }}>
                      <i className="fa fa-check-circle "></i>{t('DetailsFacture.nnvalidation_bntvalid')}
                    </span>
                  </button>
                </div>

                
              </div>
            
                   
              
              <div className="offset-md-2 col-5">
                <div className="card-facture">
              
                  {/[^.]+$/.exec(state.image)[0]=='pdf' ? 

                <embed src={`https://s3-eu-west-1.amazonaws.com/textract-console-eu-west-1-5349f000-c8fe-423f-a6fb-6ec3bb31f312/` + state.image} width="100%" height="710px" />
                  : <img
                    src={`https://s3-eu-west-1.amazonaws.com/textract-console-eu-west-1-5349f000-c8fe-423f-a6fb-6ec3bb31f312/` + state.image}
                    className="img-facture"
                    alt="..."
                  /> 
                        }
                </div>
              </div>
            </div>
          </div> 
        </div> }
       
          {/* fournisseur modal*/}
          <Modal
            show={modalfourniseur}
            onHide={handleModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <form onSubmit={submitclientform}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <b> {t('FournisseurClient.modaltitel')}</b>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="organisation-Label"> {t('FournisseurClient.modal_labelNom')}</label>
                        <input
                          onChange={handelchange}
                          type="text"
                          className="form-control"
                          required
                          name="clientname"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="organisation-Label">{t('FournisseurClient.modal_labelType')}</label>
                       
                        <input
                         
                          className="form-control"
                          required
                          disabled
                          style={{ width: "100%" }}
                          name="typeclient"
                          value = {state.type }
                        />
                        
                       
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="organisation-Label">{t('FournisseurClient.modal_labelcode')} </label>
                        <input
                          onChange={handelchange}
                          type="text"
                          value={state.codeclient}
                          className="form-control"
                          required
                          name="codeclient"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="organisation-Label">{t('FournisseurClient.modal_labelCatégorie')} Catégorie</label>
                        <select
                          onChange={handelchange}
                          className="form-control"
                          required
                  
                          style={{ width: "100%" }}
                          name="sousgaterogy"
                        >
                          <option value="DEFAULT" disabled>
                          {t('FournisseurClient.modal_labelCatégorie')}  choisir Categorie
                          </option>
                          {props.category.filter(el => {
                         if(state.type == 'fournisseur')
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
                  {state.type == 'client' ?
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="organisation-Label">
                        {t('FournisseurClient.modal_label_Cmpttvacollectee')}
                        </label>
                        <input
                          onChange={handelchange}
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
                          onChange={handelchange}
                          type="text"
                          className="form-control"
                          required
                          value={state.comptetva_deductible}
                          name="comptetva_deductible"
                        />
                      </div>
                    </div>
                  </div>
  }
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label className="organisation-Label">{t('FournisseurClient.modal_labeldevise')} </label>
                      
                      
                           <input
                          list="list-devise"
                          type="text"
                          style={{ width: "100%" }}
                          onChange={handelchange}
                          className="input-facture"
                          name="deviseclient"
                          value={state.deviseclient}
                      
                        />
                       <datalist id="list-devise">
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
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <button
                        className="fournisseur-btn"
                        style={{ alignContent: "end" }}
                      >
                        <span style={{ color: "white" }}>{t('FournisseurClient.modal_btnadd')} </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </form>
          </Modal>
          {/* fin fournisseur modal*/}

          {/*modal categorie */}
          <Modal
            show={state.showsouscategory}
            onHide={() => handleModalsouscategorie()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                  <b> {t('Categorie.addnewsouscat')}</b> 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={submitsouscategorie
                }
                className="row"
              >
                <div className="col">
                 
                    <div className="form-group">
                      <label className="organisation-Label">
                        {" "}
                        {t('Categorie.modal_bodycode_category')}  
                      </label>
                      <input
                        list="code_cat"
                        type="text"
                        className="form-control"
                        value={state.code_categorie}
                        name="code_categorie"
                        onChange={handelchange}
                        required
                      />
                      <datalist id="code_cat">
                        {props.category.map((el, index) => {
                          return (
                            <option key={index} value={el.code_categorie} />
                          );
                        })}
                      </datalist>
                    </div> </div>
                
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label">   {t('Categorie.modal_bodyNom')}  </label>
                    <input
                      type="text"
                      value={state.sous_categorie}
                      className="form-control"
                      name="sous_categorie"
                      onChange={handelchange}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label"> {t('Categorie.modal_bodycode_comptable')} </label>
                    <input
                      type="text"
                      value={state.code_sous_categorie}
                      className="form-control"
                      name="code_sous_categorie"
                      onChange={handelchange}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label className="organisation-Label"> {t('Categorie.modal_bodycolor')} </label>

                    <div className="form-group ">
                      <input
                        type="color"
                        value={state.color_sous_categorie}
                        name="color_sous_categorie"
                        onChange={handelchange}
                        className=" form-control"
    
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <input
                      type="submit"
                      className="accee-btn"
                      style={{ alignContent: "end" }}
                      value={t('Categorie.addnew')}
                    />

                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          {/*modal categorie */}
        </div>

   
    );
  }

const mapStateToProps = function (store) {

  return {
    client: store.client.Client  ,
    lastclient: store.client.lastclient,
    category: store.plans.cat  };
}
export default connect(mapStateToProps, { UpdateFacture,getlastclient,postclient,Getallcat,addsouscategory , Getallclient })(withToast(DetailsFacture));

