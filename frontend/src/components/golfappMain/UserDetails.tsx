import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import '../../styles/UserDetails.css'
import UserHook from "../hooks/UserHook";
import {GolfUser} from "../../models/GolfUser";
import userDetails from "./UserDetails";

type Props = {
    editUserDetails: (id: string, golfUser: GolfUser) => Promise<void>;
}
function UserDetails(props: Props) {
    const {userDetails, getUserDetails, user} = UserHook();
    const [editedUserDetails, setEditedUserDetails] = useState<GolfUser>({
        id: userDetails?.id ?? '',
        username: '',
        firstName: '',
        lastName: '',
        handicap: 0,
        profilePicture: '',
    });
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [handicap, setHandicap] = useState('');

    useEffect(() => {
        getUserDetails()
            .catch((error) => {
                console.log(error);
            });
    }, [user]);

    useEffect(() => {
        if (userDetails) {
            setEditedUserDetails(userDetails);
        }
    }, [userDetails]);


    function editUserOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.editUserDetails(editedUserDetails.id, editedUserDetails)
            .then(() => {
                console.log("User details updated");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setUsername(value);
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            username: value,
        }));
    }

    function onChangeHandlerFirstName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setFirstName(value);
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            firstName: value,
        }));
    }

    function onChangeHandlerLastName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setLastName(value);
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            lastName: value,
        }));
    }

    function onChangeHandlerHandicap(e: ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(e.currentTarget.value);
        setHandicap(value.toString());
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            handicap: value,
        }));
    }

    return (
        <div className="UserDetailsContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="RegisterContent">
                    <h3>Your Profile</h3>
                    <div className="UserDetailsForm">
                        <Form onSubmit={editUserOnSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={userDetails?.username}
                                              onChange={onChangeHandlerUsername}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="firstName" value={userDetails?.firstName}
                                              onChange={onChangeHandlerFirstName}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="lastName" value={userDetails?.lastName}
                                              onChange={onChangeHandlerLastName}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Your Handicap</Form.Label>
                                <Form.Control type="handicap" value={userDetails?.handicap}
                                              onChange={onChangeHandlerHandicap}/>
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
