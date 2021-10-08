import * as client from './type'
import * as apiclient from '../api/client'

export const Getallclient =  () =>  {  return (dispatch) =>
    apiclient.getallclient()
    .then(res =>  {console.log(res);

        dispatch(gettallclients(res.data))
    })
    .catch(err => console.log(err))
}
export const getoneclient = (id) => { return (dispatch) => 
    apiclient.getoneclient(id)
    .then(res =>  {
        dispatch( {type:client.UPDATECLIENT,  paylod : res.data } )
    })
    .catch(err => console.log(err))

}
export const getlastclient  = (type) => {
    return (dispatch) =>  apiclient.getlastclient(type)
    .then (res => dispatch(getlast(res.data.lastclient)) )
    .catch(err => console.log(err))
}
export const postclient= (client) => {
    return (dispatch) =>
    apiclient.postclient(client)
        .then((res) => {
           dispatch(Getallclient())
        })
        .catch((err) => console.log(err));
  }
export const deleteclient = (id) => { return (dispatch) =>
    apiclient.deleteclient(id)
.then(res => console.log(res.data))
.catch(err => console.log(err))
}
export const UpdateClient = (user) => { return (dispatch) => 
    apiclient.updateclient(user)
    .then( res => {console.log(res.data);
       
    })
}

export const getlast = (paylod) => ({
    type : client.GETlast,
    paylod
})
 export const updatclient =  (paylod) => ({
    type:client.UPDATECLIENT,
    paylod
 })
export const gettallclients = (paylod) =>  ({
    type : client.GETALLCLIENT,
    paylod
})
