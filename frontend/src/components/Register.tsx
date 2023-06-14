import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import {Button, Container, Form} from "react-bootstrap";

type Props = {
    register: (username: string, password: string) => Promise<void>;
};

function Register(props: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
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
            console.log("Passwords do not match");
            return;
        }
        if (!passwordValid) {
            console.log("Password must be at least 6 characters long");
            return;
        }
        props.register(username, password)
            .then(() => {
                navigate("/Login");
            })
            .catch((error) => {
                console.log("Registration failed:", error);
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
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>
        </div>
        /*<div className="Register">
            <h3>Register</h3>
            <form onSubmit={registerOnSubmit}>
                <input type="username" onChange={onChangeHandlerUsername} placeholder="Email"/>
                <br />
                <input type="password" onChange={onChangeHandlerPassword} placeholder="Password"/>

                <br />
                <input type="password" onChange={onChangeHandlerConfirmPassword} placeholder="Confirm Password" />
                {!passwordValid && <p>Password must be at least 6 characters long</p>}
                {!passwordsMatch && <p>Passwords do not match</p>}
                <br />
                <button>Register</button>
            </form>
        </div>*/
    );
}

export default Register;
