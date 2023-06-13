import React from 'react';
import '../../styles/UserMainPage.css'
import {useNavigate} from "react-router-dom";

type Props = {
    logout: () => Promise<void>
}

function UserMainPage(props:Props) {
    const navigate = useNavigate();

    function logoutOnClick() {
        props.logout()
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="UserMainTop">
            <h1>UserMainPage (WIP)</h1>
            <br/>
            <h5>What' new:</h5>
            <button onClick={logoutOnClick}>Logout</button>
        </div>
    );
}

export default UserMainPage;