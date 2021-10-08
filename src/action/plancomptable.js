import * as Plancomptable from "./type";
import * as apiplancomptable from "../api/plancomptable";

export const Getallcat = () => {
  return (dispatch) =>
  apiplancomptable.getallcategoy()
      .then((res) => {
        console.log(res);

        dispatch(gettallcat(res.data)) })
      .catch((err) => console.log(err));
};

export const postCat = (newfac) => {
  return (dispatch) =>
  apiplancomptable.postcategory(newfac)
      .then((res) => {
        console.log(res.data);
        dispatch(postcat(res.data));
      })
      .catch((err) => console.log(err));
};
export const postPlan =  (newplan) => {
return (dispatch) => apiplancomptable.postplan(newplan).then((res) => {
  console.log(res.data);
})
.catch((err) => console.log(err));
}
export const getPlan =  () => {
  return (dispatch) => apiplancomptable.getplan().then((res) => {
   dispatch(getplan(res.data));
  })
  .catch((err) => console.log(err));
  }
export const updateplan = (plan)  => {
  return (dispatch) => apiplancomptable.updateplan(plan).then((res) => {
    console.log(res.data);
  })
  .catch((err) => console.log(err));
}
export const getonecat = (id) => {
  return (dispatch) =>
  apiplancomptable.getonegategory(id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
};

export const deletecat = (id, status) => {
  return (dispatch) =>
  apiplancomptable.deletecategory(id, status)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
};

export const Updatecat = (cat) => {
  return (dispatch) =>
  apiplancomptable.updatecategory(cat)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
};
export const addsouscategory = (souscat) => {
  return (dispatch) =>
  apiplancomptable.addsouscategory(souscat)
      .then((res) => {console.log(res) ;
         dispatch(getmessage(res.data.msg)) 
         dispatch(Getallcat())
         })
      .catch((err) => console.log(err));
 }
 export const updatesouscategory = (souscat) => {
  return (dispatch) =>
  apiplancomptable.updatesouscategory(souscat)
      .then((res) => {console.log(res) ;
         dispatch(getmessage(res.data.msg)) })
      .catch((err) => console.log(err));
 }
export const gettallcat = (paylod) => ({
  type: Plancomptable.GETALLCat,
  paylod,
});
export const getplan = (paylod) => ({
  type: Plancomptable.GETALLPlan,
  paylod,
});
export const postcat = (paylod) => ({
  type: Plancomptable.POSTPlan,
  paylod,
});
export const getmessage = (paylod) => ({
  type: Plancomptable.getmessage,
  paylod,
});