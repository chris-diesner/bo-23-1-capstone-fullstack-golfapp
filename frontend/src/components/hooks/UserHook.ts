import {useState} from "react";
import axios from "axios";

export default function UserHook() {
    const [user, setUser] = useState<string>();

    function register(username: string, password: string) {
        return axios.post("/api/user/register", undefined, {
            params: {
                username: username,
                password: password,
            },
        })
            .then((response) => setUser(response.data));
    }

    function login(username: string, password: string) {
        return axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then((response) => setUser(response.data))
    }

    function logout() {
        return axios.get("/api/user/logout")
            .then(() => setUser(undefined));
    }
    return {register,login, logout, user};
}
