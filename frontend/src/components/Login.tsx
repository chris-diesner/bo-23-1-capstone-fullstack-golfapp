import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/Login.css'

type Props = {
    login: (username: string, password: string) => Promise<void>
}

function Login(props:Props) {
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
        <div className="Login">
            <h3>Login</h3>
            <form onSubmit={loginOnSubmit}>
                <input type="text" onChange={onChangeHandlerUsername} placeholder="Email"/>
                <input type="password" onChange={onChangeHandlerPassword} placeholder="Password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;