import React from 'react';
import '../../styles/UserMainPage.css'
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

type Props = {
    logout: () => Promise<void>
    getUserDetails: () => Promise<void>
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

    function userDetailsOnClick() {
        props.getUserDetails().then(()=>{
            navigate("/golfapp/userdetails")
        })
    }

    return (
        <div className="UserMainContainer">
            <button onClick={userDetailsOnClick}>User Details</button>
            <Container className="d-flex flex-column justify-content-center">
                <div className="UserMainContent">
                    <h3>Welcome To My GolfApp (WIP)</h3>
                    <br/>
                    <h5>What' new:</h5>
                    <ul>
                        <li>Added a Register Page</li>
                        <li>Email & Password Validation</li>
                        <li>Added a Login Page</li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default UserMainPage;