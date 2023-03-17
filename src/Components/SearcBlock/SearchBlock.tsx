import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {User} from "../../ interfaces";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../redux";
import {useDispatch} from "react-redux";
type Props ={
    users:Array<User>,
    setUsers:Function
}
function SearchBlock({users,setUsers}:Props) {
    type filterData = {
        data:string
        [key: string]: string|number;
    }
    const initialFilterData:filterData = {
        data:''
    }
    const dispatch = useDispatch()
    const {setFilterForState}=bindActionCreators(actionCreators,dispatch)

    const [filter,setFilter] = useState(initialFilterData)

    const filterData = (event:React.MouseEvent<HTMLButtonElement,MouseEvent>):void=>{
        event.preventDefault()
            const filterArray:Array<User> = users.filter((user,i)=>user.name.includes(filter.data)||user.username.includes(filter.data)||user.email.includes(filter.data))
            setUsers(filterArray)
            setFilterForState(filter.data)
            setFilter(initialFilterData)
    }
    return (
        <>
        <Form className={'mb-3'} >
            <Form.Group className={'d-flex'}>
                <Form.Control
                    className={'w-50'}
                    onChange={(event)=>{
                    setFilter({
                        ...filter,
                        data: event.currentTarget.value
                    })
                    }}
                    placeholder={"enter parameters for find"}
                    value={filter.data}
                />
                <Button
                    variant="secondary"
                    onClick={(e)=>filterData(e)}
                >Find</Button>

            </Form.Group>

        </Form>
        </>
    );
}

export default SearchBlock;