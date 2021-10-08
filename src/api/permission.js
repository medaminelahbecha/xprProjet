import Axios from 'axios'
import {URL} from  './url'
import Cookies from 'js-cookie'
const token = Cookies.get('jwt')

const config = {
  headers:{
    'Authorization': `${token}`,
  }
 };
export  const getallpermission = () => Axios.get(URL+"api/permission",config)
export const getonepermission = (id) =>  Axios.get(URL+"api/permission/getone/"+id,config)
export const postpermission = (permission) =>  Axios.post(URL+"api/permission/postpermission",permission);
export const deletepermission = (id) => Axios.delete(URL+`api/permission/delete/${id}`,config)
export const updatepermission= (permission ) => Axios.patch(URL+`api/permission/update/${permission._id}`, permission
,config)