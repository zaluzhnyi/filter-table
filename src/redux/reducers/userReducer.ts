import {ActionTypes} from "../action-types";
import {Action} from "../actions";
import {User} from "../../ interfaces";

export type StateUserReducer={
    isFetching?:boolean,
    data?:Array<User>,
    filter?:string
}

const initialState:StateUserReducer= {
    isFetching:false,
    data:[],
    filter:''
}

export  const userReducer = (state:StateUserReducer=initialState, action:Action)=>{

    switch (action.type) {
        case ActionTypes.GET_USERS:{
            return ({
                ...state,
               data:action.data
            })
            break;
        }
        case ActionTypes.SEND_REQUEST:{
            return ({
                ...state,
                isFetching:action.isFetching
            })
            break;
        }
        case ActionTypes.SET_FILTER:{
            return ({
                ...state,
                filter:action.filter
            })
            break;
        }
        default: return state
    }

}