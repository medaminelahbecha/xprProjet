import Axios from "axios";
import { URL, URLinscription } from "./url";
import Cookies from "js-cookie";
const token = Cookies.get("jwt");
const config = {
  headers: {
    Authorization: `${token}`,
  },
};
export const getalluser = () => Axios.get(URL + "api/user", config);
export const getoneuser = (id) =>
  Axios.get(URL + `api/user/getone/${id}`, config);
export const postuser = (user) =>
  Axios.post(
    URL + "api/user/postuser",
    {
      user,
    },
    config
  );
export const login = (login) =>  Axios.post(URL + "api/user/auth", login);

export const loginforget = (email) => {
  console.log(email)
  return Axios.post(URL + "api/user/veriflogin", email);
};
export const ajouternouvaux = (user) =>
  Axios.post(URLinscription + "api/myClient/register", user);
export const registeruser = (user) =>Axios.post(URL + "api/user/registeruser", user);
export const deleteuser = (id) =>
  Axios.delete(URL + `api/user/delete/${id}`, config);
export const resendmail = (email) =>
  Axios.post(URLinscription + `api/myClient/reSend/`);
export const updateuser = (user) =>
  Axios.patch(URL + `api/user/${user._id}`, user, config);
