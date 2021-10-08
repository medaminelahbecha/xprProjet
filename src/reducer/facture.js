import * as scanfacture from '../action/type'
const Porod = {
    facture : [],
    Message : ''
}

export const Factures = (state = Porod, action) => {
    switch (action.type) {
        case (scanfacture.GETALLFACTURE):
            return {
                ...state    ,
                facture : action.paylod }
         case(scanfacture.POSTFACTURE):
         
         return {
             ...state    ,
             Message :  action.paylod    }

        default:
            return state

    }
}