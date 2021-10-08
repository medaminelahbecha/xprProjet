import * as fournisseur from '../action/type'

const initistate =  {
    fournisseurs : [] ,
   message : ''
   }
export const Fournisseurs = (state = initistate, action) => {
    switch (action.type) {
        case (fournisseur.GETALLFOURNISSEUR):
            return {
                ...state    ,
                fournisseurs :  action.payload   }
         case(fournisseur.DELATEFOURNISSEUR):
         let  fr = Object(state.user)
         return {
             ...state ,
             fournisseurs : fr.filter ( el => el._id !== action.payload)
              }

        default:
            return state

    }
}