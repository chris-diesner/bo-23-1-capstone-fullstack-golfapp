import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

type Props = {
    login: (username: string, password: string) => Promise<void>;
}

function Login(props:Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function loginOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.login(username, password).then(() => {
            navigate("/golfapp");
        });
    }

    function onChangeHandlerUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.currentTarget.value);
    }

    function onChangeHandlerPassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={loginOnSubmit}>
                <input type="username" onChange={onChangeHandlerUsername}/>
                <input type="password" onChange={onChangeHandlerPassword}/>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;