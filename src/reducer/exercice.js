
import * as exerc from '../action/type'
const Porod = {
    Exercice : [],
    Message : ''
}

export const Exercice = (state = Porod, action) => {
    switch (action.type) {
        case (exerc.GETALLEXERCICE):
            return {
                ...state    ,
                Exercice : action.paylod }
        case (exerc.POSTEXERCICE):
            return {
                ...state    ,
                Exercice : [action.paylod,...state.Exercice] }
         case(exerc.DELATEEXERCICE):
         let cl = Object(state.Client)
         return {
             ...state    ,
             Exercice : cl.filter(el => el._id !== action.paylod)    }

        default:
            return state

    }
}