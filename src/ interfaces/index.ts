import {ActionTypes} from "../redux/action-types";
type Company = {
    companyName:string
}
type Address ={
    city:string,
    street:string,
    suite:string,
    zipcode:string
}
export interface User{
    id:number,
    name:string,
    username:string,
    email:string,
    company:Company,
    address:Address,
    [key: string]: string|number|Company|Address;
}

export interface ActionGetUser  {
    isFetching:boolean,
    data?:Array<User>,
    type:ActionTypes.GET_USERS,
}
export interface ActionSendRequest  {
    isFetching:boolean,
    type:ActionTypes.SEND_REQUEST,
}

export interface ActionSetFilter{
    type:ActionTypes.SET_FILTER,
    filter:string
}