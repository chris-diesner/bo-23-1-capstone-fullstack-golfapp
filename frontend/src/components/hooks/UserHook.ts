import {useState} from "react";
import axios from "axios";

export default function UserHook () {
    const [user, setUser] = useState<string>();
    function login(username: string, password: string) {
        return axios.post("/user/login", undefined, {auth: {username, password}})
            .then((response) => setUser(response.data))
    }
    return {login, user}
}