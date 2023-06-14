import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/Login.css'
import {Button, Container, Form} from "react-bootstrap";

type Props = {
    login: (username: string, password: string) => Promise<void>
}

function Login(props: Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.login(username, password)
            .then(() => {
                navigate("/golfapp")
            })
            .catch((err) => {
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
        </div>
    );
}

export default Login;