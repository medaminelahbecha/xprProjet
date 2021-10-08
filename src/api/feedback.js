import Axios from "axios";
import { URL } from "./url";
import Cookies from "js-cookie";
const token = Cookies.get("jwt");

const config = {
  headers: {
    Authorization: `${token}`,
  },
};
export const getallfeedbacks = () => Axios.get(URL + "api/feedback", config);
export const getonefeedback = (id) =>
  Axios.get(URL + `api/feedback/${id}`, config);
export const postfeedback = (feedback) =>
  Axios.post(URL + "api/feedback/create", feedback, config);

export const deletefeedback = (id) =>
  Axios.delete(URL + `api/feedback/delete/${id}`, config);
export const updatefeedback = (feedback) =>
  Axios.patch(
    URL + `api/feedback/seenfadback/${feedback._id}`,
    feedback,
    config
  );
