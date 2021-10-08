
import * as apiPermission from "../api/permission";
import * as Persmission from "./type"
export const Getallpermission = () => {
  return (dispatch) =>
  apiPermission.getallpermission()
      .then((res) => {
        console.log(res);
          dispatch(getall(res.data))
      })
      .catch((err) => console.log(err));
};

export const postpermission = (permission) => {
  return (dispatch) =>
  apiPermission.postpermission(permission)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err));
};


export const deletepermission = (id) => {
  return (dispatch) =>
  apiPermission.deletepermission(id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
};

export const Updatepermission= (permission) => {
  return (dispatch) =>
  apiPermission.updatepermission(permission)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
}

export const getall = (paylod) => ({
  type : Persmission.GETallPermission ,
    paylod
})