import * as exercice from './type'
import * as apiexercice from '../api/exercice'

export const Getallexercice =  () =>  {  return (dispatch) =>
    apiexercice.getallexercice()
    .then(res =>  {console.log(res);

        dispatch(gettallexercices(res.data))
    })
    .catch(err => console.log(err))
}
export const getoneexercice= (id) => { return (dispatch) => 
    apiexercice.getoneexercice(id)
    .then(res =>  {
        dispatch(updatexercice(res.data))
    })
    .catch(err => console.log(err))

}
export const postexercice= (plan) => {
    return (dispatch) =>
    apiexercice.addexercice(plan)
        .then((res) => {
          console.log( dispatch(addexercice(res.data.exercice)));
        
        })
        .catch((err) => console.log(err));
  }
export const deleteexercice= (id) => { return (dispatch) =>
    apiexercice.deleteexercice(id)
.then(res => console.log(res.data))
.catch(err => console.log(err))
}
export const Updateexercice = (user) => { return (dispatch) => 
    apiexercice.updateexercice(user)
    .then( res => {console.log(res.data);
       
    })
}


 export const updatexercice =  (paylod) => ({
    type:exercice.UPDATEEXERCICE,
    paylod
 })
 export const addexercice = (paylod) => ({
    type:exercice.POSTEXERCICE,
    paylod 
 })
export const gettallexercices = (paylod) =>  ({
    type : exercice.GETALLEXERCICE,
    paylod
})
