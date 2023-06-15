import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { Button, Container, Form, Toast } from 'react-bootstrap';

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
        <div className="RegisterContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="RegisterContent">
                    <h3>Sign Up</h3>
                    <div className="RegisterForm">
                        <Form onSubmit={registerOnSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>E-Mail Adresse</Form.Label>
                                <Form.Control type="email" onChange={onChangeHandlerUsername} placeholder="Email" />
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
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
            <div className="toast-container middle-center">
                <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} bg={'success'} className="success-toast" autohide={true} delay={5000}>
                    <Toast.Header closeButton={false}>
                        <strong>Success</strong>
                    </Toast.Header>
                    <Toast.Body>Registration successful - you will forwarded shortly</Toast.Body>
                </Toast>
                <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg={'danger'} className="error-toast" autohide={true} delay={5000}>
                    <Toast.Header closeButton={false}>
                        <strong>Error</strong>
                    </Toast.Header>
                    <Toast.Body>{error}</Toast.Body>
                </Toast>
            </div>
        </div>
    );
}

export default Register;
