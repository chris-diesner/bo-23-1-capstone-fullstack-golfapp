import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Button, Container, Form, Toast} from "react-bootstrap";
import '../../styles/App.css'
import {GolfUser} from "../../models/GolfUser";
import validator from "validator";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails} from "../../Actions/GolfAppActions";

type Props = {
    editUserDetails: (id: string, golfUser: GolfUser) => Promise<void>;
    logout: () => Promise<void>;
}

function UserDetails(props: Props) {
    const userDetails = useSelector((state: any) => state.golfApp.userDetails)
    const [editedUserDetails, setEditedUserDetails] = useState<GolfUser>({
        id: userDetails?.id ?? '',
        username: '',
        firstName: '',
        lastName: '',
        handicap: 0,
        profilePicture: '',
    });
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (userDetails) {
            setEditedUserDetails(userDetails);
        }
    }, [userDetails]);


    function editUserOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.editUserDetails(editedUserDetails.id, editedUserDetails)
            .then(() => {
                dispatch(setUserDetails(editedUserDetails))
                setShowSuccessToast(true);
                navigate("/golfapp")
            })
            .catch((error) => {
                setShowErrorToast(true)
                console.log(error);
            })
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            username: value,
        }));
    }

    function onChangeHandlerFirstName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            firstName: value,
        }));
    }

    function onChangeHandlerLastName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            lastName: value,
        }));
    }

    function onChangeHandlerHandicap(e: ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(e.currentTarget.value);
        setEditedUserDetails((prevDetails) => ({
            ...prevDetails,
            handicap: value,
        }));
    }

    function onFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setEditedUserDetails((prevDetails) => ({
                    ...prevDetails,
                    profilePicture: base64String,
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    function onClickLogout() {
        props.logout()
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="AppContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="AppContent">
                    <div className="AppHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => window.history.back()}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h3>Your Profile</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <div className="AppForm">
                        <Form onSubmit={editUserOnSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={userDetails?.username}
                                              onChange={onChangeHandlerUsername}
                                              isInvalid={!validator.isEmail(userDetails?.username || '')}
                                              required
                                              disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPicture">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" onChange={onFileChange} />
                                {editedUserDetails.profilePicture && (
                                    <div className="preview">
                                        <img src={editedUserDetails.profilePicture} alt="Profile" width={150} height={150} />
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" defaultValue={userDetails?.firstName}
                                              onChange={onChangeHandlerFirstName}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" defaultValue={userDetails?.lastName}
                                              onChange={onChangeHandlerLastName}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicNumber">
                                <Form.Label>Your Handicap</Form.Label>
                                <Form.Control type="text" defaultValue={userDetails?.handicap}
                                              onChange={onChangeHandlerHandicap}
                                              pattern="[0-9]*[.]?[0-9]*"/>
                                <Form.Text id="userDeailsHelperBlock" muted>
                                    Update your personal information
                                </Form.Text>
                            </Form.Group>
                            <Button className="btn btn-secondary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
            <div className="toast-container middle-center">
                <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} bg={'success'}
                       className="success-toast" autohide={true} delay={5000}>
                    <Toast.Header closeButton={false}>
                        <strong>Success</strong>
                    </Toast.Header>
                    <Toast.Body>Successfully updated your profile</Toast.Body>
                </Toast>
                <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg={'danger'}
                       className="error-toast" autohide={true} delay={5000}>
                    <Toast.Header closeButton={false}>
                        <strong>Error</strong>
                    </Toast.Header>
                    <Toast.Body>Something went wrong - try again later</Toast.Body>
                </Toast>
            </div>
        </div>
    );
}

export default UserDetails;
