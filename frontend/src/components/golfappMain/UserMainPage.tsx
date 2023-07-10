import React from 'react';
import '../../styles/App.css'
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import userImage from '../../media/user.png'
import {useSelector} from "react-redux";

type Props = {
    logout: () => Promise<void>
}

function UserMainPage(props: Props) {
    const navigate = useNavigate();
    const userDetails = useSelector((state: any) => state.golfApp.userDetails)

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
        navigate("/golfapp/userdetails")
    }

    return (
        <div className="App-Page">
            <header className="App-Header">
                <img src={userDetails?.profilePicture || userImage} className="ProfilPicture" width={150} height={150}
                     alt="User Details" onClick={userDetailsOnClick}/></header>
            <div className="AppContainer">
                <Container className="d-flex flex-column justify-content-center">
                    <div className="AppContent">
                        <div className="AppHeader">
                            <div className="invisibleDiv"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                                <path
                                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path
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
                            <li>Added a Golf Club Overview Page</li>
                        </ul>
                        <div className="AppList">
                            <div className="AppListItem" onClick={() => navigate("/golfapp/clubs")}>
                                <div className="ItemHeader">
                                    Find Clubs
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                         fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                        <path
                                            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="AppListItem" onClick={() => navigate("/golfapp/rounds")}>
                                <div className="ItemHeader">
                                    Your Rounds
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                         fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                        <path
                                            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="AppListItem" onClick={() => navigate("/golfapp/user/statistics")}>
                                <div className="ItemHeader">
                                    Statistics
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                         fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                        <path
                                            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default UserMainPage;