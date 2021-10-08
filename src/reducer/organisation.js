import * as organisation from '../action/type'
const Porod = {
    Orgn : [],
    Message : ''
}

export const Organisation = (state = Porod, action) => {
    switch (action.type) {
        case (organisation.GETONORGANISATION):
            return {
                ...state,
                Orgn : [action.paylod] }
  

        default:
            return state

    }
}