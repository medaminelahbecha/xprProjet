
import * as client from '../action/type'
const Porod = {
    Client : [],
    Message : '',
    lastclient : {}
}

export const Clients = (state = Porod, action) => {
    switch (action.type) {
        case (client.GETALLCLIENT):
            return {
                ...state    ,
                Client : action.paylod }
        case (client.GETlast):
            return {
                ...state    ,
                lastclient : action.paylod }
         case(client.DELATECLIENT):
         let cl = Object(state.Client)
         return {
             ...state    ,
             Client : cl.filter(el => el._id !== action.paylod)    }

        default:
            return state

    }
}