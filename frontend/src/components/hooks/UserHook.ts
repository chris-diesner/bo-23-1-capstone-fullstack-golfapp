import {useState} from "react";
import axios from "axios";
import {GolfUser} from "../../models/GolfUser";

export default function UserHook() {
    const [user, setUser] = useState<string>();
    const [userDetails, setUserDetails] = useState<GolfUser | null>(null);

    function getUserDetails(): Promise<void> {
        axios
            .get("/api/user/details/"+user)
            .then((response) => {
                const golfUser: GolfUser = {
                    id: response.data.id,
                    username: response.data.username,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    handicap: response.data.handicap,
                    profilePicture: response.data.profilePicture,
                };
                setUserDetails(golfUser);
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
