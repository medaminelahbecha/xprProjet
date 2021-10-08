
import * as organisation from './type'
import * as apiorganisation from '../api/organisation'

export const Updateorganisation = (orgn) => { return (dispatch) => 
    apiorganisation.updateorganisation(orgn)
    .then( res => console.log(res))
    .catch(err => console.log(err))   
}
export const getonorganisation = (orgn) => { return (dispatch) => {
    console.log('test')
    apiorganisation.getfirstorganisation()
    .then( res =>dispatch(getorganisation(res.data)))
    .catch(err => console.log(err))   
}
}
export const getorganisation = (paylod) =>  ({
    type : organisation.GETONORGANISATION,
    paylod
  })