import * as feedback from "./type";
import * as apifeedback from "../api/feedback";

export const getallfeedbacks = () => {
  return (dispatch) =>
    apifeedback
      .getallfeedbacks()
      .then((res) => {
        console.log(res);

        dispatch(gettallfeedbacks(res.data));
      })
      .catch((err) => console.log(err));
};
export const getonefeedback = (id) => {
  return (dispatch) =>
    apifeedback
      .getonefeedback(id)
      .then((res) => {
        dispatch(updatfeedback(res.data));
      })
      .catch((err) => console.log(err));
};

export const postfeedback = (feedback) => {
  return (dispatch) =>
    apifeedback
      .postfeedback(feedback)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
};
export const deletefeedback = (id) => {
  return (dispatch) =>
    apifeedback
      .deletefeedback(id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
};
export const UpdateFeedback = (feedback) => {
  return (dispatch) =>
    apifeedback.updatefeedback(feedback).then((res) => {
      console.log(res.data);
    });
};

export const updatfeedback = (paylod) => ({
  type: feedback.UPDATEFEEDBACK,
  paylod,
});
export const gettallfeedbacks = (paylod) => ({
  type: feedback.GETALLFEEDBACKS,
  paylod,
});
