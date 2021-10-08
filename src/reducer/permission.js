import * as Permissi from '../action/type'
const Porod = {
    Permission: [],
    Message : ''
}

export const Permission = (state = Porod, action) => {
    switch (action.type) {
        case (Permissi.GETallPermission):
            return {
                ...state,
                Permission : action.paylod}
        default:
            return state

    }
}