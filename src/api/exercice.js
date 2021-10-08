import Axios from 'axios'
import {URL} from  './url'
import Cookies from 'js-cookie'
const token = Cookies.get('jwt')

const config = {
  headers:{
    'Authorization': `${token}`,
  }
 };
export  const getallexercice= () => Axios.get(URL+"api/exercice",config)
export const getoneexercice= (id) => Axios.get(URL+`api/exercice/getone/${id}`,config)
export const addexercice = (client) =>  Axios.post(URL+"api/exercice/register",client
,config);
export const deleteexercice = (id) => Axios.delete(URL+`api/exercice/delete/${id}`,config)
export const updateexercice= (client ) => Axios.patch(URL+`api/exercice/update/${client._id}`, client
  ,config)

