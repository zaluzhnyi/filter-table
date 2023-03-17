import {Dispatch} from "redux";
import {Action} from "../actions";
import {User} from "../../ interfaces";
import {ActionTypes} from "../action-types";
import {API_URL} from "../../constants";



export  function  getUsers(){
    return async (dispatch:Dispatch<Action>) =>{
        dispatch({
            type:ActionTypes.SEND_REQUEST,
            isFetching:true
        })
       await fetch(API_URL)
            .then((resp) => resp.json())
            .then((data:Array<any>)=>{
                console.log(data)
                const users = data.map((user:any)=>{
                    return{
                        id:user.id,
                        name:user.name,
                        username:user.username,
                        email:user.email,
                        company:{
                            companyName:user.company.name
                        },
                        address:{
                            city:user.address.city,
                            street:user.address.street,
                            suite:user.address.suite,
                            zipcode:user.address.zipcode
                        }
                    }
                })
                dispatch({
                    type:ActionTypes.GET_USERS,
                    data:users,
                    isFetching:false
                })
            })
            .catch((error)=>console.log(error))
    }
}
export function setFilterForState(filter:string) {
    return (dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionTypes.SET_FILTER,
            filter:filter
        })
    }

}