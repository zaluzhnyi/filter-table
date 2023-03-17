import React, {SetStateAction, useCallback} from 'react';
import Table from "react-bootstrap/Table";
import {User} from "../../ interfaces";
import delete_icon from "../../resources/img/delete_icon.svg"
import {ShowParameters} from "../../App";
import "./tableBlock.scss"
import Highlight from "../Highlight/Highlight";
import store from "../../redux/store";


type Props ={
    users:Array<User>
    setUsers:React.Dispatch<SetStateAction<User[]>>
    setShow:React.Dispatch<SetStateAction<ShowParameters>>
}
function TableBlock({users,setUsers,setShow}:Props) {
    const filter = store.getState().users.filter
    let light: (text: string) => JSX.Element;
    light = useCallback((text: string) => {
        return <Highlight text={text} filter={filter!}></Highlight>},[filter])
    return (
        < >
        < Table
        striped = {true}
        bordered = {true}
        hover = {true}
        responsive = "xl" >
            < thead >
            < th >№</th>
    <th>Name</th>
    <th>Username</th>
    <th>Email</th>
    <th></th>
    </thead>
    <tbody>
    {
    users.map((userData)=>{
    let userKeys= Object.keys(userData)
    userKeys = userKeys.filter(el=>el==='id'||el==='name'||el==='username'||el==='email')
    return(
    <tr
    id={userData.id.toString()}
    onClick={(e)=>{
    console.log(2)
    setShow({
    id:e.currentTarget.id,
    stateShow:true,
    user:users.find((user)=>user.id===Number(e.currentTarget.id)) as User
    })
    }}
    >
    {userKeys.map(key=>{
    return(
    <td>{light(userData[key].toString())}</td>
    )
    })}
    <td><button
    id={userData.id.toString()}
    className={'delete-button'}
    onClick={(e)=>{
    e.stopPropagation()
    setUsers([...users.filter((user)=>user.id!==Number(e.currentTarget.id))])
    }}
    ><img src={delete_icon} /></button></td>
    </tr>
    )
    })
    }
    </tbody>
    </Table>
    </>
    );
    }

    export default TableBlock;;