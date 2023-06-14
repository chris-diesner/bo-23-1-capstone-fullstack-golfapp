import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/Login.css'
import {Button, Container, Form, Toast} from "react-bootstrap";

type Props = {
    login: (username: string, password: string) => Promise<void>
}

function Login(props: Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [showErrorToast, setShowErrorToast] = useState(false)
    const navigate = useNavigate();

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.login(username, password)
            .then(() => {
                setShowSuccessToast(true)
                setTimeout(() => {
                navigate("/golfapp")
                }, 5000)
            })
            .catch((err) => {
                setShowErrorToast(true)
                console.log(err)
            })
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    return (
        <div className="LoginContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="LoginContent">
                    <h3>Login</h3>
                    <div className="LoginForm">
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
                            <Button className="loginButton" type="submit">
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
                    <Toast.Body>Login successful - you will forwarded shortly</Toast.Body>
                </Toast>
                <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg={'danger'} className="error-toast" autohide={true} delay={5000}>
                    <Toast.Header closeButton={false}>
                        <strong>Error</strong>
                    </Toast.Header>
                    <Toast.Body>Username or Password invalid</Toast.Body>
                </Toast>
            </div>
        </div>
    );
}

export default Login;