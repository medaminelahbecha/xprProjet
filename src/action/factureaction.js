import * as Facture from "./type";
import * as apiFacture from "../api/facture";

export const GetallFacture = () => {
  return (dispatch) =>
    apiFacture
      .getallfacture()
      .then((res) => {
        dispatch(gettallfactures(res.data));
      })
      .catch((err) => console.log(err));
};

export const postFacture = (newfac) => {
  console.log(newfac);
  return (dispatch) =>
    apiFacture
      .postfacture(newfac)
      .then((res) => {
        console.log(res.data);
        dispatch(getmessage(res.data));
      })
      .catch((err) => console.log(err));
};

export const getoneFacture = (id) => {
  return (dispatch) =>
    apiFacture
      .getonefacture(id)
      .then((res) => {
        dispatch(apiFacture.updatefacture(res.data));
      })
      .catch((err) => console.log(err));
};

export const deleteFacture = (id, status) => {
  return (dispatch) =>
    apiFacture
      .deletefacture(id, status)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
};

export const UpdateFacture = (facture) => {
  return (dispatch) =>
    apiFacture
      .updatefacture(facture)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
};

export const gettallfactures = (paylod) => ({
  type: Facture.GETALLFACTURE,
  paylod,
});

export const getmessage = (paylod) => ({
  type: Facture.POSTFACTURE,
  paylod,
});
