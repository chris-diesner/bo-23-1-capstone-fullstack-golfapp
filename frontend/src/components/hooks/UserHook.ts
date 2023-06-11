import { useState } from "react";
import axios from "axios";

export default function UserHook() {
    const [user, setUser] = useState<string>();

    function login(username: string, password: string) {
        return axios.post("/api/user/login", null, {
            auth: {
                username: username,
                password: password,
            },
        })
            .then((response) => {
                setUser(response.data);
                return response.data;
            });
    }

    function register(username: string, password: string) {
        return axios.post("/api/user/register", null, {
            params: {
                username: username,
                password: password,
            },
        })
            .then((response) => {
                setUser(response.data);
                return response.data;
            });
    }

    return { login, register, user };
}
