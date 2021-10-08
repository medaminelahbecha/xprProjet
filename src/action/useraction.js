import * as user from "./type";
import * as apiuser from "../api/userapi";

export const Getalluser = () => {
  return (dispatch) =>
    apiuser
      .getalluser()
      .then((res) => {
        console.log(res);

        dispatch(gettalluser(res.data));
      })
      .catch((err) => console.log(err));
}; 
export const Registeruser = (user) => {
  return (dispatch) =>
    apiuser
      .registeruser(user)
      .then((res) => {
       console.log(res.data);
      })

      .catch((err) => console.log(err));
};
export const Loginn = (login) => {
  return (dispatch) =>
    apiuser.login(login)
      .then((res) => {
        if(res.data.token)
        localStorage.setItem('jwt',res.data.token)
        if(res.data.id)
        localStorage.setItem('_id',res.data.id)
        dispatch(decodetoken(res.data));
      })

      .catch((err) => console.log(err));
};
export const signup = (newuser) => {
  return (dispatch) =>
    apiuser
      .ajouternouvaux(newuser)
      .then((res) => {
        console.log(res.data);
        dispatch(getmessage(res.data));
      })
      .catch((err) => console.log(err));
};
export const getoneuser = (id) => {
  return (dispatch) =>
    apiuser
      .getoneuser(id)
      .then((res) => {
        dispatch(updateuserreducer(res.data));
      })
      .catch((err) => console.log(err));
};

export const deleteUser = (id) => {
  return (dispatch) =>
    apiuser
      .deleteuser(id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
};
export const UpdateUser = (user) => {
  return (dispatch) =>
    apiuser.updateuser(user).then((res) => {
      console.log(res.data);
     
    });
};
/*auth user */
export const getoneauthuser = (id) => {
  return (dispatch) =>
    apiuser
      .getoneuser(id)
      .then((res) => {
        console.log(res.data);
        dispatch(getauthuser(res.data));
      })
      .catch((err) => console.log(err));
};
export const Forgetlogin = (email) => {
  return (dispatch) =>
    apiuser
      .loginforget(email)
      .then((res) => {
        console.log(res.data);
        dispatch(getauthuser(res.data));
      })
      .catch((err) => console.log(err));
};
export const resendmail = (email) => {
  return (dispatch) =>
    apiuser
      .loginforget(email)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
};

export const decodetoken = (paylod) => ({
  type: user.DECODETOKEN,
  paylod,
});
export const updateuserreducer = (paylod) => ({
  type: user.GETONEUSER,
  paylod,
});
export const gettalluser = (paylod) => ({
  type: user.GETALLUSER,
  paylod,
});
export const getmessage = (paylod) => ({
  type: user.REGISTER,
  paylod,
});

export const getauthuser = (paylod) => ({
  type: user.AUTHEUSER,
  paylod,
});
