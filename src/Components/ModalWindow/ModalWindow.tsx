import React, {SetStateAction, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {User} from "../../ interfaces";
import {ShowParameters} from "../../App";
type Props ={
    showParameters:ShowParameters
    setShow:React.Dispatch<SetStateAction<ShowParameters>>
}
function ModalWindow({setShow,showParameters}:Props) {
    function handleClose() {
      setShow({
          id:null,
          stateShow:false,
          user:{} as User
      })
    }
    const additionalDataUser = Object.entries({...showParameters.user?.company,...showParameters.user?.address})
    return (
        <>
            <Modal show={showParameters.stateShow} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Additional information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {
                            additionalDataUser.map(el=>{
                                return(
                                    <Form.Group className="mb-3">
                                        <Form.Label>{el[0].replace(/([a-z])([A-Z])/g, '$1 $2')}</Form.Label>
                                        <Form.Control
                                            value={el[1]}
                                            disabled={true}
                                        />
                                    </Form.Group>
                                )
                            })
                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalWindow;