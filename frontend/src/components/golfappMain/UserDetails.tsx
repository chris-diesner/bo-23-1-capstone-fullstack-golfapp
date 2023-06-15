import React, {useEffect} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import '../../styles/UserDetails.css'
import UserHook from "../hooks/UserHook";

function UserDetails() {
    const userHook = UserHook();
    const { userDetails, getUserDetails, user } = userHook;

    useEffect(() => {
        getUserDetails()
            .catch((error) => {
                console.log(error);
            });
    }, [user]);


    function editUserOnSubmit() {

    }

    function onChangeHandlerUsername() {

    }

    function onChangeHandlerFirstName() {

    }

    function onChangeHandlerLastName() {

    }

    function onChangeHandlerHandicap() {

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
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="firstName" value={userDetails?.firstName} onChange={onChangeHandlerFirstName} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="lastName" value={userDetails?.lastName} onChange={onChangeHandlerLastName} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Your Handicap</Form.Label>
                                <Form.Control type="handicap" value={userDetails?.handicap} onChange={onChangeHandlerHandicap} />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Update your personal information
                                </Form.Text>
                            </Form.Group>
                            <Button className="saveButton" type="submit">
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