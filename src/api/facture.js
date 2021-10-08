import Axios from 'axios'
import {URL} from  './url'
import Cookies from 'js-cookie'
const token = Cookies.get('jwt')

const config = {
  headers:{
    'Authorization': `${token}`,
  }
 };
export  const getallfacture = () => Axios.get(URL+"api/scanfacture",config)
export const getonefacture = (id) => Axios.get(URL+`api/scanfacture/getone/${id}`,config)
export const postfacture = (facture) =>  Axios.post(URL+"api/scanfacture/upload",facture);
export const deletefacture = (id) => 
Axios.delete(URL+`api/scanfacture/delete/${id}`,config)
export const updatefacture= (facture ) => Axios.patch(URL+`api/scanfacture/update/${facture._id}`, facture
,config)
