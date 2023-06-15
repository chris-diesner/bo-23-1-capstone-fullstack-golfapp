import React, {useEffect} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import '../../styles/UserDetails.css'
import UserHook from "../hooks/UserHook";

type Props = {
    getUserDetails: () => Promise<void>
}

function UserDetails(props:Props) {
    const {userDetails} = UserHook()

    useEffect(() => {
        props.getUserDetails();
    }, []);
    function editUserOnSubmit() {

    }

    function onChangeHandlerUsername() {

    }

    function onChangeHandlerPassword() {

    }

    function onChangeHandlerConfirmPassword() {

    }

    return (
        <div className="UserDetailsContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="RegisterContent">
                    <h3>Sign Up</h3>
                    <div className="UserDetailsForm">
                        <Form onSubmit={editUserOnSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={userDetails?.username} onChange={onChangeHandlerUsername}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control type="password" onChange={onChangeHandlerPassword} placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Passwort</Form.Label>
                                <Form.Control type="password" onChange={onChangeHandlerConfirmPassword} placeholder="Password" />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Your password must be 6-20 characters long.
                                </Form.Text>
                            </Form.Group>
                            <Button className="registerButton" type="submit">
                                Save
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default UserDetails;