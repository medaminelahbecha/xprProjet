import Axios from 'axios'
import {URL} from  './url'
import Cookies from 'js-cookie'
const token = Cookies.get('jwt')

const config = {
  headers:{
    'Authorization': `${token}`,
  }
 };
export  const getallclient= () => Axios.get(URL+"api/client",config)
export const getoneclient= (id) => Axios.get(URL+`api/client/getone/${id}`,config)
export const postclient = (client) =>  Axios.post(URL+"api/client/register",client
,config);
export const getlastclient =(type) =>{
 console.log(type)
return Axios.get(URL+"api/client/getlastes/"+type,config);
}
export const deleteclient = (id) => Axios.delete(URL+`api/client/delete/${id}`,config)
export const updateclient= (client ) => Axios.patch(URL+`api/client/update/${client._id}`, client
  ,config)

