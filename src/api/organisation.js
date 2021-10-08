import Axios from 'axios'
import {URL} from  './url'
import Cookies from 'js-cookie'
const token = Cookies.get('jwt')

const config = {
  headers:{
    'Authorization': `${token}`,
  }
 };
 export const updateorganisation= (orgn ) => Axios.patch(URL+`api/organisation/${orgn._id}`, orgn
,config)
export const getfirstorganisation = () => Axios.get(URL+'api/organisation')


