import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {GolfClub} from "../../models/GolfClub";
import axios from "axios";

type Props = {
    logout: () => Promise<void>
}
function GolfClubFind(props:Props) {
    const navigate = useNavigate();
    const [golfClubs, setGolfClubs] = useState<GolfClub[]>([])

    const getClubs = () => {
        axios.get("/api/golfapp/clubs").then((response) => {
            setGolfClubs(response.data);
        })
    }

    useEffect(getClubs, [])

    function onClickLogout() {
        props.logout()
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="UserMainContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="UserMainContent">
                    <div className="UserDetailsHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => window.history.back()}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h3>Nearby Golf Clubs</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path fill-rule="evenodd"
                                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fill-rule="evenodd"
                                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <br/>
                    {golfClubs.map((golfClub) => (
                        <div key={golfClub.clubID}>
                            <h2>{golfClub.clubName}</h2>
                            <p>City: {golfClub.city}</p>
                            <p>State: {golfClub.state}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default GolfClubFind;