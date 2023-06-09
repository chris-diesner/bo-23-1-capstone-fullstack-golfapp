import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/App.css'
import {Button, Container, Form, Toast} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setUserDetails} from "../Actions/GolfAppActions";
import axios from "axios";
import {GolfUser} from "../models/GolfUser";
import Logo from "../media/easySwing_logo.png";
import {motion} from "framer-motion";

type Props = {
    login: (username: string, password: string) => Promise<void>
}

function Login(props: Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [showErrorToast, setShowErrorToast] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.login(username, password)
            .then(() => {
                setShowSuccessToast(true);
                setTimeout(() => {
                    navigate("/golfapp");
                }, 5000);
            })
            .then(() => axios
                .get("/api/user/details/" + username)
                .then((response) => {
                    const golfUser: GolfUser = {
                        id: response.data.id,
                        username: response.data.username,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        handicap: response.data.handicap,
                        profilePicture: response.data.profilePicture,
                    };
                    dispatch(setUserDetails(golfUser));
                })
                .catch((error) => console.log(error))
            );
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    return (
        <motion.div className="App-Page" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <header className="App-Header">
                <img src={Logo} alt="Logo"></img>
            </header>
            <div className="AppContainer">
                <Container className="d-flex flex-column justify-content-center">
                    <div className="AppContent">
                        <div className="AppHeader">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => navigate("/")}>
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            <h3>Login</h3>
                            <div className="invisibleDiv"></div>
                        </div>
                        <div className="AppForm">
                            <Form onSubmit={loginOnSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>E-Mail Adresse</Form.Label>
                                    <Form.Control type="email" onChange={onChangeHandlerUsername} placeholder="Email"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Passwort</Form.Label>
                                    <Form.Control type="password" onChange={onChangeHandlerPassword}
                                                  placeholder="Password"/>
                                </Form.Group>
                                <Button className="btn btn-secondary" type="submit">
                                    Login
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
                        <Toast.Body>Login successful - you will forwarded shortly</Toast.Body>
                    </Toast>
                    <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg={'danger'}
                           className="error-toast" autohide={true} delay={5000}>
                        <Toast.Header closeButton={false}>
                            <strong>Error</strong>
                        </Toast.Header>
                        <Toast.Body>Username or Password invalid</Toast.Body>
                    </Toast>
                </div>
            </div>
        </motion.div>
    );
}

export default Login;