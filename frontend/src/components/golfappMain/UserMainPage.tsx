import React from 'react';
import '../../styles/UserMainPage.css'
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";

type Props = {
    logout: () => Promise<void>
    getUserDetails: () => Promise<void>
}

function UserMainPage(props: Props) {
    const navigate = useNavigate();

    function onClickLogout() {
        props.logout()
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function userDetailsOnClick() {
        props.getUserDetails()
            .then(() => {
            navigate("/golfapp/userdetails")
        })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="UserMainContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="UserMainContent">
                    <div className="UserMainHeader">
                        <div className="invisibleDiv"></div>
                        <button onClick={userDetailsOnClick}>User Details</button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path fill-rule="evenodd"
                                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fill-rule="evenodd"
                                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <br/>
                    <h5>What' new:</h5>
                    <ul>
                        <li>Added a Register Page</li>
                        <li>Email & Password Validation</li>
                        <li>Added a Login Page</li>
                        <li>Added a User Details Page</li>
                        <li>Profile can be updated</li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}

export default UserMainPage;