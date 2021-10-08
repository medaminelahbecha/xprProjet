import * as exerc from "../action/type";
const Porod = {
  Feedback: [],
  Message: "",
};

export const Feedback = (state = Porod, action) => {
  switch (action.type) {
    case exerc.GETALLFEEDBACKS:
      return {
        ...state,
        Feedback: action.paylod,
      };
    case exerc.POSTFEEDBACK:
      return {
        ...state,
        Feedback: [action.paylod, ...state.Feedback],
      };
    case exerc.DELATEFEEDBACK:
      let cl = Object(state.Client);
      return {
        ...state,
        Feedback: cl.filter((el) => el._id !== action.paylod),
      };

    default:
      return state;
  }
};
