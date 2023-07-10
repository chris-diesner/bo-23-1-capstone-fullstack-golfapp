import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {GolfClub} from "../../models/GolfClub";
import axios from "axios";
import '../../styles/App.css'
import MapContainer from "./MapContainer";

type Props = {
    logout: () => Promise<void>
}

function GolfClubFind(props: Props) {
    const holeNumber = 0
    const navigate = useNavigate();
    const [golfClubs, setGolfClubs] = useState<GolfClub[]>([])

    const calculateLatLang = async (golfClub: GolfClub) => {
        const {address, city, country} = golfClub
        const encodedAddress = encodeURIComponent(`${address}, ${city}, ${country}`)
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY ?? ''

        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`)
            if (response.data.results && response.data.results.length > 0) {
                const {lat, lng} = response.data.results[0].geometry.location
                return {...golfClub, latitude: lat, longitude: lng}
            } else {
                console.log("No results found")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getClubs = async () => {
        try {
            const response = await axios.get("/api/golfapp/clubs")
            const tempClub = response.data
            const updatedGolfClub = await Promise.all(tempClub.map(calculateLatLang))
            setGolfClubs(updatedGolfClub)
        } catch
            (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getClubs()
    }, [])

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
        <div className="AppContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="AppContent">
                    <div className="AppHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => window.history.back()}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h3>Nearby Golf Clubs</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path
                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path
                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <br/>
                    <MapContainer golfClubs={golfClubs} showClubMap={true} holeNumber={holeNumber}/>
                </div>
            </Container>
        </div>
    );
}

export default GolfClubFind;
