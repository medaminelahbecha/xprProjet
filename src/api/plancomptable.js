import Axios from 'axios'
import {URL} from  './url'
import Cookies from 'js-cookie'
const token = Cookies.get('jwt')

const config = {
  headers:{
    'Authorization': `${token}`,
  }
 };
export  const getallcategoy = () => Axios.get(URL+"api/categorie",config)
export const  getonegategory = (id) => Axios.get(URL+`api/categorie/getone/${id}`,config)
export const postcategory = (cat) =>  Axios.post(URL+"api/categorie/addcategory",cat);
export const update = (cat) =>  Axios.patch(URL+"api/categorie/update",cat);

export const deletecategory = (id) => Axios.delete(URL+`api/categorie/delete/${id}`,config)
export const updatecategory= (cat ) => Axios.patch(URL+`api/categorie/many/`, cat
,config)
export const updatesouscategory= (souscat ) => Axios.patch(URL+`api/souscategorie/update/${souscat._id}`, souscat
,config)
export const addsouscategory= (souscat ) => Axios.patch(URL+`api/souscategorie/add/${souscat._id}`, souscat
,config)
export const getplan = () =>  Axios.get(URL+"api/plancomptable")
export const postplan = (plan) =>  Axios.post(URL+"api/plancomptable/postplan",plan)
export const updateplan= (plan ) => Axios.patch(URL+`api/plancomptable/update/`, plan
,config)