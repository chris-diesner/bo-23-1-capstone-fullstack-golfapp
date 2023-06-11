import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    register: (username: string, password: string) => Promise<void>;
};


function Register(props: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function registerOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.register(username, password).then(() => {
            navigate("/login");
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
            <h3>Register</h3>
            <form onSubmit={registerOnSubmit}>
                <input type="username" onChange={onChangeHandlerUsername} />
                <input type="password" onChange={onChangeHandlerPassword} />
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
