import {useEffect, useState} from "react";
import axios from "axios";
import {GolfUser} from "../../models/GolfUser";

export default function UserHook() {
    const [user, setUser] = useState<string>();
    const [userDetails, setUserDetails] = useState<GolfUser | null>(null);

    function getUserDetails(): Promise<void> {
        axios
            .get("/api/user/details/"+user)
            .then((response) => response.data)
            .then((data) => {
                setUserDetails(data);
                console.log(data)
            })
            .catch((error) => console.log(error));
        return Promise.resolve();
    }

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
    return {register,login, logout, user, userDetails, getUserDetails};
}
