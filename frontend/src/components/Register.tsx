import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/App.css';
import {Button, Container, Form, Toast} from 'react-bootstrap';
import Logo from "../media/easySwing_logo.png";

type Props = {
    register: (username: string, password: string) => Promise<void>;
};

function Register(props: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [error, setError] = useState<string>('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    useEffect(() => {
        setPasswordValid(password.length >= 6 && password.length <= 20);
    }, [password]);

    function registerOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!passwordsMatch) {
            setError('Passwords do not match');
            setShowErrorToast(true);
            return;
        }
        if (!passwordValid) {
            setError('Password must be at least 6 characters long');
            setShowErrorToast(true);
            return;
        }
        props.register(username, password)
            .then(() => {
                setShowSuccessToast(true);
                setTimeout(() => {
                    navigate('/Login');
                }, 5000);
            })
            .catch((error) => {
                setError(`Registration failed: ${error?.response?.data?.message ?? 'Registration failed'}`);
                setShowErrorToast(true);
            });
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.currentTarget.value);
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }

    function onChangeHandlerConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.currentTarget.value);
    }

    return (
        <div className="App-Page">
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
                            <h3>Your Profile</h3>
                            <div className="invisibleDiv"></div>
                        </div>
                        <div className="AppForm">
                            <Form onSubmit={registerOnSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>E-Mail Adresse</Form.Label>
                                    <Form.Control type="email" onChange={onChangeHandlerUsername} placeholder="Email"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Passwort</Form.Label>
                                    <Form.Control type="password" onChange={onChangeHandlerPassword}
                                                  placeholder="Password"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Passwort</Form.Label>
                                    <Form.Control type="password" onChange={onChangeHandlerConfirmPassword}
                                                  placeholder="Password"/>
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Your password must be 6-20 characters long.
                                    </Form.Text>
                                </Form.Group>
                                <Button className="registerButton" type="submit">
                                    Sign Up
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
                        <Toast.Body>Registration successful - you will forwarded shortly</Toast.Body>
                    </Toast>
                    <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg={'danger'}
                           className="error-toast" autohide={true} delay={5000}>
                        <Toast.Header closeButton={false}>
                            <strong>Error</strong>
                        </Toast.Header>
                        <Toast.Body>{error}</Toast.Body>
                    </Toast>
                </div>
            </div>
        </div>
    );
}

export default Register;
