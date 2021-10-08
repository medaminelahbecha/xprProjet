import * as User from '../action/type'
import jwt from 'jsonwebtoken'
import {login} from '../utils'
const perso = {
Users : [] ,
message : '',
Userconnected : ''
} 
export const initialState = null

export const Users = (state = perso  , action) => {
    switch(action.type) {
        case(User.AUTHEUSER):
        return  {
            ...state,
            Userconnected : action.paylod
        }
        case (User.REGISTER):
       return  {
           ...state ,
           message : action.paylod
       }
    case (User.GETALLUSER):
       return  {
           ...state ,
           Users : action.paylod
       }
      case  (User.POSTUSER):
        return {...state ,
            Users : [...state , action.paylod] }
        case (User.DELATEUSER):
        return { ...state ,
            Users : state.filter(el => el!== action.paylod)
        }
        case (User.GETONEUSER):
        return { ...state ,
            Users: [action.paylod] }
        case(User.DECODETOKEN):
        console.log(action.paylod)
        if(action.paylod.token){
       // let decode = jwt.decode(action.paylod.token);
        login(action.paylod.token)
        }
        return { ...state ,
            message: action.paylod }
    default:
    return state
    }

}