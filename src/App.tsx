import React, {useEffect, useState} from 'react';
import './App.scss';
import { useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators, State} from "./redux"
import SearchBlock from "./Components/SearcBlock/SearchBlock";
import TableBlock from "./Components/TableBlock/TableBlock";
import {User} from "./ interfaces"
import store from "./redux/store";
import ModalWindow from "./Components/ModalWindow/ModalWindow";
import {Button} from "react-bootstrap";


export type ShowParameters ={
  id: string|number|null
  stateShow: boolean
  user:User
}

function App() {
  const dispatch = useDispatch()
  const {getUsers}=bindActionCreators(actionCreators,dispatch)
  const {setFilterForState}=bindActionCreators(actionCreators,dispatch)
  const users = useSelector((state:State) => state.users.data) as Array<User>
  const initialShowParameters:ShowParameters = {
    id:null,
    stateShow:false,
    user:{} as User
  }
  const [usersData,setUsersData]=useState(Array<User>)
  const [showParameters, setShowParameters] = useState(initialShowParameters);
  useEffect(()=>{
    (async ()=>{
      await getUsers()
      const {users} = store.getState()
      setUsersData(users.data!)
    })()
  },[])

  return (
    <div className={`d-flex flex-column mx-auto p-3 w-75`}>
    <SearchBlock
        users={usersData!}
        setUsers = {setUsersData}
    />
    <TableBlock
    users={usersData!}
    setUsers = {setUsersData}
    setShow = {setShowParameters}
    />
    <ModalWindow
        setShow = {setShowParameters}
        showParameters = {showParameters}
    />
    <Button variant="secondary" onClick={()=>{
      setUsersData(users)
      setFilterForState('')
    }}>Reset</Button>
    </div>
  );
}

export default App;
