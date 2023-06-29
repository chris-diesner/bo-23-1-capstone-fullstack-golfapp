import {useState, useEffect} from "react";
import axios from "axios";
import {GolfUser} from "../../models/GolfUser";
import {useDispatch} from "react-redux";
import secureLocalStorage from "react-secure-storage";

export default function UserHook() {
    const [user, setUser] = useState<string>();
    const [userDetails, setUserDetails] = useState<GolfUser | null>(null);

    useEffect(() => {
        function getCurrentUser() {
            return axios.get("/api/user/me2")
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    console.log(error);
                    return null;
                });
        }

        getCurrentUser().then((currentUser) => {
            setUser(currentUser);
        });
    }, [user]);

    function getUserDetails(): Promise<void> {
        return axios
            .get("/api/user/details/" + user)
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
    }

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

    return {register, login, logout, user, userDetails, getUserDetails, editUserDetails};
}
