import Axios from 'axios'
import {URL} from  './url'
import Cookies from 'js-cookie'
const token = Cookies.get('jwt')

const config = {
  headers:{
    'Authorization': `${token}`,
  }
 };
export  const getallfournisseur = Axios.get(URL+"app/allfournisseur",config)
export const getonefournisseur = (id) => Axios.get(URL+`app/fournisseur/${id}`,config)
export const postfournisseur = (fournisseur) =>  Axios.post(URL+"user/postfournisseur", {
    fournisseur
},config);
export const postfournisseur = (fournisseur) =>Axios.post(URL+"app/addfournisseur", fournisseur , config)
export const deletefournisseur = (id) => 
Axios.delete(URL+`app/delatefournisseur/${id}`,config)
export const updatefournisseur= (fournisseur ) => Axios.patch(URL+`app/updatefournisseur/${fournisseur[0]._id}`, fournisseur[0]
,config)
