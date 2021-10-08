import React, { useState, useEffect } from "react";
import Header from "../../components/menu/header";
import Menu from "../../components/menu/menu";
import { connect } from 'react-redux'
import {GetallFacture , UpdateFacture} from '../../action/factureaction'
import {Getallcat } from '../../action/plancomptable'
import {  useHistory } from "react-router-dom";
import Pagination from '../../components/pagination'
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import moment from "moment"
import { useTranslation } from 'react-i18next'
function PieceComptable(props) {
  const { t, i18n } = useTranslation()
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [refrech, refrechstate] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [state, setState] = useState({
    totalRecords: "",
    totalPages: "",
    pageLimit: "",
    currentPage: "",
    startIndex: "",
    endIndex: "",
  })
  let now = new Date();
  const [rangedate, setStaterangedate] = useState({
    start: moment(),
    end: moment().add(1, "years")
  });
 useEffect(() => {
   props.GetallFacture()
   props.Getallcat()
 }, [])
 useEffect( () => {
  setSearchResults(props.facture.reverse());
}, [props.facture])

  const detailsFacture = (id, newfacture) => {
    if (newfacture)
    {
      let obj = {
        _id : id ,
        newfacture  : false
      }
    
    props.UpdateFacture(obj)
  }
    history.push({
      pathname: "/DetailFacture",
      state: props.facture.filter((el) => el._id === id),
    });
  };
  const handelchange = (event) => {
    setSearchTerm(event.target.value);
  };
  const recherche = (event) => {
    event.preventDefault();
    if (searchTerm === "") 
    setSearchResults(props.facture);
    else {
      console.log(searchResults)
      let listecilent =  searchResults.filter(el => el.client !== undefined);
      const resultclient = listecilent.filter(el => el.client.toLowerCase().includes(searchTerm))
      let results = searchResults.filter((el) =>el.montant_ttc.includes(searchTerm)  ||el.code_facture.includes(searchTerm) );
      setSearchResults(results.concat(resultclient));
    }
  };
 
  const handleCallback = (start, end) => {
    console.log( start._d, end._d );
  };
 const filterwithdate = (startDate, endDate) => {
  
        console.log(startDate._d, endDate._d)
       
        let currentList = [];
      
    let newList = [];

        // If the date isn't empty
    if (startDate._d !== "" && endDate._d !=="") {

      currentList = searchResults;
      newList = currentList.filter(item => new Date(moment(item.date_creation, "DD/MM/YYYY")) > startDate && 
      //   const lc = item.date_creation.split('/').reverse().join('-');
      // const datelc = new Date(lc)
      //   const filter =startDate._d
       
      
       new Date(moment(item.date_creation, "DD/MM/YYYY")) < endDate
      
        //console.log( endDate._d.toDateString(),filter.toDateString(), datelc )
        //return  (datelc.toDateString() <=  endDate._d.toDateString())
      );
      refrechstate(true)
    } else {
            // If the date is empty, set newList to original task list
      newList = props.facture;
    }
        // Set the filtered state based on  newList 
  
  setSearchResults(newList);
  
 }
 const rechercherefrech = () =>{
  setSearchResults(props.facture);
  refrechstate(false)
 }
 const calcul_tvacollecter = () => {
   if(props.facture.length > 0) {
  let tvacollect = props.facture.filter(el => el.type =='client' && el.validation==true)
  if(tvacollect.length>0) {
  let valuetvacollect =  tvacollect.map(el => el.montant_tva.replace(/\,/g,'.').replace(/\s/g, '')).filter(function(x) {
    return x !== undefined}).reduce((a,b) => Number(a)+Number(b))
    return Number(valuetvacollect.toString().replace(/\s/g, '')).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
 }
}
}
const calcul_tvadudectible = () => {
  if(props.facture.length > 0 ) {
 let tvadudec = props.facture.filter(el => el.type =='fournisseur' && el.validation==true);
 if(tvadudec.length > 0)
 {
 let valuedec = tvadudec.map(el => el.montant_tva.replace(/\,/g,'.').replace(/\s/g, '')).filter(function(x) {
   return x !== undefined}).reduce((a,b) => Number(a)+Number(b))
   console.log(valuedec)
   return Number(valuedec.toString().replace(/\s/g, '')).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}
  }
}
const calcul_credit = () => {
  if(props.facture.length > 0 &&  props.facture.filter(el => el.type =='client').length > 0) {
   let  cal_credi = props.facture.filter(el => el.type =='client' && el.validation==true)
   if(cal_credi.length > 0) {
   let value_cal_credi =  cal_credi.map(el => el.montant_ttc.replace(/\,/g,'.').replace(/\s/g, '') ).filter(function(x) {
   return x !== undefined}).reduce((a,b) => Number(a)+Number(b))

   return Number(value_cal_credi.toString().replace(/\s/g, '')).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}
  }
}
const calcul_debit = () => {
  if(props.facture.length  > 0 && props.facture.filter(el => el.type =='fournisseur').length > 0) {
 let cal_debit = props.facture.filter(el => el.type =='fournisseur' && el.validation==true)
 if(cal_debit.length > 0){
 let value_cal_debit =cal_debit.map(el => el.montant_ttc.replace(',', '.').replace(/\s/g, '')).filter(function(x) {
   return x !== undefined}).reduce((a,b) => Number(a)+Number(b))
   return Number(value_cal_debit.toString().replace(/\s/g, '')).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}
  }
}
const onChangePage = data => {
  setState({
    pageLimit: data.pageLimit,
    totalPages: data.totalPages,
    currentPage: data.page,
    startIndex: data.startIndex,
    endIndex: data.endIndex
  });
};
const piecegategory = codepiece => {
  
  
  if(props.cat.length > 0 && codepiece!==undefined && codepiece!==""  )
  {
let category  = props.cat.find(el => el.code_categorie == codepiece.toString().substr(0,2)) 
if(category)
 {
let namesoucat = category.sous_categorie.find(el => el.code_sous_categorie
  == codepiece) ;

return namesoucat.sous_categorie 
}
else return ''
}}
const color = (codepiece) => {
  if(props.cat.length > 0 && codepiece!==undefined )
  {
let category  = props.cat.find(el => el.code_categorie == codepiece.toString().substr(0,2)) 
if(category)
{
let color = category.color;
return color
  }
else
  return "#00000"
}
}
let local = {
  "format":"DD-MM-YYYY",
  "sundayFirst" : false
}
let rowsPerPage = [];
rowsPerPage = searchResults.slice(state.startIndex, state.endIndex + 1)
  return (
  
    <div>
      <Header />
      <Menu />
      <div className="parametre">
          <div className="thead-piece  d-flex justify-content-between ">
                <div className="text-center">
                {t('PieceComptable.NOMBREDEDOCUMENTS')}  <br /> {props.facture.length}
                </div>
                <vl />
                <div className="text-center"> {t('PieceComptable.Mesachats')}  <br /> {calcul_debit() }  </div>
                <vl />
                <div className="text-center">  {t('PieceComptable.Mesventes')} <br /> {calcul_credit()} </div>
                <vl />
                <div className="text-center">  {t('PieceComptable.TOTALTVADEDUCTIBLE')} <br /> {calcul_tvadudectible()}  </div>
                <vl />
                <div className="text-center"> {t('PieceComptable.TOTALTVACOLLECTEE')} <br /> {calcul_tvacollecter()} </div>
          </div>
          <br />
          <div className="container">
            <div className="row">
              <div className="col col-lg-2">
                <a
                  className=" btn btn-outline-secondary"
                  role="button"
                  data-mdb-toggle="dropdown"
                >
                  <i className="nav-icon fas fa-cog"></i>
                  {t('PieceComptable.Action')}
                 
                </a>
              </div>
           
              <div className="col-3">
           
                <DateTimeRangeContainer 
                   start={rangedate.start}
                    end={rangedate.end}
                    local = {local}
                    applyCallback={filterwithdate}
                    
                    smartMode
                    >    <div class="input-group ">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i className="fa fa-calendar-alt"></i>
                      </span>
                    </div>   
                        <input
                        type="text"
                        class="form-control"
                        label="date exercice"
                        value={rangedate.start.format("DD-MMMM-YYYY") + ' -' +rangedate.end.format("DD-MMMM-YYYY") }
                        />
                       {refrech &&  <div class="input-group-prepend" onClick={rechercherefrech}>
                      <span class="input-group-text" >
                        <i className="fa text-danger  fa-window-close"></i>
                      </span>
                    </div>  
                       }
                        </div> 
                    </DateTimeRangeContainer>
                 
                
              
              </div>
              <div className="offset-md-3 col">
                <div className="form-inline">
                  <input className="form-control mr-sm-2" onChange={handelchange} type="search" />
                  <button
                    className="btn btn-outline-secondary my-2 my-sm-0" onClick={recherche}
                  >
                     {t('PieceComptable.Search')}
                    
                  </button>
                </div>
              </div>
              </div>
            <br />
            <div className="row">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">  {t('PieceComptable.tab_TITRE')}</th>
                    <th scope="col">  {t('PieceComptable.tab_MONTANT')}</th>
                    <th scope="col">  {t('PieceComptable.tab_DATE')}</th>
                    <th scope="col">  {t('PieceComptable.tab_MODALITE')}</th>
                    <th scope="col">  {t('PieceComptable.tab_CATEGORIE')}</th>
                  </tr>
                </thead>
                <tbody>
                {rowsPerPage.map((piec , index) => {
                  return (
                  
                      <tr key={index} >
                        <td>
                          <input type="checkbox" value="" />
                          </td>
                          <td onClick={() => detailsFacture(piec._id , piec.newfacture)}>
                          {piec.type=="client"?<img src="/template/img/fichiervert.png" />  : <img src="/template/img/fichierbleu.png" />}
                          {piec.client}
                          

                     

                         {piec.validation ?  <i class="fas fa-check-circle text-succes"></i> : 
 <span className="badge badge-pill badge-danger" >
                          {t('PieceComptable.tab_avalider')}
                       
                          </span> } {"  "} 
                          <br/>
                          {piec.newfacture && <span className='text-success'> New </span>}
                          <br/>
                          <span className={piec.type == 'client' ?"text-success m-4 p-1" : "text-info"  }>#  {piec.code_facture} </span> :
                      
                      </td>

                        <td onClick={() => detailsFacture(piec._id , piec.newfacture)}>{piec.montant_ttc}</td>
                        <td onClick={() => detailsFacture(piec._id , piec.newfacture)}>{piec.date_creation}</td>
                        <td onClick={() => detailsFacture(piec._id , piec.newfacture)}>{piec.methode_payement}</td>
                       <td onClick={() => detailsFacture(piec._id , piec.newfacture)}> {piec.categorie!== undefined && <p style={{background :color(piec.categorie)}}> {piecegategory(piec.categorie)}</p> } </td> 
                      </tr>
                   
                  );
                })}
                 </tbody>
              </table>
              <Pagination
            totalRecords={props.facture.length}
            pageLimit={state.pageLimit || 5}
            initialPage={1}
            pagesToShow={5}
            onChangePage={onChangePage}
          />
            </div>

          </div>
    
      </div>
    </div>
  
  );
}
const mapStateToProps = function (store) {

  return {
    facture: store.facture.facture,
    cat: store.plans.cat
  };
};
export default connect(mapStateToProps, { GetallFacture , Getallcat , UpdateFacture })(PieceComptable);
