import * as Plan from '../action/type'

const perso = {
Plans : [] ,
message : '',
cat : []

} 

export const Plans = (state = perso  , action) => {
    switch(action.type) {
       
    case (Plan.GETALLCat):
       return  {
           ...state ,
           cat : action.paylod
       }
       case  (Plan.getmessage):
        return {...state ,
            message : action.paylod  }
      case  (Plan.POSTPlan):
        return {...state ,
            Plans : [...state , action.paylod] }
        case (Plan.DELATEPlan):
        return { ...state ,
            Plans : state.filter(el => el!== action.paylod)
        }
        case (Plan.GETALLPlan): 
        return {
            ...state ,
            Plans :  action.paylod
        }
    default:
    return state
    }

}