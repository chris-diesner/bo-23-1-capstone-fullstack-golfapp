import {useState} from "react";
import axios from "axios";
import {GolfUser} from "../../models/GolfUser";
import secureLocalStorage from "react-secure-storage";

export default function UserHook() {
    const [user, setUser] = useState<string>();

    function register(username: string, password: string) {
        return axios
            .post("/api/user/register", undefined, {
                params: {
                    username: username,
                    password: password,
                },
            })
            .then((response) => setUser(response.data));
    }

    function editUserDetails(userId: string, updatedUserDetails: GolfUser): Promise<void> {
        return axios
            .put("/api/user/details/" + userId, updatedUserDetails)

            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

    function login(username: string, password: string) {
        return axios
            .post("/api/user/login", undefined, {auth: {username, password}})
            .then((response) => {
                if (response.status === 200) {
                    secureLocalStorage.setItem("username", response.data.username)
                }
                else {
                    secureLocalStorage.setItem("username", "Anonymous User.")
                }
            })
            .catch((error) => {
                    console.log(error)
                    secureLocalStorage.setItem("username", "Anonymous User.")
                }
            )
    }

    function logout() {
        return axios.get("/api/user/logout")
            .then(() => secureLocalStorage.removeItem("username"))
            .catch(error => console.log(error))
    }

    return {register, login, logout, user, editUserDetails};
}
